'use client';

import { mockAnalyticsData } from '@/lib/analytics';
import { saveAnalyticsData } from '@/lib/analytics/save-analytics-data';
import { useEffect } from 'react';

const HistoryAnalytics = () => {
  useEffect(() => {
    const saveData = async () => {
      try {
        await saveAnalyticsData(mockAnalyticsData);
        console.log('Analytics saved!');
      } catch (err) {
        console.error(err);
      }
    };

    saveData();
  }, []);

  return <div>HistoryAnalytics</div>;
};

export default HistoryAnalytics;
