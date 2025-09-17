'use client';

import { useState, useEffect } from 'react';
import s from './UrlEditor.module.scss';

interface UrlEditorProps {
  input: string | null;
  setInput: (url: string) => void;
}

const UrlEditor = ({ input, setInput }: UrlEditorProps) => {
  const [localValue, setLocalValue] = useState(input);

  useEffect(() => {
    setLocalValue(input);
  }, [input]);

  return (
    <div className="wrapper">
      <input
        value={localValue || ''}
        className={s.input}
        placeholder="Enter URL"
        onChange={(e) => {
          setLocalValue(e.target.value);
          setInput(e.target.value);
        }}
      />
    </div>
  );
};

export default UrlEditor;
