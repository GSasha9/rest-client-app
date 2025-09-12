'use client';

import s from './BodyEditor.module.scss';
import { useState } from 'react';
interface BodyEditorProps {
  body?: string;
  setBody: (body: string) => void;
}
const BodyEditor: React.FC<BodyEditorProps> = ({ body, setBody }) => {
  const [error, setError] = useState(false);
  // const bodyRef = useRef<HTMLTextAreaElement | null>(null); //не нужно
  const handlePrettify = () => {
    try {
      const parsed = JSON.parse(body || '""');

      setBody(JSON.stringify(parsed, null, 4));
      setError(false);
    } catch {
      setError(true);
    }
  };

  return (
    <div className={s['wrapper']}>
      <div>Body:</div>
      <div className={s['content']}>
        <textarea
          value={body}
          // ref={bodyRef}
          name="body"
          rows={2}
          cols={33}
          className={s.textarea}
          onChange={(e) => {
            setError(false);
            setBody(e.currentTarget.value);
          }}
          placeholder="enter in json format"
        />
        <button
          className="default-btn"
          onClick={handlePrettify}
          type="button"
          // disabled={error || !localBody}
        >
          Prettify
        </button>
      </div>
      {error && <p className={s['json-error']}>Invalid JSON</p>}
    </div>
  );
};

export default BodyEditor;
