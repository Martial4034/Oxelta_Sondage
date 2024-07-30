// src/app/api/webhooksUpdate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { firestoreAdmin } from '@/lib/firebaseAdmin';

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    console.log('Payload received:', payload);

    const { type, data } = payload;
    const { email_id, to } = data;

    // Extraire l'email du champ 'to'
    const email = to[0];

    // Rechercher le document correspondant dans Firestore
    const sondageRef = firestoreAdmin.collection('sondage');
    const snapshot = await sondageRef.where('email', '==', email).get();

    if (snapshot.empty) {
      return NextResponse.json({ message: 'No matching documents found' }, { status: 404 });
    }

    // Mettre à jour le document avec l'état de l'email
    snapshot.forEach(doc => {
      doc.ref.update({ mailStatus: type });
    });

    return NextResponse.json({ message: 'Document updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error handling webhook:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
