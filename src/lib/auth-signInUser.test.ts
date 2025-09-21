import { describe, it, expect, vi, beforeEach } from 'vitest';
import { signInUser } from './auth';
import { TFunction } from '@/validations/signInValidation.schema';
import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';
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
    signInWithEmailAndPassword: vi.fn(),
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

describe('signInUser', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('successful login calls setTokenOnServer and successNotifyMessage', async () => {
    (
      signInWithEmailAndPassword as unknown as ReturnType<typeof vi.fn>
    ).mockResolvedValueOnce({
      user: { uid: '123' },
    });

    const result = await signInUser('test@test.com', 'password', t);

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      {},
      'test@test.com',
      'password'
    );
    expect(setTokenOnServer).toHaveBeenCalled();
    expect(successNotifyMessage).toHaveBeenCalledWith('auth.success.signin');
    expect(result).toEqual({ success: true });
  });

  it('incorrect credentials trigger a warningNotifyMessage', async () => {
    (
      signInWithEmailAndPassword as unknown as ReturnType<typeof vi.fn>
    ).mockRejectedValueOnce(
      new FirebaseError('auth/invalid-credential', 'Invalid credential')
    );

    await signInUser('test@test.com', 'wrongpass', t);

    expect(warningNotifyMessage).toHaveBeenCalledWith('auth.error.signin');
  });

  it('an unknown error is causing errorNotifyMessage', async () => {
    (
      signInWithEmailAndPassword as unknown as ReturnType<typeof vi.fn>
    ).mockRejectedValueOnce(new Error('Unexpected error'));

    await signInUser('test@test.com', 'password', t);

    expect(errorNotifyMessage).toHaveBeenCalledWith('Unexpected error');
  });
});
