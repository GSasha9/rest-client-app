'use server';

import { GetUserAnalyticsData } from './get-user-analytics-data';

const fetchUserAnalytics = async (userId: string) => {
  const data = await GetUserAnalyticsData(userId);

  return data;
};

export { fetchUserAnalytics };
