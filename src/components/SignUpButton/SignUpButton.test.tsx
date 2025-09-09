import { useTranslations } from 'next-intl';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ROUTES from '../../shared/types/types';
import SignUpButton from './SignUpButton';

vi.mock('next-intl', () => ({
  useTranslations: vi.fn(),
}));

vi.mock('@mui/icons-material/VpnKey', () => ({
  default: () => <div>VpnKeyIcon</div>,
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

describe('SignUpButton', () => {
  it('renders the sign-up button with correct attributes', () => {
    (useTranslations as vi.Mock).mockReturnValue((key: string) => key);
    render(<SignUpButton />);
    const button = screen.getByText('header.signUp');

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', ROUTES.SIGN_UP);
    expect(button).toHaveAttribute('data-color', 'secondary');
    expect(button).toHaveAttribute('data-size', 'medium');
    expect(button).toHaveAttribute('data-variant', 'contained');
    const icon = screen.getByText('VpnKeyIcon');

    expect(icon).toBeInTheDocument();
  });
});
