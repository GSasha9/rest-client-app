'use client';

import s from './HeadersEditor.module.scss';
import { HeaderElement } from './HeaderElement';
import { RestHeaders } from '../../models/rest-client';
import { useMemo } from 'react';

interface HeadersEditorProps {
  headers: RestHeaders;
  setHeaders: (headers: RestHeaders) => void;
}

const HeadersEditor = ({ headers, setHeaders }: HeadersEditorProps) => {
  const handleAddHeader = () => setHeaders({ ...headers, '': '' });

  const headersArray = useMemo(() => Object.entries(headers), [headers]);

  const handleSetHeaders = (headers: [string, string][]) =>
    setHeaders(Object.fromEntries(headers));

  return (
    <div className="wrapper">
      <div className={s['title-h4']}>
        Headers{' '}
        <button className="default-btn" onClick={handleAddHeader}>
          add header
        </button>
      </div>
      <div className={s['content']}>
        {headersArray?.map(([key, value], index) => (
          <HeaderElement
            headers={headersArray}
            headerKey={key}
            headerValue={value}
            setData={handleSetHeaders}
            key={key}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default HeadersEditor;
