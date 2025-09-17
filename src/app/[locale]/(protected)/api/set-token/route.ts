import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { token } = await req.json();

  if (!token) return NextResponse.json({ error: 'No token' }, { status: 400 });

  const res = NextResponse.json({ ok: true });

  res.cookies.set({
    name: 'token',
    value: token,
    httpOnly: true,
    path: '/',
    maxAge: 86400,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  return res;
}
