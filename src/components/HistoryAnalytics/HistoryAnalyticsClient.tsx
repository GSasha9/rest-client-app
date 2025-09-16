'use client';

import { fetchUserAnalytics } from '@/lib/analytics/actions';
import { useState } from 'react';
import { FetchedAnalyticsData } from './types/fetched-analytics-data';
import dynamic from 'next/dynamic';
import { auth } from '@/lib/firebase';

const HistoryAnalyticsServer = dynamic(
  () => import('./HistoryAnalyticsServer'),
  { loading: () => <div>Loading analytics...</div> }
);

const HistoryAnalyticsClient = () => {
  const [data, setData] = useState<FetchedAnalyticsData | null>(null);

  const user = auth.currentUser;

  const handleClick = async () => {
    if (user) {
      const result = await fetchUserAnalytics(user.uid);

      setData(result);
    }
  };

  return (
    <>
      <div>HistoryAnalytics</div>
      <button
        onClick={() => handleClick()}
        style={{
          color: 'blue',
          cursor: 'pointer',
          width: '300px',
        }}
      >
        mockLink
      </button>

      {data && <HistoryAnalyticsServer data={data} />}
    </>
  );
};

export default HistoryAnalyticsClient;
