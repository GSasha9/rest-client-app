import { describe, it, expect } from 'vitest';
import { encodeBase64 } from './encode-base64';

describe('encodeBase64', () => {
  it('encodes a simple string into base64', () => {
    expect(encodeBase64('Hello + World!')).toBe('SGVsbG8gKyBXb3JsZCE%3D');
  });

  it('returns an empty string for an empty input', () => {
    expect(encodeBase64('')).toBe('');
  });
});
