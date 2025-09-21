import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

const app = !getApps().length
  ? initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      }),
    })
  : getApps()[0];

const authAdmin = getAuth(app);

export const dbAdmin = getFirestore(app);

export async function getUserFromCookie(token: string) {
  try {
    const decoded = await authAdmin.verifyIdToken(token);

    return { uid: decoded.uid, email: decoded.email };
  } catch (err) {
    console.error('Invalid token', err);

    return null;
  }
}
