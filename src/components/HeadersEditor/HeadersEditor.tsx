'use client';

import s from './HeadersEditor.module.scss';
import { HeaderElement } from './HeaderElement';
import { RestHeaders } from '../../models/rest-client';
import { useMemo } from 'react';
import { useTranslations } from 'next-intl';

interface HeadersEditorProps {
  headers: RestHeaders;
  setHeaders: (headers: RestHeaders) => void;
  emptyHeader: boolean;
}

const HeadersEditor = ({
  headers,
  setHeaders,
  emptyHeader,
}: HeadersEditorProps) => {
  const t = useTranslations('restClient.restClientPage');
  const handleAddHeader = () => setHeaders({ ...headers, '': '' });
  const headersArray = useMemo(() => Object.entries(headers), [headers]);
  const handleSetHeaders = (headers: [string, string][]) =>
    setHeaders(Object.fromEntries(headers));

  return (
    <div className={s.wrapper}>
      <div
        className={`${s['title-h4']} ${emptyHeader ? s['empty-header'] : ''}`}
      >
        {t('headers')}{' '}
        <button className="default-btn" onClick={handleAddHeader}>
          {t('addHeader')}
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
