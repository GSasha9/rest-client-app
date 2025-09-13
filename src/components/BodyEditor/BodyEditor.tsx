'use client';

import s from './BodyEditor.module.scss';
import { useState } from 'react';
interface BodyEditorProps {
  body?: string | null;
  setBody: (body: string) => void;
}
const BodyEditor: React.FC<BodyEditorProps> = ({ body, setBody }) => {
  const [error, setError] = useState(false);
  const handlePrettify = () => {
    try {
      const parsed = JSON.parse(body || '""');

      setBody(JSON.stringify(parsed, null, 4));
      setError(false);
    } catch {
      setError(true);
    }
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
          value={body || ''}
          name="body"
          rows={2}
          cols={33}
          className={s.textarea}
          onChange={() => {
            setError(false);
          }}
          onBlur={(e) => {
            handleBlur(e);
          }}
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
