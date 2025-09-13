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

  const array = useMemo(() => Object.entries(headers), [headers]);

  return (
    <div className={s['wrapper']}>
      <div className={s['title-h4']}>
        Headers{' '}
        <button className="default-btn" onClick={handleAddHeader}>
          add header
        </button>
      </div>
      <div className={s['content']}>
        {array?.map(([key, value]) => (
          <HeaderElement
            headers={headers}
            headerKey={key}
            headerValue={value}
            setData={setHeaders}
            key={key}
          />
        ))}
      </div>
    </div>
  );
};

export default HeadersEditor;
