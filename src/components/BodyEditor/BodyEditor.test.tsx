import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, beforeEach } from 'vitest';
import { NextIntlClientProvider } from 'next-intl';
import enMessages from '../../../messages/en.json';
import BodyEditor, { BodyEditorProps } from './BodyEditor';

const renderBodyEditor = (props: BodyEditorProps) =>
  render(
    <NextIntlClientProvider locale="en" messages={enMessages}>
      <BodyEditor {...props} />
    </NextIntlClientProvider>
  );

describe('BodyEditor', () => {
  const mockSetBody = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders a textarea with initial values', () => {
    renderBodyEditor({
      body: '{"a":1}',
      url: 'http://test.com',
      setBody: mockSetBody,
    });

    expect(screen.getByDisplayValue('{"a":1}')).toBeInTheDocument();
  });

  it('calls setBody on blur', () => {
    renderBodyEditor({
      body: '',
      url: 'http://test.com',
      setBody: mockSetBody,
    });

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: '{"b":2}' } });
    fireEvent.blur(textarea);

    expect(mockSetBody).toHaveBeenCalledWith('{"b":2}');
  });

  it('shows an error when the JSON is invalid', () => {
    renderBodyEditor({
      body: 'invalid',
      url: 'http://test.com',
      setBody: mockSetBody,
    });

    const button = screen.getByRole('button', { name: /prettify/i });
    fireEvent.click(button);

    expect(screen.getByText(/invalid json/i)).toBeInTheDocument();
  });
});
