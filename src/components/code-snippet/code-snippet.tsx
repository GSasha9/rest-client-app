'use client';

import { LANGUAGES } from '@/shared/constants/languages';
import codeGenerator from '@/shared/utils/code-generator';
import { Box, Tabs, Tab } from '@mui/material';
import { useState } from 'react';
import ReactCodeMirror from '@uiw/react-codemirror';
import './code-snippet.scss';

interface CodeSnippetProps {
  data: {
    url: string;
    method: string;
    header: { key: string; value: string }[];
    body: string;
  };
}

const CodeSnippet = ({ data }: CodeSnippetProps) => {
  const [result, setResult] = useState('');
  const [value, setValue] = useState('');

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    if (newValue === '') return;

    setValue(newValue);

    const convertTo = {
      language: '',
      variant: '',
    };

    Object.keys(LANGUAGES).map((el) => {
      const key = el as keyof typeof LANGUAGES;

      if (LANGUAGES[key].label === newValue) {
        convertTo.language = LANGUAGES[key].language;
        convertTo.variant = LANGUAGES[key].variant;
      }
    });

    const newData = { ...data, convertTo };

    const result = codeGenerator(newData);

    setResult(result);
  };

  return (
    <div className="code">
      <h4 className="title-h4">Code</h4>

      <div className="code-snippet">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            aria-label="basic tabs example"
            onChange={handleChange}
          >
            {Object.keys(LANGUAGES).map((el) => {
              const key = el as keyof typeof LANGUAGES;

              return (
                <Tab
                  value={LANGUAGES[key].label}
                  label={LANGUAGES[key].label}
                  key={key}
                />
              );
            })}
          </Tabs>
        </Box>
        <ReactCodeMirror
          className="code-snippet-result"
          value={result}
          readOnly={true}
          height="300px"
        />
      </div>
    </div>
  );
};

export default CodeSnippet;
