import { fetchUserAnalytics } from '@/lib/analytics/actions';
import { getTranslations } from 'next-intl/server';
import { tockenCheck } from '@/utils/token-check';
import HistoryAnalyticsServerWrapper from '../../../../components/HistoryAnalytics/HistoryAnalyticsServerWrapper';

export default async function HistoryAnalyticsPage() {
  const user = await tockenCheck();
  const t = await getTranslations('history');

  const data = await fetchUserAnalytics(user.uid);

  if (data.length === 0) return <div>{t('noRequests')}</div>;

  const columnHeaders = [
    t('columnsName.duration'),
    t('columnsName.statusCode'),
    t('columnsName.timestamp'),
    t('columnsName.method'),
    t('columnsName.requestSize'),
    t('columnsName.responseSize'),
    t('columnsName.error'),
    t('columnsName.endpoint'),
  ];

  return (
    <HistoryAnalyticsServerWrapper data={data} columnHeaders={columnHeaders} />
  );
}
