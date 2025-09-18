'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import { Methods, RestData, RestHeaders } from '../models/rest-client';
import { decodeBase64 } from '../utils/decode-base64';
import { encodeBase64 } from '../utils/encode-base64';
import { searchParamsToObject } from '../utils/search-param-to-object';
import { isMethod } from '../models/typeguard/request';

export function useRestfulUrl() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [state, setState] = useState(() => {
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
  });

  const send = useCallback(() => {
    const merged: RestData = {
      method: state.method ?? 'GET',
      url: state.url ?? '',
      body: state.body ?? undefined,
      headers: state.headers,
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

    router.replace(href);
  }, [router, state.body, state.headers, state.method, state.url]);

  const setHeaders = useCallback(
    (headers: RestHeaders) => setState((prev) => ({ ...prev, headers })),
    []
  );

  const setMethod = useCallback(
    (method: Methods) => setState((prev) => ({ ...prev, method })),
    []
  );

  const setUrl = useCallback(
    (url: string) => setState((prev) => ({ ...prev, url })),
    []
  );

  const setBody = useCallback(
    (body: string) => setState((prev) => ({ ...prev, body })),
    []
  );

  return { state, setHeaders, setMethod, setUrl, setBody, send };
}

export type { RestData };
