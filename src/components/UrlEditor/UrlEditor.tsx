'use client';

import { useState, useEffect } from 'react';
import s from './UrlEditor.module.scss';
import { useTranslations } from 'next-intl';

interface UrlEditorProps {
  input: string | null;
  setInput: (url: string) => void;
}

const UrlEditor = ({ input, setInput }: UrlEditorProps) => {
  const t = useTranslations('restClient.restClientPage');
  const [localValue, setLocalValue] = useState(input);

  useEffect(() => {
    setLocalValue(input);
  }, [input]);

  return (
    <div className="wrapper">
      <input
        value={localValue || ''}
        className={s.input}
        placeholder={t('enterUrl')}
        onChange={(e) => setLocalValue(e.target.value)}
        // onChange={(e) => {
        //   setLocalValue(e.target.value);
        //   setInput(e.target.value);
        // }}
        onBlur={() => setInput(localValue || '')}
      ></input>
    </div>
  );
};

export default UrlEditor;
