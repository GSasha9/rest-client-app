import { vi, describe, it, expect, beforeEach, Mock } from 'vitest';
import { tockenCheck } from './token-check';
import { getUserFromCookie } from '@/lib/firebase-admin';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

vi.mock('next/headers', () => ({
  cookies: vi.fn(),
}));

vi.mock('firebase/auth', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import('firebase/auth');
  return {
    ...actual,
    getAuth: vi.fn(() => ({
      currentUser: null,
      signOut: vi.fn(),
    })),
    signOut: vi.fn(),
  };
});

vi.mock('@/lib/firebase-admin', () => ({
  getUserFromCookie: vi.fn(),
}));

global.cookieStore = {
  set: vi.fn(),
} as unknown as typeof global.cookieStore;

describe('tockenCheck', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns user if token is valid', async () => {
    const mockUser = { uid: '123', email: 'test@test.com' };
    (cookies as Mock).mockReturnValue({
      get: vi.fn().mockReturnValue({ value: 'token123' }),
    });
    (getUserFromCookie as Mock).mockResolvedValue(mockUser);

    const result = await tockenCheck();

    expect(result).toBe(mockUser);
  });
});
