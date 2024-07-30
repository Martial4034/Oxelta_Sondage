import { NextRequest, NextResponse } from 'next/server';
import { firestoreAdmin } from '@/lib/firebaseAdmin';

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    console.log('Payload received:', payload);

    const { subject, to, email_id } = payload.data;

    // Vérifier le sujet de l'email
    const validSubjects = ["Merci de votre participation", "Thank you for your participation"];
    if (!validSubjects.includes(subject)) {
      return NextResponse.json({ message: 'Invalid email subject' }, { status: 200 });
    }

    // Extraire l'email du champ 'to'
    const email = to[0];
    
    // Rechercher le document correspondant dans Firestore
    const sondageRef = firestoreAdmin.collection('sondage');
    const snapshot = await sondageRef.where('email', '==', email).get();

    if (snapshot.empty) {
      return NextResponse.json({ message: 'No matching documents found' }, { status: 404 });
    }

    // Mettre à jour le document avec l'ID de l'email
    snapshot.forEach(doc => {
      doc.ref.update({ idEmail: email_id });
    });

    return NextResponse.json({ message: 'Document updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error handling webhook:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
