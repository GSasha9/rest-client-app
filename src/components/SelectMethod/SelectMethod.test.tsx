import { describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import SelectMethod from './SelectMethod';
import { REQUEST_METHODS } from '@/shared/constants/request-methods';
import userEvent from '@testing-library/user-event';

describe('SelectMethod', () => {
  const mockHandleSelect = vi.fn();
  it('renders select input with given options', () => {
    render(
      <SelectMethod
        method={'POST'}
        handleSelect={mockHandleSelect}
        options={REQUEST_METHODS}
      />
    );

    expect(screen.getByRole('combobox')).toHaveTextContent(/post/i);
  });

  it('call handleSelect when the value changes', async () => {
    render(
      <SelectMethod
        method={'POST'}
        handleSelect={mockHandleSelect}
        options={REQUEST_METHODS}
      />
    );

    const select = screen.getByRole('combobox');
    await userEvent.click(select);

    const optionGet = screen.getByRole('option', { name: /get/i });
    await userEvent.click(optionGet);

    expect(mockHandleSelect).toHaveBeenCalled();
  });
});
