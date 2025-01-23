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

// Fonction pour obtenir une URL signée pour whitepaper_vf
export async function getSignedUrlForVfWhitePaperPdf(): Promise<string> {
  const [url] = await storageAdmin.file('pdfs/whitepaper_vf.pdf').getSignedUrl({
    action: 'read',
    expires: Date.now() + 600000 * 60 * 1000, // L'URL expire dans 600000 minutes soit 10 000 heures soit 416 jours
  });
  return url;
}
// Fonction pour obtenir une URL signée pour sheet_uk.pdf
export async function getSignedUrlForUkSheetPdf(): Promise<string> {
  const [url] = await storageAdmin.file('pdfs/sheet_uk.pdf').getSignedUrl({
    action: 'read',
    expires: Date.now() + 600000 * 60 * 1000, // L'URL expire dans 600000 minutes soit 10 000 heures soit 416 jours
  });
  return url;
}

// Fonction pour obtenir une URL signée pour flappy_sheet_uk.pdf
export async function getSignedUrlForFlappyUkSheetPdf(): Promise<string> {
  const [url] = await storageAdmin.file('pdfs/flappy_sheet_uk.pdf').getSignedUrl({
    action: 'read',
    expires: Date.now() + 600000 * 60 * 1000, // L'URL expire dans 600000 minutes soit 10 000 heures soit 416 jours
  });
  return url;
}

// Fonction pour obtenir une URL signée pour sheet_vf
export async function getSignedUrlForVfSheetPdf(): Promise<string> {
  const [url] = await storageAdmin.file('pdfs/sheet_vf.pdf').getSignedUrl({
    action: 'read',
    expires: Date.now() + 600000 * 60 * 1000, // L'URL expire dans 600000 minutes soit 10 000 heures soit 416 jours
  });
  return url;
}

// Fonction pour obtenir une URL signée pour oral_uk.pdf
export async function getSignedUrlForUkOralPdf(): Promise<string> {
  const [url] = await storageAdmin.file('pdfs/oral_uk.pdf').getSignedUrl({
    action: 'read',
    expires: Date.now() + 600000 * 60 * 1000, // L'URL expire dans 600000 minutes soit 10 000 heures soit 416 jours
  });
  return url;
}

// Fonction pour obtenir une URL signée pour oral_vf.pdf
export async function getSignedUrlForVfOralPdf(): Promise<string> {
  const [url] = await storageAdmin.file('pdfs/oral_vf.pdf').getSignedUrl({
    action: 'read',
    expires: Date.now() + 600000 * 60 * 1000, // L'URL expire dans 600000 minutes soit 10 000 heures soit 416 jours
  });
  return url;
}

// Fonction pour obtenir une URL signée pour pub_flappy_uk.pdf
export async function getSignedUrlForPubFlappyUk(): Promise<string> {
  const [url] = await storageAdmin.file('pdfs/pub_flappy_uk.pdf').getSignedUrl({
    action: 'read',
    expires: Date.now() + 600000 * 60 * 1000, // L'URL expire dans 600000 minutes soit 10 000 heures soit 416 jours
  });
  return url;
}

// Fonction pour obtenir une URL signée pour pub_flappy_vf.pdf
export async function getSignedUrlForPubFlappyVF(): Promise<string> {
  const [url] = await storageAdmin.file('pdfs/pub_flappy_vf.pdf').getSignedUrl({
    action: 'read',
    expires: Date.now() + 600000 * 60 * 1000, // L'URL expire dans 600000 minutes soit 10 000 heures soit 416 jours
  });
  return url;
}

// Fonction pour obtenir une URL signée pour flappy_uk.pdf
export async function getSignedUrlForFlappyUk(): Promise<string> {
  const [url] = await storageAdmin.file('pdfs/flappy_uk.pdf').getSignedUrl({
    action: 'read',
    expires: Date.now() + 600000 * 60 * 1000, // L'URL expire dans 600000 minutes soit 10 000 heures soit 416 jours
  });
  return url;
}

// Fonction pour obtenir une URL signée pour partner.pdf
export async function getSignedUrlForPartner(): Promise<string> {
  const [url] = await storageAdmin.file('pdfs/partner.pdf').getSignedUrl({
    action: 'read',
    expires: Date.now() + 600000 * 60 * 1000, // L'URL expire dans 600000 minutes soit 10 000 heures soit 416 jours
  });
  return url;
}