'use client';

import HeadersEditor from '@/components/HeadersEditor/HeadersEditor';
import BodyEditor from '../../components/BodyEditor';
import s from './RestClient.module.scss';
import { useRestfulUrl } from '../../hooks/restful-url';
import MethodEditor from '../../components/MethodEditor/MethodEditor';
import UrlEditor from '../../components/UrlEditor/UrlEditor';
import CodeSnippet from '../../components/CodeSnippet/CodeSnippet';
import { useCallback, useEffect } from 'react';
import ResponseSection from '../../components/ResponseSection';
import { RequestResult } from '../../utils/perform-request';
import { AnalyticsData } from '@/lib/analytics';
import { saveAnalyticsData } from '@/lib/analytics/save-analytics-data';
import { auth } from '@/lib/firebase';

interface RestClientProps {
  response?: RequestResult;
  requestMethod: string;
  requestUrl: string;
}

const RestClient = ({
  response,
  requestMethod,
  requestUrl,
}: RestClientProps) => {
  const { state, setHeaders, setMethod, setUrl, setBody, send } =
    useRestfulUrl();
  const { headers, body, method, url } = state;

  const isBody = useCallback(() => {
    return method !== undefined && method !== 'GET' && method !== 'DELETE';
  }, [method]);

  useEffect(() => {
    const sendAnalytics = async () => {
      if (!response) return;

      const user = auth.currentUser;

      if (!user) return;

      const userId = user.uid;

      const analyticsData: AnalyticsData = {
        userId: userId,
        requestMethod: requestMethod.toUpperCase(),
        endpointUrl: requestUrl,
        requestTimestamp: Date.now(),
        requestDuration: response.duration,
        responseStatusCode: response.status,
        requestSize: response.requestSize,
        responseSize: response.responseSize,
        errorDetails: response.error || '',
        body: body,
        headers: headers,
      };

      await saveAnalyticsData(analyticsData);
    };

    sendAnalytics();
  }, [body, headers, requestMethod, requestUrl, response]);

  return (
    <div className={s['wrapper']}>
      <div className={s['request']}>
        <MethodEditor method={method} setMethod={setMethod} />
        <UrlEditor input={url} setInput={setUrl} />
        <button className="default-btn" onClick={send}>
          Send
        </button>
      </div>
      <HeadersEditor headers={headers} setHeaders={setHeaders} />
      {isBody() && <BodyEditor body={body} url={url} setBody={setBody} />}
      <ResponseSection response={response} />
      <CodeSnippet data={state} />
    </div>
  );
};

export default RestClient;
