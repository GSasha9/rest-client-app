'use client';

import './home-page.scss';

import RequestEditor from '@/components/request-editor/request-editor';
import { REQUEST_METHODS } from '@/shared/constants/request-methods';
import { SelectChangeEvent } from '@mui/material';
import CodeSnippet from '@/components/code-snippet/code-snippet';
import { Button } from '@mui/material';
import { ChangeEvent } from 'react';
import HeadersEditor from '@/components/headers-editor/headers-editor';
import BodyEditor from '@/components/body-editor/body-editor';

import { useState } from 'react';
import useDebounce from '@/hooks/use-debounce';

const HomePage = () => {
  const [method, setMethod] = useState(REQUEST_METHODS.get);
  const [url, setUrl] = useState('');
  const [body, setBody] = useState('');
  const [header, setHeader] = useState<{ key: string; value: string }[]>([]);

  console.log('method: ', method);
  console.log('url: ', url);
  console.log('body: ', body);
  console.log('header: ', header);

  const handleSelect = (e: SelectChangeEvent) => {
    setMethod(e.target.value);
  };

  const debounceHandleUrl = useDebounce((arg) => setUrl(arg as string), 1000);

  const debounceHandleBody = useDebounce((arg) => setBody(arg as string), 1000);

  const handleHeader = (obj: { key: string; value: string }) => {
    setHeader((prev) => [...prev, obj]);
  };

  return (
    <div className="editor">
      <div className="request-editor container">
        <RequestEditor
          method={method}
          handleSelect={handleSelect}
          handleUrl={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            debounceHandleUrl(e.currentTarget.value)
          }
        />
        <div className="request-editor__item-button">
          <Button className="default-btn">Send</Button>
        </div>
      </div>

      <div className="request-details-editor container">
        <HeadersEditor handleHeader={handleHeader} />
        <BodyEditor body={body} handleBody={debounceHandleBody} />
      </div>
      <CodeSnippet
        data={{ url: url, method: method, header: header, body: body }}
      />
    </div>
  );
};

export default HomePage;
