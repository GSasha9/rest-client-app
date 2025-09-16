'use client';

import { fetchUserAnalytics } from '@/lib/analytics/actions';
import { useState, useEffect } from 'react';
import { FetchedAnalyticsData } from './types/fetched-analytics-data';
import dynamic from 'next/dynamic';
import { auth } from '@/lib/firebase';

const HistoryAnalyticsServer = dynamic(
  () => import('./HistoryAnalyticsServer'),
  { loading: () => <div>Loading analytics...</div> }
);

const HistoryAnalyticsClient = () => {
  const [data, setData] = useState<FetchedAnalyticsData | []>([]);

  const user = auth.currentUser;

  useEffect(() => {
    const performAnalyticsData = async () => {
      if (!user) return;

      const result = await fetchUserAnalytics(user.uid);

      setData(result);
    };

    performAnalyticsData();
  }, [user]);

  return (
    <>
      <div>History Requests</div>
      {data ? (
        <HistoryAnalyticsServer data={data} />
      ) : (
        <div>
          You haven&apos;t executed any requests. It&apos;s empty here.Try:{' '}
        </div>
      )}
    </>
  );
};

export default HistoryAnalyticsClient;
