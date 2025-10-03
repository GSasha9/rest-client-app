import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { beforeEach, describe, expect, it, vi, Mock } from 'vitest';

vi.mock('firebase/app', () => ({
  getApps: vi.fn(),
  initializeApp: vi.fn(),
}));

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(),
}));

vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(),
}));

process.env.NEXT_PUBLIC_FIREBASE_API_KEY = 'fake-api-key';
process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = 'fake-auth-domain';
process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID = 'fake-project-id';
process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = 'fake-storage-bucket';
process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = 'fake-sender-id';
process.env.NEXT_PUBLIC_FIREBASE_APP_ID = 'fake-app-id';

describe('Firebase Initialization', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initializes Firebase app when no apps are initialized', async () => {
    (getApps as Mock).mockReturnValue([]);
    const mockApp = { name: 'mockApp' };

    (initializeApp as Mock).mockReturnValue(mockApp);
    const { auth, db } = await import('./firebase');

    expect(initializeApp).toHaveBeenCalledWith({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    });

    expect(getAuth).toHaveBeenCalledWith(mockApp);
    expect(getFirestore).toHaveBeenCalledWith(mockApp);
  });

  it('initializes Firebase app when no apps are initialized', () => {
    (getApps as Mock).mockReturnValue([]);
    const mockApp = { name: 'mockApp' };

    (initializeApp as Mock).mockReturnValue(mockApp);
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };
    const app =
      getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

    expect(initializeApp).toHaveBeenCalledWith(firebaseConfig);
    expect(app).toEqual(mockApp);
  });
});
