'use client';

import { useState } from 'react';
import s from './UrlEditor.module.scss';

interface UrlEditorProps {
  input: string | null;
  setInput: (url: string) => void;
}

const UrlEditor = ({ input, setInput }: UrlEditorProps) => {
  const [localValue, setLocalValue] = useState(input);

  return (
    <div className="wrapper">
      <input
        value={localValue || ''}
        className={s.input}
        placeholder="Enter URL"
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={() => setInput(localValue || '')}
      ></input>
    </div>
  );
};

export default UrlEditor;
