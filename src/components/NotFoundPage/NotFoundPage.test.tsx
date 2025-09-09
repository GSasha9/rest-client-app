import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import NotFoundPage from './NotFoundPage';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('../../styles/genStyles', () => ({
  genStyles: () => ({
    wrapper: {},
    content: {},
    text: {},
    error: {},
    textBottom: {},
    button: {},
  }),
}));

vi.mock('../../theme/theme', () => ({
  ADDITION_COLOR: {
    backgroundMain: '#f0f0f0',
  },
}));

describe('NotFoundPage', () => {
  it('renders NotFoundPage component', () => {
    render(<NotFoundPage />);
    expect(screen.getByText('notfound.messageNotFound')).toBeInTheDocument();
  });

  it('displays 404 error message', () => {
    render(<NotFoundPage />);
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('renders not found message', () => {
    render(<NotFoundPage />);
    expect(screen.getByText('notfound.message')).toBeInTheDocument();
  });

  it('renders home link button', () => {
    render(<NotFoundPage />);
    const button = screen.getByRole('link', { name: 'notfound.link' });

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', '/');
  });

  it('uses correct typography variants', () => {
    render(<NotFoundPage />);
    expect(screen.getByText('notfound.messageNotFound')).toHaveClass(
      'MuiTypography-h6'
    );
    expect(screen.getByText('404')).toHaveClass('MuiTypography-h1');
    expect(screen.getByText('notfound.message')).toHaveClass(
      'MuiTypography-h6'
    );
  });

  it('renders button with correct attributes', () => {
    render(<NotFoundPage />);
    const button = screen.getByRole('link', { name: 'notfound.link' });

    expect(button).toHaveClass('MuiButton-containedPrimary');
    expect(button).toHaveAttribute('href', '/');
  });
});
