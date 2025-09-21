import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, beforeEach } from 'vitest';
import { NextIntlClientProvider } from 'next-intl';
import enMessages from '../../../messages/en.json';
import HeadersEditor, { HeadersEditorProps } from './HeadersEditor';

const renderHeadersEditor = (props: HeadersEditorProps) =>
  render(
    <NextIntlClientProvider locale="en" messages={enMessages}>
      <HeadersEditor {...props} />
    </NextIntlClientProvider>
  );

const mockSetHeaders = vi.fn();

describe('HeadersEditor', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders a list of headers', () => {
    renderHeadersEditor({
      headers: { Authorization: 'Bearer token', Accept: 'application/json' },
      setHeaders: mockSetHeaders,
      emptyHeader: false,
    });

    expect(screen.getByDisplayValue('Authorization')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Accept')).toBeInTheDocument();
  });

  it('adds a new empty title when the button is clicked', () => {
    renderHeadersEditor({
      headers: { Authorization: 'Bearer token' },
      setHeaders: mockSetHeaders,
      emptyHeader: false,
    });

    const addButton = screen.getByRole('button', {
      name: enMessages.restClient.restClientPage.addHeader,
    });
    fireEvent.click(addButton);

    expect(mockSetHeaders).toHaveBeenCalledWith({
      Authorization: 'Bearer token',
      '': '',
    });
  });
});
