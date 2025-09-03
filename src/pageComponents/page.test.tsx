import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Page from './page';

describe('Page component', () => {
  it('renders the heading', () => {
    render(<Page />);
    const heading = screen.getByRole('heading', { level: 1, name: 'Home' });

    expect(heading).toBeInTheDocument();
  });
});
