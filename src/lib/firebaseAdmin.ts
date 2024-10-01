// src/app/firebaseAdmin.ts
import admin from 'firebase-admin';

const serviceAccount = {
  project_id: process.env.FIREBASE_ADMIN_PROJECT_ID,
  private_key_id: process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_ADMIN_CLIENT_ID,
  auth_uri: process.env.FIREBASE_ADMIN_AUTH_URI,
  token_uri: process.env.FIREBASE_ADMIN_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_ADMIN_CLIENT_X509_CERT_URL,
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    storageBucket: `${process.env.FIREBASE_ADMIN_PROJECT_ID}.appspot.com`,
  });
}

export const authAdmin = admin.auth();
export const firestoreAdmin = admin.firestore();
export const storageAdmin = admin.storage().bucket();
export const FieldValue = admin.firestore.FieldValue;

// Fonction pour obtenir une URL signée pour deck_uk.pdf
export async function getSignedUrlForUkPdf(): Promise<string> {
  const [url] = await storageAdmin.file('pdfs/deck_uk.pdf').getSignedUrl({
    action: 'read',
    expires: Date.now() + 600000 * 60 * 1000, // L'URL expire dans 600000 minutes soit 10 000 heures soit 416 jours
  });
  return url;
}

// Fonction pour obtenir une URL signée pour deck_vf.pdf
export async function getSignedUrlForVfPdf(): Promise<string> {
  const [url] = await storageAdmin.file('pdfs/deck_vf.pdf').getSignedUrl({
    action: 'read',
    expires: Date.now() + 600000 * 60 * 1000, // L'URL expire dans 600000 minutes soit 10 000 heures soit 416 jours
  });
  return url;
}
// Fonction pour obtenir une URL signée pour whitepaper_uk.pdf
export async function getSignedUrlForUkWhitePaperPdf(): Promise<string> {
  const [url] = await storageAdmin.file('pdfs/whitepaper_uk.pdf').getSignedUrl({
    action: 'read',
    expires: Date.now() + 600000 * 60 * 1000, // L'URL expire dans 600000 minutes soit 10 000 heures soit 416 jours
  });
  return url;
}

// Fonction pour obtenir une URL signée pour whitepaper_uk_vf
export async function getSignedUrlForVfWhitePaperPdf(): Promise<string> {
  const [url] = await storageAdmin.file('pdfs/whitepaper_vf.pdf').getSignedUrl({
    action: 'read',
    expires: Date.now() + 600000 * 60 * 1000, // L'URL expire dans 600000 minutes soit 10 000 heures soit 416 jours
  });
  return url;
}