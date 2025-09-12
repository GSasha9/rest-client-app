import { describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import HeadersEditor from './HeadersEditor';
import userEvent from '@testing-library/user-event';

describe('HeaderEditor', () => {
  const mockHandleHeader = vi.fn();
  it('renders inputs and button correctly', () => {
    render(<HeadersEditor handleHeader={mockHandleHeader} />);

    expect(screen.getAllByRole('textbox').length).toEqual(2);
    expect(
      screen.getByRole('button', { name: /add header/i })
    ).toBeInTheDocument();
  });

  it('clicking the button calls a function', async () => {
    render(<HeadersEditor handleHeader={mockHandleHeader} />);

    const button = screen.getByRole('button', { name: /add header/i });
    await userEvent.click(button);

    expect(mockHandleHeader).toHaveBeenCalled();
  });
});
