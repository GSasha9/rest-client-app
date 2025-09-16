import dynamic from 'next/dynamic';
import { decodeBase64 } from '@/utils/decode-base64';
import { serverSearchParamsToObject } from '@/utils/server-search-params-to-object';
import { performRequest } from '../../../../../../utils/perform-request';

export const RestClient = dynamic(() => import('@/pageComponents/RestClient'));

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

  const decodeUrl = decodeBase64(url);
  const decodeBody = body ? decodeBase64(body) : undefined;
  const headers = serverSearchParamsToObject(searchParams);

  const result = await performRequest({
    method: method.toUpperCase(),
    url: decodeUrl,
    body: decodeBody,
    headers,
  });

  // await requestToFirebase(userId, {
  //   method: method.toUpperCase(),
  //   url: url1,
  //   headers,
  //   body: body1,
  //   timestamp: Date.now(),
  //   duration: result.duration,
  //   statusCode: result.status,
  //   requestSize: result.requestSize,
  //   responseSize: result.responseSize,
  //   error: result.error,
  // });

  console.log({ method, decodeUrl, decodeBody, headers });
  console.log({ result });

  return <RestClient response={result} />;
}
