import { render, screen, fireEvent, getByRole } from '@testing-library/react';
import { describe, it, vi, beforeEach } from 'vitest';
import { NextIntlClientProvider } from 'next-intl';
import enMessages from '../../../messages/en.json';
import UrlEditor, { UrlEditorProps } from './UrlEditor';

const renderUrlEditor = (props: UrlEditorProps) =>
  render(
    <NextIntlClientProvider locale="en" messages={enMessages}>
      <UrlEditor {...props} />
    </NextIntlClientProvider>
  );

describe('UrlEditor', () => {
  const mockSetInput = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the input with the passed value', () => {
    renderUrlEditor({ input: 'http://test.com', setInput: mockSetInput });
    expect(screen.getByRole('textbox')).toHaveValue('http://test.com');
  });

  it('updates local state when text is entered', () => {
    renderUrlEditor({ input: '', setInput: mockSetInput });
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'http://test.com' } });
    expect(input).toHaveValue('http://test.com');
  });

  it('calls setInput on blur', () => {
    renderUrlEditor({ input: '', setInput: mockSetInput });
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'http://test.com' } });
    fireEvent.blur(input);
    expect(mockSetInput).toHaveBeenCalledWith('http://test.com');
  });
});
