import 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { LocaleType } from '@/i18n/config';
import HomePage from '@/pageComponents/HomePage/HomePage';
// import HistoryAnalytics from '@/components/HistoryAnalytics/HistoryAnalytics';

interface IProps {
  params: Promise<{ locale: LocaleType }>;
}

export default async function Page({ params }: IProps) {
  const { locale } = await params;

  setRequestLocale(locale);

  return <HomePage />;
  // return <HistoryAnalytics />;
}
