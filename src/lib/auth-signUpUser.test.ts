import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { signUpUser } from './auth';
import { TFunction } from '@/validations/signInValidation.schema';
import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc } from 'firebase/firestore';
import setTokenOnServer from './set-token-on-server';
import {
  successNotifyMessage,
  warningNotifyMessage,
  errorNotifyMessage,
} from '@/utils/notifyMessage';

vi.mock('./firebase', () => ({
  auth: {},
  db: {},
}));

vi.mock('firebase/auth', async (importOriginal) => {
  const actual = await importOriginal<typeof import('firebase/auth')>();
  return {
    ...actual,
    createUserWithEmailAndPassword: vi.fn(),
  };
});

vi.mock('firebase/firestore', async (importOriginal) => {
  const actual = await importOriginal<typeof import('firebase/firestore')>();
  return {
    ...actual,
    setDoc: vi.fn(),
    doc: vi.fn(() => 'mock-doc-ref'),
  };
});

vi.mock('./set-token-on-server', () => ({
  default: vi.fn(),
}));

vi.mock('@/utils/notifyMessage', () => ({
  successNotifyMessage: vi.fn(),
  warningNotifyMessage: vi.fn(),
  errorNotifyMessage: vi.fn(),
}));

const t: TFunction = ((key: string) => key) as unknown as TFunction;

describe('signUpUser', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('successful registration calls setDoc, setTokenOnServer and successNotifyMessage', async () => {
    (createUserWithEmailAndPassword as Mock).mockResolvedValueOnce({
      user: { uid: '123', email: 'test@test.com' },
    });

    const result = await signUpUser('John', 'test@test.com', 'pass123', t);

    expect(setDoc).toHaveBeenCalledWith('mock-doc-ref', {
      uid: '123',
      name: 'John',
      email: 'test@test.com',
    });
    expect(setTokenOnServer).toHaveBeenCalled();
    expect(successNotifyMessage).toHaveBeenCalledWith('auth.success.signup');
    expect(result).toEqual({ success: true });
  });

  it('if the email already exists, calls warningNotifyMessage', async () => {
    (createUserWithEmailAndPassword as Mock).mockRejectedValueOnce(
      new FirebaseError('auth/email-already-in-use', 'Email exists')
    );

    await signUpUser('John', 'test@test.com', 'pass123', t);

    expect(warningNotifyMessage).toHaveBeenCalledWith(
      'auth.error.signup.userExists'
    );
  });

  it('if the error is unknown, calls errorNotifyMessage', async () => {
    (createUserWithEmailAndPassword as Mock).mockRejectedValueOnce(
      new Error('Unexpected')
    );

    await signUpUser('John', 'test@test.com', 'pass123', t);

    expect(errorNotifyMessage).toHaveBeenCalledWith('Unexpected');
  });
});
