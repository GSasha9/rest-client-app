'use client';

import s from './HeadersEditor.module.scss';
import { HeaderItem } from '../../models/rest-client';
import { HeaderElement } from './HeaderElement';

interface HeadersEditorProps {
  headers: HeaderItem[];
  setHeaders: (headers: HeaderItem[]) => void;
}

const HeadersEditor = ({ headers, setHeaders }: HeadersEditorProps) => {
  const handleAddHeader = () => {
    setHeaders([...(headers || []), { key: '', value: '', on: true }]);
  };

  return (
    <div className={s['wrapper']}>
      <div className={s['title-h4']}>
        Headers{' '}
        <button className="default-btn" onClick={handleAddHeader}>
          add header
        </button>
      </div>
      <div className={s['content']}>
        {headers?.map((header, index) => (
          <HeaderElement
            headers={headers}
            data={header}
            index={index}
            setData={setHeaders}
            key={`${index}${header.key}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeadersEditor;
