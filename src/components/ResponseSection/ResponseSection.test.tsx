import { getByText, render, screen } from '@testing-library/react';
import { describe, it, vi, beforeEach } from 'vitest';
import { NextIntlClientProvider } from 'next-intl';
import enMessages from '../../../messages/en.json';
import ResponseSection, { ResponseSectionProps } from './ResponseSection';
import { toast } from 'react-toastify';
import { RequestResult } from '../../utils/perform-request';

vi.mock('react-toastify', () => ({
  toast: { error: vi.fn() },
}));

const mockRequestResult: RequestResult = {
  ok: true,
  status: 200,
  statusText: 'OK',
  headers: { 'Content-Type': 'application/json' },
  body: 'a:1',
  duration: 123,
  requestSize: 456,
  responseSize: 789,
};
const mockRequestResultError: RequestResult = {
  ok: false,
  status: 500,
  statusText: 'Internal Server Error',
  headers: {},
  body: '',
  duration: 200,
  requestSize: 256,
  responseSize: 0,
  error: 'Server error occurred',
};

const renderComponent = (props: ResponseSectionProps) =>
  render(
    <NextIntlClientProvider locale="en" messages={enMessages}>
      <ResponseSection {...props} />
    </NextIntlClientProvider>
  );

describe('ResponseSection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders response body and status', () => {
    renderComponent({ response: mockRequestResult });

    expect(screen.getByText(/a:1/i)).toBeInTheDocument();
    expect(screen.getByText(/200/i)).toBeInTheDocument();
  });

  it('raises toast.error on network error', () => {
    renderComponent({
      errorDetails: { type: 'network', message: 'Network error' },
    });

    expect(toast.error).toHaveBeenCalledWith('Network error', {
      toastId: 'network-error',
    });
  });

  it('renders a message when an HTTP error occurs', () => {
    renderComponent({
      response: mockRequestResultError,
      errorDetails: { type: 'http', message: 'HTTP Error' },
    });

    expect(screen.getByText(/response/i)).toBeInTheDocument();

    if (mockRequestResultError.body) {
      expect(screen.getByText(/HTTP Error/i)).toBeInTheDocument();
    }
  });
});
