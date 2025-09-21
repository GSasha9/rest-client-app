import { render, screen } from '@testing-library/react';
import { describe, it, vi, beforeEach, Mock } from 'vitest';
import Header from './Header';
import { usePathname } from 'next/navigation';
import { useMediaQuery } from '@mui/material';
import { JSX } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import enMessages from '../../../messages/en.json';

vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: JSX.IntrinsicElements['img']) => <img {...props} />,
}));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  })),
  usePathname: vi.fn(),
  useParams: vi.fn(() => ({ locale: 'en' })),
  useSearchParams: vi.fn(() => ({
    get: vi.fn().mockReturnValue('mock-value'),
  })),
}));

vi.mock('@mui/material', async (importOriginal) => {
  const actual: typeof import('@mui/material') = await importOriginal();
  return {
    ...actual,
    useMediaQuery: vi.fn(),
  };
});

vi.mock('@/lib/firebase', () => {
  const listeners: Function[] = [];

  const mockAuth = {
    currentUser: { uid: '123' },
    onAuthStateChanged: (callback: (user: unknown) => void) => {
      listeners.push(callback);
      callback({ uid: '123' });
      return () => {};
    },
    signInWithEmailAndPassword: vi.fn(),
    signOut: vi.fn(),
  };

  return {
    auth: mockAuth,
    db: {
      collection: vi.fn().mockReturnThis(),
      doc: vi.fn().mockReturnThis(),
      get: vi.fn(),
      set: vi.fn(),
    },
  };
});

vi.mock('next/font/google', () => ({
  Roboto: () => ({
    style: {
      fontFamily: 'Roboto, sans-serif',
    },
  }),
}));

const renderWithIntl = () => {
  return render(
    <NextIntlClientProvider locale="en" messages={enMessages}>
      <Header />
    </NextIntlClientProvider>
  );
};

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (usePathname as Mock).mockReturnValue('/main');
    (useMediaQuery as Mock).mockReturnValue(false);
  });

  it('renders the logo with the correct alt and link', () => {
    renderWithIntl();
    const logo = screen.getByAltText('logoRsSchool');
    expect(logo).toBeInTheDocument();
    expect(logo.closest('a')).toHaveAttribute('href', '/');
  });

  it('renders buttons and language switcher', () => {
    renderWithIntl();
    expect(screen.getByTestId('language-switcher')).toBeInTheDocument();
    expect(screen.getByTestId('buttons')).toBeInTheDocument();
  });

  it('shows navigation on large screens', () => {
    renderWithIntl();
    expect(screen.getByTestId('page-navigation')).toBeInTheDocument();
  });

  it('hides navigation on small screens', () => {
    (useMediaQuery as Mock).mockReturnValue(true);
    renderWithIntl();
    expect(screen.queryByText(/PageNavigation/i)).not.toBeInTheDocument();
  });

  it('hides navigation on hidden routes', () => {
    (usePathname as Mock).mockReturnValue('/sign-in');
    renderWithIntl();
    expect(screen.queryByText(/PageNavigation/i)).not.toBeInTheDocument();
  });
});
