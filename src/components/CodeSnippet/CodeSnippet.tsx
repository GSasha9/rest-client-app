'use client';

import { LANGUAGES } from '@/shared/constants/languages';
import codeGenerator from '@/utils/code-generator';
import { Box, Tabs, Tab } from '@mui/material';
import { useState } from 'react';
import ReactCodeMirror from '@uiw/react-codemirror';
import './CodeSnippet.scss';
import { RestData } from '../../models/rest-client';
import { useTranslations } from 'next-intl';

interface CodeSnippetProps {
  data: RestData;
}

const CodeSnippet = ({ data }: CodeSnippetProps) => {
  const t = useTranslations('restClient.restClientPage');
  const [result, setResult] = useState('');
  const [value, setValue] = useState<string>(LANGUAGES.jsFetch.label);

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
      <h4 className="title-h4">{t('code')}</h4>

      <div className="code-snippet">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            aria-label="basic tabs example"
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              width: '100%',
              '& .MuiTabs-flexContainer': {
                flexWrap: 'nowrap',
              },
              '& .MuiTab-root': {
                minWidth: { xs: 50, sm: 70, md: 80 },
                fontSize: { xs: '0.6rem', sm: '0.75rem', md: '1rem' },
                padding: { xs: '4px 6px', sm: '6px 10px', md: '8px 12px' },
              },
            }}
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
