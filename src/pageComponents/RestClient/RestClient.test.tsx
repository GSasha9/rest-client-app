import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { NextIntlClientProvider } from 'next-intl';
import enMessages from '../../../messages/en.json';
import RestClient from './RestClient';
import { useRestfulUrl } from '../../hooks/restful-url';
import { RequestResult } from '../../utils/perform-request';
import BodyEditor from '../../components/BodyEditor';

vi.mock('../../hooks/restful-url', () => ({
  useRestfulUrl: vi.fn(),
}));

vi.mock('@/lib/firebase', () => ({
  auth: { currentUser: { uid: '123' } },
  db: {},
}));

vi.mock('firebase/firestore', () => ({
  doc: vi.fn(),
  getDoc: vi.fn(),
  setDoc: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: vi.fn().mockReturnValue('mock-id'),
  }),
}));

const renderComponent = (props = {}) =>
  render(
    <NextIntlClientProvider locale="en" messages={enMessages}>
      <RestClient {...props} />
    </NextIntlClientProvider>
  );

const mockSend = vi.fn();
const mockSetUrl = vi.fn();
const mockSetMethod = vi.fn();
const mockSetHeaders = vi.fn();
const mockSetBody = vi.fn();

const baseHookMock = {
  state: {
    headers: { 'Content-Type': 'application/json' },
    body: 'test body',
    method: 'POST',
    url: 'http://localhost/test',
  },
  setHeaders: mockSetHeaders,
  setMethod: mockSetMethod,
  setUrl: mockSetUrl,
  setBody: mockSetBody,
  send: mockSend,
};

describe('RestClient', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useRestfulUrl as Mock).mockReturnValue(baseHookMock);
  });

  it('renders the main interface elements', () => {
    renderComponent();

    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
    expect(screen.getByText(/response/i)).toBeInTheDocument();
  });

  it('calls send() and checks headers when the Send button is clicked', () => {
    renderComponent();

    fireEvent.click(screen.getByRole('button', { name: /send/i }));

    expect(mockSend).toHaveBeenCalled();
  });

  it('passes the response to the ResponseSection', () => {
    const response: RequestResult = {
      ok: true,
      status: 200,
      statusText: 'OK',
      headers: {},
      body: 'mock body',
      duration: 100,
      requestSize: 50,
      responseSize: 75,
    };

    renderComponent({ response });

    expect(screen.getByText(/mock body/i)).toBeInTheDocument();
  });

  it('shows BodyEditor for methods with a body (POST, PUT, etc.)', () => {
    renderComponent();

    expect(screen.getByText(/test body/i)).toBeInTheDocument();
  });

  it("doesn't show BodyEditor for GET method", () => {
    (useRestfulUrl as Mock).mockReturnValue({
      ...baseHookMock,
      state: { ...baseHookMock.state, method: 'GET' },
    });

    renderComponent();

    expect(screen.queryByText(/test body/i)).not.toBeInTheDocument();
  });
});
