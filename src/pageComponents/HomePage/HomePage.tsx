'use client';

import { Button } from '@mui/material';
import HeadersEditor from '@/components/HeadersEditor/HeadersEditor';
import BodyEditor from '../../components/BodyEditor';
import s from './HomePage.module.scss';
import { useRestfulUrl } from '../../hooks/restful-url';
import { HeaderItem /* Methods */ } from '../../models/rest-client';

const HomePage = () => {
  const [{ headers, body /* method, url */ }, setData] = useRestfulUrl();

  const handleSetHeaders = (headers: HeaderItem[]) => setData({ headers });
  const handleSetBody = (body: string) => setData({ body });
  // const handleSetMethod = (method: Methods) => setData({ method });
  // const handleSetUrl = (url: string) => setData({ url });

  return (
    <div className={s['wrapper']}>
      {/* <div className={s['request']}>
        <RequestEditor
          method={method}
          handleSelect={handleSelect}
          handleUrl={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            setUrl(e.currentTarget.value)
          }
        />
      </div> */}
      <Button className="default-btn">Send</Button>
      <HeadersEditor headers={headers} setHeaders={handleSetHeaders} />
      <BodyEditor body={body} setBody={handleSetBody} />
      {/* <CodeSnippet
        data={{ url: url, method: method, header: header, body: body }}
      /> */}
    </div>
  );
};

export default HomePage;
