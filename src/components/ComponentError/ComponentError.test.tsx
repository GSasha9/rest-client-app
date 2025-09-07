import type { ImageProps } from 'next/image';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ComponentError from './ComponentError';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('next/image', () => ({
  default: (props: ImageProps) => (
    <div
      data-testid="next-image"
      data-src={props.src?.toString()}
      data-alt={props.alt}
      data-width={props.width}
      data-height={props.height}
    />
  ),
}));

vi.mock('../../styles/genStyles', () => ({
  genStyles: () => ({
    wrapper: {},
    content: {},
    text: {},
    errorImg: {},
    textBottom: {},
    button: {},
  }),
}));

vi.mock('../../theme/theme', () => ({
  ADDITION_COLOR: {
    backgroundMain: '#f0f0f0',
  },
}));

describe('ComponentError', () => {
  it('renders error message', () => {
    render(<ComponentError />);
    expect(screen.getByText('error.message')).toBeInTheDocument();
  });

  it('renders default error description when no error provided', () => {
    render(<ComponentError />);
    expect(screen.getByText('error.description')).toBeInTheDocument();
  });

  it('renders specific error message when error provided', () => {
    const testError = new Error('Test error message');

    render(<ComponentError error={testError} />);
    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  it('renders home link button', () => {
    render(<ComponentError />);
    const button = screen.getByRole('link', { name: 'notfound.link' });

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', '/');
  });
});
