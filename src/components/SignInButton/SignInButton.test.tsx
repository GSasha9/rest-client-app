import { useTranslations } from 'next-intl';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ROUTES from '../../shared/types/types';
import SignInButton from './SignInButton';

vi.mock('next-intl', () => ({
  useTranslations: vi.fn(),
}));

vi.mock('@mui/icons-material/ExitToApp', () => ({
  default: () => <div>ExitToApp</div>,
}));

vi.mock('@mui/material/Button', () => ({
  default: ({
    children,
    href,
    color,
    size,
    endIcon,
    variant,
  }: {
    children: React.ReactNode;
    href: string;
    color: string;
    size: string;
    endIcon: React.ReactNode;
    variant: string;
  }) => (
    <a href={href} data-color={color} data-size={size} data-variant={variant}>
      {children}
      {endIcon}
    </a>
  ),
}));

vi.mock('next/font/google', () => ({
  Roboto: () => ({
    style: {
      fontFamily: 'Roboto, sans-serif',
    },
  }),
}));

describe('SignInButton', () => {
  it('renders the sign-in button with correct attributes', () => {
    (useTranslations as vi.Mock).mockReturnValue((key: string) => key);
    render(<SignInButton />);
    const button = screen.getByText('header.login');

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', ROUTES.SIGN_IN);
    expect(button).toHaveAttribute('data-color', 'primary');
    expect(button).toHaveAttribute('data-size', 'medium');
    expect(button).toHaveAttribute('data-variant', 'contained');
    const icon = screen.getByText('ExitToApp');

    expect(icon).toBeInTheDocument();
  });
});
