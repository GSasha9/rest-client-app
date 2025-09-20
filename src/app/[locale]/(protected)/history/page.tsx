import { fetchUserAnalytics } from '@/lib/analytics/actions';
import { getTranslations } from 'next-intl/server';
import { tockenCheck } from '@/utils/token-check';
import HistoryAnalyticsServerWrapper from '../../../../components/HistoryAnalytics/HistoryAnalyticsServerWrapper';

export default async function HistoryAnalyticsPage() {
  const user = await tockenCheck();

  if (!user) return;

  const data = await fetchUserAnalytics(user.uid);

  const t = await getTranslations('history.columnsName');
  const columnHeaders = [
    t('duration'),
    t('statusCode'),
    t('timestamp'),
    t('method'),
    t('requestSize'),
    t('responseSize'),
    t('error'),
    t('endpoint'),
  ];

  return (
    <HistoryAnalyticsServerWrapper data={data} columnHeaders={columnHeaders} />
  );
}
