import { render, screen } from '@testing-library/react';
import { describe, it, vi, beforeEach } from 'vitest';
import { NextIntlClientProvider } from 'next-intl';
import enMessages from '../../../messages/en.json';
import SignInWithGoogle from './SignInWithGoogle';

vi.mock('@/lib/auth');
vi.mock('@/utils/notifyMessage');

vi.mock('next/font/google', () => ({
  Roboto: () => ({
    className: 'roboto-font',
    style: {
      fontFamily: 'Roboto',
    },
  }),
}));

vi.mock('@/lib/firebase', () => {
  return {
    auth: {
      currentUser: { uid: '123' },
      onAuthStateChanged: vi.fn((callback) => {
        callback({ uid: '123' });
        return () => {};
      }),
      signInWithEmailAndPassword: vi.fn(),
      signOut: vi.fn(),
    },
    db: {
      collection: vi.fn().mockReturnThis(),
      doc: vi.fn().mockReturnThis(),
      get: vi.fn(),
      set: vi.fn(),
    },
  };
});

const renderWithIntl = () =>
  render(
    <NextIntlClientProvider locale="en" messages={enMessages}>
      <SignInWithGoogle />
    </NextIntlClientProvider>
  );

describe('SignInWithGoogle', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders header and Google button', () => {
    renderWithIntl();
    expect(screen.getByTestId('button-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('google-title')).toBeInTheDocument();
  });
});
