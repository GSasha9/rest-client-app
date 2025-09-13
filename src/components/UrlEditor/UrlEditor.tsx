'use client';

import s from './UrlEditor.module.scss';
import { Input } from '@mui/material';

interface UrlEditorProps {
  input: string | null;
  setInput: (url: string) => void;
}

const UrlEditor = ({ input, setInput }: UrlEditorProps) => {
  return (
    <div className={s['wrapper']}>
      <Input
        value={input}
        className={'input-field'}
        placeholder="Enter URL"
        onChange={(e) => setInput(e.target.value)}
      ></Input>
    </div>
  );
};

export default UrlEditor;
