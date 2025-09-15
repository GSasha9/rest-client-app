'use client';

import s from './BodyEditor.module.scss';
import React, { useEffect, useState } from 'react';
interface BodyEditorProps {
  body?: string | null;
  url: string | null;
  setBody: (body: string) => void;
}
const BodyEditor: React.FC<BodyEditorProps> = ({ body, url, setBody }) => {
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
    <div className={`${s.wrapper} ${url ? '' : s.inactive}`}>
      <div>Body:</div>
      <div className={s['content']}>
        <textarea
          value={localBody || ''}
          name="body"
          rows={2}
          cols={33}
          className={s.textarea}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="enter in json format"
          disabled={!url}
        />
        <button
          className="default-btn"
          onClick={handlePrettify}
          type="button"
          disabled={error || !url}
        >
          Prettify
        </button>
      </div>
      {error && <p className={s['json-error']}>Invalid JSON</p>}
    </div>
  );
};

export default BodyEditor;
