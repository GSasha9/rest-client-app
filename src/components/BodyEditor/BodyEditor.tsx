'use client';

import s from './BodyEditor.module.scss';
import React, { useState } from 'react';
interface BodyEditorProps {
  body?: string | null;
  setBody: (body: string) => void;
}
const BodyEditor: React.FC<BodyEditorProps> = ({ body, setBody }) => {
  const [error, setError] = useState(false);
  const [localBody, setLocalBody] = useState(body);

  const handlePrettify = () => {
    try {
      const parsed = JSON.parse(localBody || '""');

      setBody(JSON.stringify(parsed, null, 4));
      setError(false);
    } catch {
      setError(true);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalBody(event.target.value);
    setError(false);
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement, Element>) => {
    setError(false);
    setBody(e.currentTarget.value);
  };

  return (
    <div className={s['wrapper']}>
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
        />
        <button className="default-btn" onClick={handlePrettify} type="button">
          Prettify
        </button>
      </div>
      {error && <p className={s['json-error']}>Invalid JSON</p>}
    </div>
  );
};

export default BodyEditor;
