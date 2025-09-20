import { describe, it, expect } from 'vitest';
import { decodeBase64 } from './decode-base64';

describe('decodeBase64', () => {
  it('decodes a valid base64 string', () => {
    const input = encodeURIComponent(
      Buffer.from('Hello + World!').toString('base64')
    );
    const result = decodeBase64(input);
    expect(result).toBe('Hello + World!');
  });

  it('returns an empty string for an empty input', () => {
    const result = decodeBase64('');
    expect(result).toBe('');
  });
});
