import dynamic from 'next/dynamic';
import { decodeBase64 } from '@/utils/decode-base64';
import { serverSearchParamsToObject } from '@/utils/server-search-params-to-object';
import { performRequest } from '@/utils/perform-request';
import { explainError } from '@/utils/explain-error';
import { getTranslations } from 'next-intl/server';

export const RestClient = dynamic(() => import('@/pageComponents/RestClient'));

interface PageProps {
  params: { method: string; rest: [string, string] };
  searchParams?: Record<string, string>;
}

export default async function RestClientPage({
  params,
  searchParams,
}: PageProps) {
  const t = await getTranslations('restClient.queryErrorMessages');
  const { method, rest = [] } = await params;
  const [url = '', body] = rest;

  const decodeUrl = decodeBase64(url);
  const decodeBody = body ? decodeBase64(body) : undefined;
  const headers = await searchParams;
  const headersObject = serverSearchParamsToObject(headers);

  const result = await performRequest({
    method: method.toUpperCase(),
    url: decodeUrl,
    body: decodeBody,
    headers: headersObject,
  });

  const errorDetails = explainError(
    {
      ok: result.ok,
      status: result.status,
      statusText: result.statusText,
      error: result.error,
    },
    t
  );

  return <RestClient response={result} errorDetails={errorDetails} />;
}
