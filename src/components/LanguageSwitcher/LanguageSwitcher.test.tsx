import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import LanguageSwitcher from './LanguageSwitcher';

const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    pathname: '/',
    query: {},
    asPath: '/',
  }),
  useParams: () => ({
    locale: 'en',
  }),
}));

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it('renders select with current locale', () => {
    render(<LanguageSwitcher />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveTextContent('EN');
  });

  it('calls router.push on locale change', () => {
    render(<LanguageSwitcher />);
    const select = screen.getByRole('combobox');
    fireEvent.mouseDown(select);

    fireEvent.click(screen.getByText('РУ'));
    expect(mockPush).toHaveBeenCalled();
  });
});
