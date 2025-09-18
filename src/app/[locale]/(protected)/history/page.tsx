import HistoryAnalyticsServer from '@/components/HistoryAnalytics/HistoryAnalyticsServer';
import { cookies } from 'next/headers';
import { getUserFromCookie } from '@/lib/firebase-admin';
import { fetchUserAnalytics } from '@/lib/analytics/actions';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import ROUTES from '@/shared/types/types';

export default async function HistoryAnalyticsPage() {
  const cookiesList = await cookies();
  const token = cookiesList.get('token')?.value;

  if (!token) redirect('/login');

  const user = await getUserFromCookie(token);

  if (!user) redirect('/login');

  const data = await fetchUserAnalytics(user.uid);

  return (
    <div>
      <h1>History Requests</h1>
      {data.length ? (
        <HistoryAnalyticsServer data={data} />
      ) : (
        <div>
          You haven&apos;t executed any requests yet. Try:
          <Link href={ROUTES.RESTFUL}> RESTful client</Link>
        </div>
      )}
    </div>
  );
}
