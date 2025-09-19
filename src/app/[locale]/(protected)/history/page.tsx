import { cookies } from 'next/headers';
import { getUserFromCookie } from '@/lib/firebase-admin';
import { fetchUserAnalytics } from '@/lib/analytics/actions';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import HistoryAnalyticsServer from '@/components/HistoryAnalytics/HistoryAnalyticsServer';

import ROUTES from '@/shared/types/types';

export default async function HistoryAnalyticsPage() {
  const cookiesList = await cookies();
  const token = cookiesList.get('token')?.value;

  if (!token) redirect(ROUTES.SIGN_IN);

  const user = await getUserFromCookie(token);

  if (!user) redirect(ROUTES.SIGN_IN);

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

  return <HistoryAnalyticsServer data={data} columnHeaders={columnHeaders} />;
}
