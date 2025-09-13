'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { Methods, RestHeaders } from '../models/rest-client';

const isMethod = (value: string): value is Methods =>
  value === 'GET' ||
  value === 'PATCH' ||
  value === 'POST' ||
  value === 'PUT' ||
  value === 'DELETE';

export interface RestData {
  method: Methods | null;
  url: string | null;
  headers: RestHeaders;
  body?: string | null;
}

function base64EncodeUnicode(str: string) {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_match, p1) =>
      String.fromCharCode(parseInt(p1, 16))
    )
  );
}

function base64DecodeUnicode(b64: string) {
  const binary = atob(b64);
  const percentEncoded = binary
    .split('')
    .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
    .join('');

  return decodeURIComponent(percentEncoded);
}

export function useRestfulUrl() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const data: RestData = useMemo(() => {
    const segments = (pathname || '').split('/').filter(Boolean);
    const method = isMethod(segments[0]) ? segments[0] : null;
    const encodedUrl = segments[1] ?? null;
    const encodedBody = segments[2] ?? null;

    let url: string | null = null;

    if (encodedUrl) {
      try {
        url = base64DecodeUnicode(encodedUrl);
      } catch {
        url = null;
      }
    }

    let body: string | null = null;

    if (encodedBody) {
      try {
        const bodyStr = base64DecodeUnicode(encodedBody);

        body = JSON.parse(bodyStr);
      } catch {
        try {
          body = base64DecodeUnicode(encodedBody);
        } catch {
          body = null;
        }
      }
    }

    const headers: Record<string, string> = {};

    searchParams?.forEach((value, key) => {
      headers[key] = value;
    });

    return {
      method,
      url,
      headers,
      body,
    };
  }, [pathname, searchParams]);

  const setData = useCallback(
    (newData: Partial<RestData>, { replace = false } = {}) => {
      const merged: RestData = {
        method: newData.method ?? data.method ?? 'GET',
        url: newData.url ?? data.url ?? '',
        headers: { ...(data.headers ?? {}), ...(newData.headers ?? {}) },
        body: newData.body ?? data.body ?? undefined,
      };

      const encUrl = merged.url ? base64EncodeUnicode(merged.url) : '';
      const encBody =
        merged.body !== undefined && merged.body !== null
          ? base64EncodeUnicode(
              typeof merged.body === 'string'
                ? merged.body
                : JSON.stringify(merged.body)
            )
          : null;

      let path = `/${merged.method}/${encUrl}`;

      if (encBody) path += `/${encBody}`;

      const query = new URLSearchParams();

      Object.entries(merged.headers ?? {}).forEach(([key, value]) => {
        if (value === null) {
          query.delete(key);
        } else {
          query.set(key, value);
        }
      });

      const qs = query.toString();
      const href = path + (qs ? `?${qs}` : '');

      if (replace) router.replace(href);
      else router.push(href);
    },
    [data, router]
  );

  const setHeaders = useCallback(
    (headers: RestHeaders) => setData({ headers }),
    [setData]
  );

  const setMethod = useCallback(
    (method: Methods) => setData({ method }),
    [setData]
  );

  const setUrl = useCallback((url: string) => setData({ url }), [setData]);

  const setBody = useCallback((body: string) => setData({ body }), [setData]);

  return {
    data,
    setHeaders,
    setMethod,
    setUrl,
    setBody,
  };
}
