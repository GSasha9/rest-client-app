import dynamic from 'next/dynamic';
import { decodeBase64 } from '@/utils/decode-base64';
import { serverSearchParamsToObject } from '@/utils/server-search-params-to-object';

const RestClient = dynamic(() => import('@/pageComponents/RestClient'));

async function performRequest(
  method: string,
  url: string,
  body?: string,
  headers?: Record<string, string>
) {
  try {
    const response = await fetch(url, {
      method,
      headers: headers,
      body: method !== 'GET' && method !== 'HEAD' ? body : undefined,
    });

    const text = await response.text();

    return {
      ok: response.ok,
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      body: text,
    };
  } catch (err: unknown) {
    return {
      ok: false,
      status: 0,
      statusText: 'Network Error',
      headers: {},
      body: err instanceof Error ? err.message : 'Unknown error',
    };
  }
}

interface PageProps {
  params: { method: string; rest: [string, string] };
  searchParams?: Record<string, string>;
}

export default async function RestClientPage({
  params,
  searchParams,
}: PageProps) {
  const { method, rest = [] } = params;
  const [url = '', body] = rest;

  const url1 = decodeBase64(url);
  const body1 = body ? decodeBase64(body) : undefined;
  const headers = serverSearchParamsToObject(searchParams);

  const result = await performRequest(
    method.toUpperCase(),
    url1,
    body1,
    headers
  );

  console.log({ method, url1, body1, headers });
  console.log({ result });

  return <RestClient />;
}
