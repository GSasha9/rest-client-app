'use client';

import { useParams, useRouter } from 'next/navigation';
import { useTransition, useState, useEffect } from 'react';
import { FormControl, Select, MenuItem } from '@mui/material';
import s from './LanguageSwitcher.module.scss';

import { locales, LocaleType } from '@/i18n/config';

const LANGUAGE_MAP = {
  en: 'EN',
  ru: 'РУ',
} as const;

const LanguageSwitcher = () => {
  const router = useRouter();
  const params = useParams();
  const [isPending, startTransition] = useTransition();
  const currentLocale = params.locale as LocaleType;

  const [value, setValue] = useState<LocaleType>(currentLocale);

  useEffect(() => {
    setValue(currentLocale);
  }, [currentLocale]);

  const handleLocaleChange = (newLocale: LocaleType) => {
    if (newLocale === currentLocale) return;

    setValue(newLocale);

    startTransition(() => {
      const currentPath = window.location.pathname;
      const newPath = currentPath.replace(currentLocale, newLocale);

      router.push(newPath);
    });
  };

  return (
    <FormControl variant="standard">
      <Select
        labelId="lang-select-label"
        className={s['lang-select']}
        value={value}
        label="Lang"
        disabled={isPending}
        onChange={(e) => handleLocaleChange(e.target.value as LocaleType)}
      >
        {locales.map((locale) => (
          <MenuItem key={locale} value={locale}>
            {LANGUAGE_MAP[locale]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LanguageSwitcher;
