'use client';

import { Button } from '@mui/material';
import HeadersEditor from '@/components/HeadersEditor/HeadersEditor';
import BodyEditor from '../../components/BodyEditor';
import s from './HomePage.module.scss';
import { useRestfulUrl } from '../../hooks/restful-url';
import { HeaderItem, Methods } from '../../models/rest-client';
import MethodEditor from '../../components/MethodEditor/MethodEditor';
import UrlEditor from '../../components/UrlEditor/UrlEditor';
import CodeSnippet from '../../components/CodeSnippet/CodeSnippet';

const HomePage = () => {
  const [data, setData] = useRestfulUrl();
  const { headers, body, method, url } = data;

  const handleSetHeaders = (headers: HeaderItem[]) => setData({ headers });
  const handleSetBody = (body: string) => setData({ body });
  const handleSetMethod = (method: Methods) => setData({ method });
  const handleSetUrl = (url: string) => setData({ url });

  return (
    <div className={s['wrapper']}>
      <div className={s['request']}>
        <MethodEditor method={method} setMethod={handleSetMethod} />
        <UrlEditor input={url} setInput={handleSetUrl} />
        <Button className="default-btn">Send</Button>
      </div>
      <HeadersEditor headers={headers} setHeaders={handleSetHeaders} />
      <BodyEditor body={body} setBody={handleSetBody} />
      <CodeSnippet data={data} />
    </div>
  );
};

export default HomePage;
