import { cookies } from 'next/headers';
import { getUserFromCookie } from '@/lib/firebase-admin';
import { fetchUserAnalytics } from '@/lib/analytics/actions';
import { redirect } from 'next/navigation';

import HistoryAnalyticsWrapper from '@/components/HistoryAnalytics/HistoryAnalyticsWrapper';
import ROUTES from '@/shared/types/types';

export default async function HistoryAnalyticsPage() {
  const cookiesList = await cookies();
  const token = cookiesList.get('token')?.value;

  if (!token) redirect(ROUTES.SIGN_IN);

  const user = await getUserFromCookie(token);

  if (!user) redirect(ROUTES.SIGN_IN);

  const data = await fetchUserAnalytics(user.uid);

  return <HistoryAnalyticsWrapper data={data} />;
}
