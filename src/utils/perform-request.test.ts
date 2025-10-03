import { describe, it, expect } from 'vitest';
import { performRequest } from './perform-request';

describe('performRequest', () => {
  it('successful POST request', async () => {
    const result = await performRequest({
      method: 'GET',
      url: 'https://example.com/success',
    });
    expect(result.ok).toBe(true);
    expect(result.status).toBe(200);
    expect(result.body).toContain('ok');
  });

  it('successful POST request', async () => {
    const result = await performRequest({
      method: 'POST',
      url: 'https://example.com/post',
      body: JSON.stringify({ aa: 'aaaa' }),
    });
    expect(result.ok).toBe(true);
    expect(result.status).toBe(201);
    expect(result.body).toContain('success');
  });

  it('HTTP error 500', async () => {
    const result = await performRequest({
      method: 'GET',
      url: 'https://example.com/error',
    });
    expect(result.ok).toBe(false);
    expect(result.status).toBe(500);
    expect(result.body).toBe('Internal Server Error');
  });
});
