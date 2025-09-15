'use client';

import { useState } from 'react';
import s from './UrlEditor.module.scss';
import { Input } from '@mui/material';

interface UrlEditorProps {
  input: string | null;
  setInput: (url: string) => void;
}

const UrlEditor = ({ input, setInput }: UrlEditorProps) => {
  const [localValue, setLocalValue] = useState(input);

  return (
    <div className={s['wrapper']}>
      <Input
        value={localValue || ''}
        className={'input-field'}
        placeholder="Enter URL"
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={() => setInput(localValue || '')}
      ></Input>
    </div>
  );
};

export default UrlEditor;
