import { useTranslations } from 'next-intl';
import s from './HeadersEditor.module.scss';
import { useState } from 'react';

interface HeaderElementProps {
  headers: [string, string][];
  headerKey: string;
  headerValue: string;
  index: number;
  setData: (data: [string, string][]) => void;
}

export const HeaderElement = ({
  headers,
  headerKey,
  headerValue,
  index,
  setData,
}: HeaderElementProps) => {
  const t = useTranslations('restClient.restClientPage');
  const [key, setKey] = useState(headerKey);
  const [value, setValue] = useState(headerValue);
  const [error, setError] = useState(false);

  const handleSetHeader = () => {
    if (error) return;

    const newHeaders: [string, string][] = headers.map((item, idx) =>
      idx === index ? [key, value] : item
    );

    setData(newHeaders);
  };

  const handleChangeKey = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(headers.some(([key]) => key === event.target.value));
    setKey(event.target.value);
  };

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value);

  const handleRemove = () =>
    setData(headers.filter((item, idx) => index !== idx));

  return (
    <div className={s['header-item']}>
      <input
        className={`${s['input']} ${error ? s['error'] : ''}`}
        placeholder={t('key')}
        value={key}
        onChange={handleChangeKey}
        onBlur={handleSetHeader}
        name="key"
      />
      <input
        className={s['input']}
        placeholder={t('value')}
        value={value}
        onChange={handleChangeValue}
        onBlur={handleSetHeader}
        name="value"
      />
      <button className="default-btn" onClick={handleRemove}>
        {t('deleteHeader')}
      </button>
    </div>
  );
};
