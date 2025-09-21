import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import MainPage from './MainPage';
import { useAuthState } from 'react-firebase-hooks/auth';
import useUserName from '@/hooks/use-user-name';
import { useTranslations } from 'next-intl';
import { User } from 'firebase/auth';

vi.mock('@/lib/firebase', () => ({
  auth: { currentUser: { uid: '123' } },
  db: {},
}));

vi.mock('react-firebase-hooks/auth');
vi.mock('@/hooks/use-user-name');
vi.mock('next-intl');

vi.mock('./MainContent', () => ({
  __esModule: true,
  default: () => <div>MainContent Component</div>,
}));

vi.mock('../../components/PageNavigation/PageNavigation', () => ({
  __esModule: true,
  default: () => <div>PageNavigation Component</div>,
}));

beforeEach(() => {
  vi.clearAllMocks();
});

const mockedUseAuthState = vi.mocked(useAuthState);
const mockedUseUserName = vi.mocked(useUserName);
const mockedUseTranslations = vi.mocked(useTranslations);

describe('MainPage', () => {
  it('renders loader when loadingUser is true', () => {
    mockedUseAuthState.mockReturnValue([null, true, undefined]);
    mockedUseTranslations.mockReturnValue((key: string) => key);

    render(<MainPage />);

    expect(screen.getByText('loader.message')).toBeInTheDocument();
  });

  it('renders MainContent and login/signup buttons when user is not logged in', () => {
    mockedUseAuthState.mockReturnValue([null, false, undefined]);
    mockedUseTranslations.mockReturnValue((key: string) => key);

    render(<MainPage />);

    expect(screen.getByText('main.welcome')).toBeInTheDocument();
    expect(screen.getByText('header.login')).toBeInTheDocument();
    expect(screen.getByText('header.signUp')).toBeInTheDocument();
    expect(screen.getByText('MainContent Component')).toBeInTheDocument();
  });

  it('renders MainContent, PageNavigation and welcome message when user is logged in', () => {
    const mockUser: Partial<User> = {
      uid: '123',
      email: 'test@example.com',
      displayName: 'Test User',
    };
    mockedUseAuthState.mockReturnValue([mockUser as User, false, undefined]);
    mockedUseUserName.mockImplementation((): string | undefined => 'Test User');
    mockedUseTranslations.mockReturnValue((key: string) => key);

    render(<MainPage />);

    expect(screen.getByText('main.welcomeUser Test User!')).toBeInTheDocument();
    expect(screen.getByText('MainContent Component')).toBeInTheDocument();
    expect(screen.getByText('PageNavigation Component')).toBeInTheDocument();
  });
});
