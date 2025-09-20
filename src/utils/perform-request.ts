export interface RequestParams {
  method: string;
  url: string;
  body?: string;
  headers?: Record<string, string>;
}

export interface RequestResult {
  ok: boolean;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: string;
  duration: number;
  requestSize: number;
  responseSize: number;
  error?: string;
}

export const performRequest = async ({
  method,
  url,
  body,
  headers,
}: RequestParams): Promise<RequestResult> => {
  const start = Date.now();
  let responseText = '';
  let responseHeaders: Record<string, string> = {};

  try {
    const response = await fetch(url, {
      method,
      headers: headers,
      body: method !== 'GET' && method !== 'HEAD' ? body : undefined,
    });

    responseText = await response.text();
    responseHeaders = Object.fromEntries(response.headers.entries());

    const duration = Date.now() - start;
    const requestSize = body ? new Blob([body]).size : 0;
    const responseSize = new Blob([responseText]).size;

    return {
      ok: response.ok,
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
      body: responseText,
      duration,
      requestSize,
      responseSize,
    };
  } catch (err: unknown) {
    const duration = Date.now() - start;
    const requestSize = body ? new Blob([body]).size : 0;

    return {
      ok: false,
      status: 0,
      statusText: 'Network Error',
      headers: {},
      body: err instanceof Error ? err.message : 'Unknown error',
      duration,
      requestSize,
      responseSize: 0,
      error: err instanceof Error ? err.message : 'Unknown error',
    };
  }
};
