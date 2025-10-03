import { useTranslations } from 'next-intl';
import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { signOutUser } from '../../lib/auth';
import SignOutButton from './SignOutButton';

vi.mock('next-intl', () => ({
  useTranslations: vi.fn(),
}));

vi.mock('../../lib/auth', () => ({
  signOutUser: vi.fn(),
}));

vi.mock('@mui/material/Button', () => ({
  default: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick: () => void;
  }) => <button onClick={onClick}>{children}</button>,
}));

vi.mock('@mui/material/Divider', () => ({
  default: () => <div>Divider</div>,
}));

vi.mock('@mui/material/Stack', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock('@mui/icons-material/Logout', () => ({
  default: () => <div>LogoutIcon</div>,
}));

vi.mock('utils/getStringAvatar', () => ({
  default: (name: string) => ({ children: name }),
}));

vi.mock('next/font/google', () => ({
  Roboto: () => ({
    style: {
      fontFamily: 'Roboto, sans-serif',
    },
  }),
}));

describe('SignOutButton', () => {
  beforeEach(() => {
    (useTranslations as jest.Mock).mockReturnValue((key: string) => key);
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('calls signOutUser on button click', () => {
    render(<SignOutButton />);

    fireEvent.click(screen.getByText('header.logout'));
    expect(signOutUser).toHaveBeenCalled();
  });
});
