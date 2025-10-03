import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { signInWithPopup } from 'firebase/auth';
import { getDocs, doc, setDoc } from 'firebase/firestore';
import {
  errorNotifyMessage,
  successNotifyMessage,
} from '@/utils/notifyMessage';
import { signInWithGoogle } from './auth';
import setTokenOnServer from './set-token-on-server';
import { auth, db } from './firebase';
import { TFunction } from '../validations/signInValidation.schema';

vi.mock('../firebase', () => ({
  auth: {},
  db: {},
}));

vi.mock('firebase/auth', async (importOriginal) => {
  const actual = await importOriginal<typeof import('firebase/auth')>();
  return {
    ...actual,
    getAuth: vi.fn(() => ({})),
    signInWithPopup: vi.fn(),
    GoogleAuthProvider: vi.fn(),
  };
});

vi.mock('firebase/firestore', async (importOriginal) => {
  const actual = await importOriginal<typeof import('firebase/firestore')>();
  return {
    ...actual,
    getFirestore: vi.fn(() => ({})),
    collection: vi.fn(),
    getDocs: vi.fn(),
    query: vi.fn(),
    where: vi.fn(),
    setDoc: vi.fn(),
    doc: vi.fn(),
  };
});

vi.mock('@/utils/notifyMessage', () => ({
  errorNotifyMessage: vi.fn(),
  successNotifyMessage: vi.fn(),
  warningNotifyMessage: vi.fn(),
}));

vi.mock('@/lib/set-token-on-server', () => ({
  __esModule: true,
  default: vi.fn(),
}));

const t: TFunction = ((key: string) => key) as unknown as TFunction;

describe('signInWithGoogle', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('successful login: calls setTokenOnServer and successNotifyMessage', async () => {
    (signInWithPopup as Mock).mockResolvedValueOnce({
      user: { uid: '123', displayName: 'John', email: 'john@example.com' },
    });
    (getDocs as Mock).mockResolvedValueOnce({ docs: [] });

    await signInWithGoogle(t);

    expect(signInWithPopup).toHaveBeenCalledWith(auth, expect.anything());
    expect(setDoc).toHaveBeenCalledWith(
      doc(db, 'users', '123'),
      expect.objectContaining({
        uid: '123',
        name: 'John',
        email: 'john@example.com',
      })
    );
    expect(setTokenOnServer).toHaveBeenCalled();
    expect(successNotifyMessage).toHaveBeenCalledWith(
      'auth.success.signinGoogle'
    );
  });

  it('if documents already exist, do not call setDoc', async () => {
    (signInWithPopup as Mock).mockResolvedValueOnce({
      user: { uid: '123', displayName: 'John', email: 'john@example.com' },
    });
    (getDocs as Mock).mockResolvedValueOnce({ docs: [{}] });

    await signInWithGoogle(t);

    expect(setDoc).not.toHaveBeenCalled();
    expect(successNotifyMessage).toHaveBeenCalledWith(
      'auth.success.signinGoogle'
    );
  });

  it('when an error is thrown, it calls errorNotifyMessage', async () => {
    (signInWithPopup as Mock).mockRejectedValueOnce(new Error('popup failed'));

    await signInWithGoogle(t);

    expect(errorNotifyMessage).toHaveBeenCalledWith('popup failed');
  });
});
