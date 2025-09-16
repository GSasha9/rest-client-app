'use client';

import HeadersEditor from '@/components/HeadersEditor/HeadersEditor';
import BodyEditor from '../../components/BodyEditor';
import s from './RestClient.module.scss';
import { useRestfulUrl } from '../../hooks/restful-url';
import MethodEditor from '../../components/MethodEditor/MethodEditor';
import UrlEditor from '../../components/UrlEditor/UrlEditor';
import CodeSnippet from '../../components/CodeSnippet/CodeSnippet';
import ResponseSection from '../../components/ResponseSection';
import { RequestResult } from '../../utils/perform-request';
import { AnalyticsData } from '@/lib/analytics';
import { auth } from '@/lib/firebase';
import { useSearchParams } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Methods, RestHeaders } from '@/models/rest-client';
import { useCallback, useEffect, useState } from 'react';
import { ErrorState } from '../../utils/explain-error';

interface RestClientProps {
  response?: RequestResult;
  errorDetails: ErrorState;
}

const RestClient = ({ response, errorDetails }: RestClientProps) => {
  const [emptyHeader, setEmptyHeader] = useState(false);
  const { state, setHeaders, setMethod, setUrl, setBody, send } =
    useRestfulUrl();
  const { headers, body, method, url } = state;
  const searchParams = useSearchParams();

  const dataId = searchParams.get('dataId');

  const isBody = useCallback(() => {
    return method !== undefined && method !== 'GET' && method !== 'DELETE';
  }, [method]);

  useEffect(() => {
    if (!dataId) return;

    const fetchSavedRequest = async () => {
      try {
        const user = auth.currentUser;

        if (!user) return;

        const docRef = doc(db, 'requestHistory', dataId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          return;
        }

        const docData = docSnap.data() as AnalyticsData;

        if (docData.userId !== user.uid) {
          return;
        }

        setUrl(docData.endpointUrl);
        setMethod(docData.requestMethod as Methods);
        setHeaders(docData.headers as RestHeaders);
        setBody(docData.body || '');
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchSavedRequest();
  }, [dataId, setUrl, setMethod, setHeaders, setBody]);

  useEffect(() => {
    const sendAnalytics = async () => {
      if (!response) return;

      const user = auth.currentUser;

      if (!user) return;

      const newDataId = crypto.randomUUID();

      const analyticsData: AnalyticsData = {
        dataId: newDataId,
        userId: user.uid,
        requestMethod: method?.toUpperCase() ?? 'GET',
        endpointUrl: url ?? '',
        requestTimestamp: Date.now(),
        requestDuration: response.duration,
        responseStatusCode: response.status,
        requestSize: response.requestSize,
        responseSize: response.responseSize,
        errorDetails: response.error || '',
        body: body,
        headers: headers,
      };

      await setDoc(doc(db, 'requestHistory', newDataId), analyticsData);
    };

    sendAnalytics();
  }, [body, headers, response, method, url]);

  const isEmptyHeader = () => {
    const emptyValue = Object.entries(headers).some(
      ([key, value]) => key === '' || value === ''
    );

    setEmptyHeader(emptyValue);
  };

  return (
    <div className={s['wrapper']}>
      <div className={s['request']}>
        <MethodEditor method={method} setMethod={setMethod} />
        <UrlEditor input={url} setInput={setUrl} />
        <button
          className="default-btn"
          onClick={() => {
            send();
            isEmptyHeader();
          }}
        >
          Send
        </button>
      </div>
      <HeadersEditor
        headers={headers}
        setHeaders={setHeaders}
        emptyHeader={emptyHeader}
      />
      {isBody() && <BodyEditor body={body} url={url} setBody={setBody} />}
      <ResponseSection response={response} errorDetails={errorDetails} />
      <CodeSnippet data={state} />
    </div>
  );
};

export default RestClient;
