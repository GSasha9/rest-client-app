import { describe, it, expect } from 'vitest';
import { POST } from './route';
import { NextResponse } from 'next/server';

describe('POST /api/login', () => {
  it('вreturns 400 if there is no token', async () => {
    const req = new Request('http://localhost/api/login', {
      method: 'POST',
      body: JSON.stringify({}),
    });

    const res = await POST(req);

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json).toEqual({ error: 'No token' });
  });

  it('sets a cookie and returns ok: true', async () => {
    const token = 'abc123';
    const req = new Request('http://localhost/api/login', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });

    const res = await POST(req);

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toEqual({ ok: true });

    const cookies = res.headers.get('set-cookie');
    expect(cookies).toContain(`token=${token}`);
    expect(cookies).toContain('HttpOnly');
    expect(cookies).toContain('Path=/');
  });
});
