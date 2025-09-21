import { describe, it, expect, vi, beforeEach } from 'vitest';
import { signOutUser } from './auth';
import { auth } from './firebase';
import {
  successNotifyMessage,
  warningNotifyMessage,
  errorNotifyMessage,
} from '@/utils/notifyMessage';
import { TFunction } from '@/validations/signInValidation.schema';

vi.mock('./firebase', () => ({
  auth: {
    signOut: vi.fn(),
  },
}));

vi.mock('./set-token-on-server', () => ({
  default: vi.fn(),
}));

vi.mock('@/utils/notifyMessage', () => ({
  successNotifyMessage: vi.fn(),
  warningNotifyMessage: vi.fn(),
  errorNotifyMessage: vi.fn(),
}));

const t: TFunction = ((key: string) => key) as unknown as TFunction;

describe('signOutUser', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('a successful exit calls successNotifyMessage', async () => {
    (auth.signOut as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      undefined
    );

    await signOutUser(t);

    expect(auth.signOut).toHaveBeenCalled();
    expect(successNotifyMessage).toHaveBeenCalledWith('auth.success.signout');
    expect(warningNotifyMessage).not.toHaveBeenCalled();
  });

  it('a successful exit with a custom message calls warningNotifyMessage', async () => {
    const customMsg = 'You have been logged out';

    (auth.signOut as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      undefined
    );

    await signOutUser(t, customMsg);

    expect(auth.signOut).toHaveBeenCalled();
    expect(warningNotifyMessage).toHaveBeenCalledWith(customMsg);
    expect(successNotifyMessage).not.toHaveBeenCalled();
  });

  it('if signOut throws an error, call errorNotifyMessage', async () => {
    (auth.signOut as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error('Unexpected error')
    );

    await signOutUser(t);

    expect(errorNotifyMessage).toHaveBeenCalledWith('Unexpected error');
  });
});
