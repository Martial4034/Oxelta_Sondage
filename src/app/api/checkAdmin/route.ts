import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { authAdmin, firestoreAdmin, FieldValue } from '@/lib/firebaseAdmin';
import { SignInEmailTemplate } from '@/components/EmailTemplate';

const resend = new Resend(process.env.RESEND_API_KEY_ADMIN);

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  try {
    // Vérifier si l'utilisateur existe
    let userRecord;
    try {
      userRecord = await authAdmin.getUserByEmail(email);
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        return NextResponse.json({ message: 'Adresse email introuvable' }, { status: 404 });
      }
      console.error('Error checking user:', error);
      return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }

    // Vérifier si l'utilisateur a le rôle "admin"
    const userDocRef = firestoreAdmin.collection('users').doc(userRecord.uid);
    const userDoc = await userDocRef.get();
    if (!userDoc.exists || userDoc.data()?.role !== 'admin') {
      return NextResponse.json({ message: 'Accès refusé : vous n\'êtes pas administrateur' }, { status: 403 });
    }

    // Générer le lien de connexion
    const actionCodeSettings = {
      url: `${process.env.NEXTAUTH_URL}/auth/signin-confirm`,
      handleCodeInApp: true,
    };

    const link = await authAdmin.generateSignInWithEmailLink(email, actionCodeSettings);

    // Mettre à jour le document de l'utilisateur avec les informations nécessaires
    await userDocRef.update({
      lastEmailSent: FieldValue.serverTimestamp(),
      emailSent: FieldValue.increment(1),
      lastLogin: FieldValue.serverTimestamp(), // Mise à jour de la dernière connexion
    });

    // Utiliser le template d'email de connexion
    const template = SignInEmailTemplate;

    // Envoyer l'email avec Resend
    const { data, error } = await resend.emails.send({
      from: `Oxelta <admin@oxelta.io>`,
      to: [email],
      subject: 'Votre lien de connexion',
      text: '',
      react: template({ url: link, email }),
    });

    console.log('Sending Email with URL:', link);

    if (error) {
      return NextResponse.json(error, { status: 400 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}