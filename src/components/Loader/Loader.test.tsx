import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ADDITION_COLOR } from '../../theme/theme';
import Loader from './Loader';

vi.mock('next/font/google', () => ({
  Roboto: () => ({
    style: {
      fontFamily: 'Roboto, sans-serif',
    },
  }),
}));

describe('Loader', () => {
  it('renders the CircularProgress component', () => {
    render(<Loader />);

    const circularProgress = screen.getByRole('progressbar');

    expect(circularProgress).toBeInTheDocument();
  });

  it('renders the Box component with correct styles', () => {
    render(<Loader />);

    const boxElement = screen.getByRole('progressbar').parentElement;

    expect(boxElement).toHaveStyle(`
      display: flex;
      justify-content: center;
      align-items: center;
      height: calc(100vh - (${ADDITION_COLOR.headerHeight} + ${ADDITION_COLOR.footerHeight}));
    `);
  });
});
