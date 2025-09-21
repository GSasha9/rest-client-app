import 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { LocaleType } from '@/i18n/config';
import MainPage from '@/pageComponents/MainPage/MainPage';

interface IProps {
  params: Promise<{ locale: LocaleType }>;
}

export default async function Page({ params }: IProps) {
  const { locale } = await params;

  setRequestLocale(locale);

  return <MainPage />;
}
