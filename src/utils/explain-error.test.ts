import { describe, it, expect, beforeEach } from 'vitest';
import { explainError, ErrorInfo, ErrorState } from './explain-error';
import {
  createMockT,
  Translations,
} from '../test-utils/mocks/translations.mock';

describe('explainError', () => {
  let t: Translations;

  beforeEach(() => {
    t = createMockT();
  });

  it('returns null if ok=true', () => {
    const err: ErrorInfo = { ok: true, status: 200, statusText: 'OK' };
    const result: ErrorState = explainError(err, t);
    expect(result).toBeNull();
  });

  it('returns a network error when using CORS', () => {
    const err: ErrorInfo = {
      ok: false,
      status: 0,
      statusText: '',
      error: 'CORS blocked',
    };
    const result = explainError(err, t);
    expect(result).toEqual({ type: 'network', message: 'cors' });
  });

  it('returns a network error on network issue', () => {
    const err: ErrorInfo = {
      ok: false,
      status: 0,
      statusText: '',
      error: 'Network down',
    };
    const result = explainError(err, t);
    expect(result).toEqual({ type: 'network', message: 'network' });
  });

  it('returns a network error on timeout', () => {
    const err: ErrorInfo = {
      ok: false,
      status: 0,
      statusText: '',
      error: 'Timeout exceeded',
    };
    const result = explainError(err, t);
    expect(result).toEqual({ type: 'network', message: 'timeout' });
  });

  it('returns a network error if an unknown error occurs', () => {
    const err: ErrorInfo = {
      ok: false,
      status: 0,
      statusText: '',
      error: 'Some unknown issue',
    };
    const result = explainError(err, t);
    expect(result).toEqual({ type: 'network', message: 'unknownError' });
  });

  it('returns HTTP error 400-499', () => {
    const err: ErrorInfo = { ok: false, status: 404, statusText: 'Not Found' };
    const result = explainError(err, t);
    expect(result).toEqual({
      type: 'http',
      message: '400500 {"status":404,"statusText":"Not Found"}',
    });
  });

  it('returns http error 500+', () => {
    const err: ErrorInfo = {
      ok: false,
      status: 503,
      statusText: 'Service Unavailable',
    };
    const result = explainError(err, t);
    expect(result).toEqual({
      type: 'http',
      message: 'more500 {"status":503,"statusText":"Service Unavailable"}',
    });
  });

  it('returns the default HTTP error for an unknown status', () => {
    const err: ErrorInfo = { ok: false, status: 300, statusText: 'Redirect' };
    const result = explainError(err, t);
    expect(result).toEqual({ type: 'http', message: 'somethingWrong' });
  });
});
