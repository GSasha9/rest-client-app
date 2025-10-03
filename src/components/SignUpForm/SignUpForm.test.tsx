import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignUpForm from './SignUpForm';
import { NextIntlClientProvider } from 'next-intl';
import enMessages from '../../../messages/en.json';
import { useRouter } from 'next/navigation';
import { vi, Mock } from 'vitest';
import ROUTES from '../../shared/types/types';
import * as authModule from '../../lib/auth';
import * as notifyModule from '../../utils/notifyMessage';

vi.mock('../../utils/notifyMessage', () => ({
  errorNotifyMessage: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(),
  useParams: vi.fn(() => ({ locale: 'en' })),
  useSearchParams: vi.fn(() => ({
    get: vi.fn().mockReturnValue('mock-value'),
  })),
}));

vi.mock('@/utils/notifyMessage', () => ({
  errorNotifyMessage: vi.fn(),
}));

vi.mock('next/font/google', () => ({
  Roboto: () => ({
    className: 'roboto-font',
    style: { fontFamily: 'Roboto' },
  }),
}));
vi.mock('@/lib/auth');

vi.mock('../../lib/firebase', () => ({
  auth: {
    createUserWithEmailAndPassword: vi.fn(),
    signInWithEmailAndPassword: vi.fn(),
    signOut: vi.fn(),
    onAuthStateChanged: vi.fn(),
  },
  db: {
    collection: vi.fn(),
    doc: vi.fn(),
    setDoc: vi.fn(),
    getDoc: vi.fn(),
  },
  app: {},
}));

const renderWithIntl = () =>
  render(
    <NextIntlClientProvider locale="en" messages={enMessages}>
      <SignUpForm />
    </NextIntlClientProvider>
  );

describe('SignUpForm', () => {
  const pushMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as Mock).mockReturnValue({ push: pushMock });
  });

  it('enables submit button when form is valid', async () => {
    renderWithIntl();

    const user = userEvent.setup();
    const nameInput = screen.getByTestId('sign-up-name').querySelector('input');
    const emailInput = screen
      .getByTestId('sign-up-email')
      .querySelector('input');
    const passwordInput = screen
      .getByTestId('sign-up-password')
      .querySelector('input');
    const confirmPasswordInput = screen
      .getByTestId('sign-up-confirm-password')
      .querySelector('input');
    const submitButton = screen.getByTestId('sign-up-button');

    await user.type(nameInput!, 'John');
    nameInput!.blur();

    await user.type(emailInput!, 'test@example.com');
    emailInput!.blur();

    await user.type(passwordInput!, 'Aa123456!');
    passwordInput!.blur();

    await user.type(confirmPasswordInput!, 'Aa123456!');
    confirmPasswordInput!.blur();

    await waitFor(() => expect(submitButton).toBeEnabled(), { timeout: 3000 });
  });

  it('calls signUpUser and redirects on successful submit', async () => {
    renderWithIntl();

    const signUpUser = vi
      .spyOn(authModule, 'signUpUser')
      .mockResolvedValue({ success: true });

    const user = userEvent.setup();
    const nameInput = screen.getByTestId('sign-up-name').querySelector('input');
    const emailInput = screen
      .getByTestId('sign-up-email')
      .querySelector('input');
    const passwordInput = screen
      .getByTestId('sign-up-password')
      .querySelector('input');
    const confirmPasswordInput = screen
      .getByTestId('sign-up-confirm-password')
      .querySelector('input');
    const submitButton = screen.getByTestId('sign-up-button');

    await user.type(nameInput!, 'John');
    await user.type(emailInput!, 'test@example.com');
    await user.type(passwordInput!, 'Aa123456!');
    await user.type(confirmPasswordInput!, 'Aa123456!');

    await waitFor(() => expect(submitButton).toBeEnabled(), { timeout: 3000 });

    await user.click(submitButton);

    await waitFor(() => {
      expect(signUpUser).toHaveBeenCalledWith(
        'John',
        'test@example.com',
        'Aa123456!',
        expect.any(Function)
      );
      expect(pushMock).toHaveBeenCalledWith(ROUTES.MAIN_PAGE);
    });
  });

  it('calls errorNotifyMessage on signUpUser error', async () => {
    const signUpUserSpy = vi
      .spyOn(authModule, 'signUpUser')
      .mockRejectedValue(new Error('Failed'));

    renderWithIntl();
    const user = userEvent.setup();

    const nameInput = screen.getByTestId('sign-up-name').querySelector('input');
    const emailInput = screen
      .getByTestId('sign-up-email')
      .querySelector('input');
    const passwordInput = screen
      .getByTestId('sign-up-password')
      .querySelector('input');
    const confirmPasswordInput = screen
      .getByTestId('sign-up-confirm-password')
      .querySelector('input');
    const submitButton = screen.getByTestId('sign-up-button');

    await user.type(nameInput!, 'John');
    await user.type(emailInput!, 'test@example.com');
    await user.type(passwordInput!, 'Aa123456!');
    await user.type(confirmPasswordInput!, 'Aa123456!');

    await waitFor(() => expect(submitButton).toBeEnabled());

    await user.click(submitButton);

    await waitFor(() => {
      expect(signUpUserSpy).toHaveBeenCalled();
      expect(notifyModule.errorNotifyMessage).toHaveBeenCalledWith('Failed');
    });
  });
});
