import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, beforeEach } from 'vitest';
import { NextIntlClientProvider } from 'next-intl';
import enMessages from '../../../messages/en.json';
import { HeaderElement, HeaderElementProps } from './HeaderElement';

const renderHeaderElement = (props: HeaderElementProps) =>
  render(
    <NextIntlClientProvider locale="en" messages={enMessages}>
      <HeaderElement {...props} />
    </NextIntlClientProvider>
  );
const mockSetData = vi.fn();
const headers: [string, string][] = [
  ['Authorization', 'Bearer token'],
  ['Accept', 'application/json'],
];

describe('HeaderElement', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the input with initial values', () => {
    renderHeaderElement({
      headers,
      headerKey: 'Authorization',
      headerValue: 'Bearer token',
      index: 0,
      setData: mockSetData,
    });

    expect(screen.getByDisplayValue('Authorization')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Bearer token')).toBeInTheDocument();
  });

  it('calls setData when the key and blur change', () => {
    renderHeaderElement({
      headers,
      headerKey: 'Authorization',
      headerValue: 'Bearer token',
      index: 0,
      setData: mockSetData,
    });

    const keyInput = screen.getByDisplayValue('Authorization');
    fireEvent.change(keyInput, { target: { value: 'Auth' } });
    fireEvent.blur(keyInput);

    expect(mockSetData).toHaveBeenCalledWith([
      ['Auth', 'Bearer token'],
      ['Accept', 'application/json'],
    ]);
  });

  it('the delete button calls setData without the current element.', () => {
    renderHeaderElement({
      headers,
      headerKey: 'Authorization',
      headerValue: 'Bearer token',
      index: 0,
      setData: mockSetData,
    });

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(mockSetData).toHaveBeenCalledWith([['Accept', 'application/json']]);
  });
});
