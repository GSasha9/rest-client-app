'use client';
import Link from 'next/link';
import ROUTES from '@/shared/types/types';
import { AnalyticsData } from '@/lib/analytics';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

const HistoryAnalyticsServer = dynamic(
  () => import('@/components/HistoryAnalytics/HistoryAnalyticsServer')
);

interface HistoryAnalyticsClientProps {
  data: AnalyticsData[];
}

const HistoryAnalyticsClient = ({ data }: HistoryAnalyticsClientProps) => {
  const t = useTranslations();

  return (
    <div>
      <h1>{t('history.title')}</h1>
      {data.length ? (
        <HistoryAnalyticsServer data={data} />
      ) : (
        <div>
          {t('history.noRequests')}
          <Link href={ROUTES.RESTFUL}> RESTful client</Link>
        </div>
      )}
    </div>
  );
};

export default HistoryAnalyticsClient;
