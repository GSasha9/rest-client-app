'use client';

import { fetchUserAnalytics } from '@/lib/analytics/actions';
import { useState } from 'react';
import HistoryAnalyticsServer from './HistoryAnalyticsServer';
import { FetchedAnalyticsData } from './types/fetched-analytics-data';
import { AnalyticsData } from '@/lib/analytics';

export const mockAnalyticsData: AnalyticsData = {
  userId: '1',
  requestDuration: 125,
  responseStatusCode: 200,
  requestTimestamp: 1757666765,
  requestMethod: 'GET',
  requestSize: 25,
  responseSize: 50,
  errorDetails: '',
  endpointUrl: 'mock',
};

const HistoryAnalyticsClient = () => {
  const [data, setData] = useState<FetchedAnalyticsData | null>(null);

  //write data to the database
  //
  // useEffect(() => {
  //   const saveData = async () => {
  //     try {
  //       await saveAnalyticsData(mockAnalyticsData);
  //       console.log('Analytics saved!');
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   saveData();
  // }, []);

  const handleClick = async (userId: string = '1') => {
    const result = await fetchUserAnalytics(userId);

    setData(result);
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
