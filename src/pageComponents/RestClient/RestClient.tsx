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

const RestClient = () => {
  const { data, setHeaders, setMethod, setUrl, setBody } = useRestfulUrl();
  const { headers, body, method, url } = data;

  const isBody = useCallback(() => {
    return method !== undefined && method !== 'GET' && method !== 'DELETE';
  }, [method]);

  return (
    <div className={s['wrapper']}>
      <div className={s['request']}>
        <MethodEditor method={method} setMethod={setMethod} />
        <UrlEditor input={url} setInput={setUrl} />
        <Button className="default-btn">Send</Button>
      </div>
      <HeadersEditor headers={headers} setHeaders={setHeaders} />
      {isBody() && <BodyEditor body={body} setBody={setBody} />}
      <ResponseSection />
      <CodeSnippet data={data} />
    </div>
  );
};

export default RestClient;
