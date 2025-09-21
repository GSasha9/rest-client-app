import { render, screen, fireEvent, getByRole } from '@testing-library/react';
import { describe, it, vi, beforeEach } from 'vitest';
import { REQUEST_METHODS } from '../../shared/constants/request-methods';
import { NextIntlClientProvider } from 'next-intl';
import enMessages from '../../../messages/en.json';
import MethodEditor, { MethodEditorProps } from './MethodEditor';

export const renderMethodEditor = ({ ...props }: MethodEditorProps) =>
  render(
    <NextIntlClientProvider locale={'en'} messages={enMessages}>
      <MethodEditor {...props} />
    </NextIntlClientProvider>
  );
const mockSetMethod = vi.fn();

describe('MethodEditor', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders Select with the chosen method', () => {
    renderMethodEditor({ method: 'POST', setMethod: mockSetMethod });

    const select = screen.getByRole('combobox');
    expect(select).toHaveTextContent('POST');
  });

  it('renders Select with GET by default if method = null', () => {
    renderMethodEditor({ method: null, setMethod: mockSetMethod });

    const select = screen.getByRole('combobox');
    expect(select).toHaveTextContent('GET');
  });

  it('calls setMethod when selecting a new method', () => {
    renderMethodEditor({ method: 'GET', setMethod: mockSetMethod });

    const select = screen.getByRole('combobox');
    fireEvent.mouseDown(select);

    const option = screen.getByText('PATCH');
    fireEvent.click(option);

    expect(mockSetMethod).toHaveBeenCalledWith('PATCH');
  });

  it('renders all available methods', () => {
    renderMethodEditor({ method: 'GET', setMethod: mockSetMethod });

    fireEvent.mouseDown(screen.getByRole('combobox'));

    Object.values(REQUEST_METHODS).forEach((method) => {
      expect(screen.getByRole('option', { name: method })).toBeInTheDocument();
    });
  });
});
