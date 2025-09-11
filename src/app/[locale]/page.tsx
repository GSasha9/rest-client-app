import 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { LocaleType } from '@/i18n/config';
import HomePage from '@/pageComponents/HomePage/HomePage';

interface IProps {
  params: { locale: LocaleType };
}

export default function Page({ params: { locale } }: IProps) {
  setRequestLocale(locale);

  return <HomePage />;
}
