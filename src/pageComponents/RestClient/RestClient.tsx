'use client';

import { Button } from '@mui/material';
import HeadersEditor from '@/components/HeadersEditor/HeadersEditor';
import BodyEditor from '../../components/BodyEditor';
import s from './RestClient.module.scss';
import { useRestfulUrl } from '../../hooks/restful-url';
import MethodEditor from '../../components/MethodEditor/MethodEditor';
import UrlEditor from '../../components/UrlEditor/UrlEditor';
import CodeSnippet from '../../components/CodeSnippet/CodeSnippet';
import { useCallback } from 'react';
import ResponseSection from '../../components/ResponseSection';
import { RequestResult } from '../../utils/perform-request';

interface RestClientProps {
  response?: RequestResult;
}

const RestClient = ({ response }: RestClientProps) => {
  const { state, setHeaders, setMethod, setUrl, setBody, send } =
    useRestfulUrl();
  const { headers, body, method, url } = state;

  const isBody = useCallback(() => {
    return method !== undefined && method !== 'GET' && method !== 'DELETE';
  }, [method]);

  return (
    <div className={s['wrapper']}>
      <div className={s['request']}>
        <MethodEditor method={method} setMethod={setMethod} />
        <UrlEditor input={url} setInput={setUrl} />
        <Button className="default-btn" onClick={send}>
          Send
        </Button>
      </div>
      <HeadersEditor headers={headers} setHeaders={setHeaders} />
      {isBody() && <BodyEditor body={body} url={url} setBody={setBody} />}
      <ResponseSection response={response} />
      <CodeSnippet data={state} />
    </div>
  );
};

export default RestClient;
