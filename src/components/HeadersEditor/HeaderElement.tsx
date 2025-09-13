import { RestHeaders } from '../../models/rest-client';
import s from './HeadersEditor.module.scss';
import { useState } from 'react';

interface HeaderElementProps {
  headers: RestHeaders;
  headerKey: string;
  headerValue: string;
  setData: (data: RestHeaders) => void;
}

export const HeaderElement = ({
  headers,
  headerKey,
  headerValue,
  setData,
}: HeaderElementProps) => {
  const [key, setKey] = useState(headerKey);
  const [value, setValue] = useState(headerValue);

  const handleSetHeader = () => setData({ ...headers, [headerKey]: value });

  const handleChangeKey = (event: React.ChangeEvent<HTMLInputElement>) =>
    setKey(event.target.value);

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value);

  const handleRemove = () => {
    const newHeaders = { ...headers };

    delete newHeaders[key];
    setData(newHeaders);
  };

  return (
    <div className={s['header-item']}>
      <input
        className={s['input']}
        placeholder="key"
        value={key}
        onChange={handleChangeKey}
        onBlur={handleSetHeader}
        name="key"
      />
      <input
        className={s['input']}
        placeholder="value"
        value={value}
        onChange={handleChangeValue}
        onBlur={handleSetHeader}
        name="value"
      />
      <button className="default-btn" onClick={handleRemove}>
        delete
      </button>
    </div>
  );
};
