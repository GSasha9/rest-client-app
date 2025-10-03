'use client';

import { useTranslations } from 'next-intl';
import s from './BodyEditor.module.scss';
import React, { useEffect, useState } from 'react';
export interface BodyEditorProps {
  body?: string | null;
  url: string | null;
  setBody: (body: string) => void;
}
const BodyEditor: React.FC<BodyEditorProps> = ({ body, url, setBody }) => {
  const t = useTranslations('restClient.restClientPage');
  const [error, setError] = useState(false);
  const [localBody, setLocalBody] = useState(body);

  useEffect(() => {
    setLocalBody(body || '');
  }, [body]);

  const handlePrettify = () => {
    try {
      const parsed = JSON.parse(localBody || '""');
      const prettified = JSON.stringify(parsed, null, 4);

      setLocalBody(prettified);
      setBody(prettified);
      setError(false);
    } catch {
      setError(true);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalBody(event.target.value);
    setError(false);
  };

  const handleBlur = () => {
    setError(false);
    setBody(localBody || '');
  };

  return (
    <div className={`wrapper ${url ? '' : s.inactive}`}>
      {!url && <div className={s['error-text']}>{t('bodyError')}</div>}
      <div>{t('body')}</div>
      <div className={s['content']}>
        <textarea
          value={localBody || ''}
          name="body"
          rows={5}
          cols={33}
          className={s.textarea}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={t('bodyPlaceholder')}
          disabled={!url}
        />
        <button
          className="default-btn"
          onClick={handlePrettify}
          type="button"
          disabled={error || !url}
        >
          {t('prettify')}
        </button>
      </div>
      {error && <p className={s['json-error']}>{t('invalidJson')}</p>}
    </div>
  );
};

export default BodyEditor;
