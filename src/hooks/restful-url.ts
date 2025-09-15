'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { Methods, RestData, RestHeaders } from '../models/rest-client';
import { decodeBase64 } from '../utils/decode-base64';
import { encodeBase64 } from '../utils/encode-base64';
import { isMethod } from '../models/typeguard/rest-data';
import { searchParamsToObject } from '../utils/search-param-to-object';

export function useRestfulUrl() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const data: RestData = useMemo(() => {
    const segments = (pathname || '').split('/').filter(Boolean);
    const method = isMethod(segments[2]) ? segments[2] : null;
    const encodedUrl = segments[3] ?? null;
    const encodedBody = segments[4] ?? null;

    let url: string | null = null;

    if (encodedUrl) {
      try {
        url = decodeBase64(encodedUrl);
      } catch {
        url = null;
      }
    }

    let body: string | null = null;

    if (encodedBody) {
      try {
        const bodyStr = decodeBase64(encodedBody);

        body = bodyStr;
      } catch {
        try {
          body = decodeBase64(encodedBody);
        } catch {
          body = null;
        }
      }
    }

    const headers = searchParamsToObject(searchParams);

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
        body: newData.body ?? data.body ?? undefined,
        headers: {
          ...(newData.headers ? newData.headers : (data.headers ?? {})),
        },
      };

      const encUrl = merged.url ? encodeBase64(merged.url) : '';
      const encBody =
        merged.body !== undefined && merged.body !== null
          ? encodeBase64(
              typeof merged.body === 'string'
                ? merged.body
                : JSON.stringify(merged.body)
            )
          : null;

      let path = `/client/${merged.method}/${encUrl}`;

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
