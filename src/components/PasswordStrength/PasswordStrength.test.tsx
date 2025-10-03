import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import PasswordStrength from './PasswordStrength';

vi.mock('next/font/google', () => ({
  Roboto: () => ({
    style: {
      fontFamily: 'Roboto, sans-serif',
    },
  }),
}));

describe('PasswordStrength', () => {
  test('renders with default color when password is empty', () => {
    render(<PasswordStrength password="" />);
    const strengthMeter = screen.getByTestId('meter');
    expect(strengthMeter).toHaveStyle({
      backgroundColor: '#909090',
      width: '0%',
    });
  });

  test('renders with red color for weak password', () => {
    render(<PasswordStrength password="a" />);
    const strengthMeter = screen.getByTestId('meter');
    expect(strengthMeter).toHaveStyle({
      backgroundColor: '#ff0000',
      width: '25%',
    });
  });

  test('renders with orange color for moderate password', () => {
    render(<PasswordStrength password="a1" />);
    const strengthMeter = screen.getByTestId('meter');
    expect(strengthMeter).toHaveStyle({
      backgroundColor: '#ff9060',
      width: '50%',
    });
  });

  test('renders with yellow color for good password', () => {
    render(<PasswordStrength password="a1@" />);
    const strengthMeter = screen.getByTestId('meter');
    expect(strengthMeter).toHaveStyle({
      backgroundColor: '#fff200',
      width: '75%',
    });
  });

  test('renders with green color for strong password', () => {
    render(<PasswordStrength password="a1@8qwer" />);
    const strengthMeter = screen.getByTestId('meter');
    expect(strengthMeter).toHaveStyle({
      backgroundColor: '#00ff03',
      width: '100%',
    });
  });
});
