import { AnalyticsData } from './analytics-data.type';
import { dbAdmin } from '../firebase-admin';

export const GetUserAnalyticsData = async (
  userId: string
): Promise<AnalyticsData[]> => {
  const snapshot = await dbAdmin
    .collection('requestHistory')
    .where('userId', '==', userId)
    .orderBy('requestTimestamp', 'desc')
    .get();

  const data: AnalyticsData[] = snapshot.docs.map((doc) => {
    const docData = doc.data();

    return {
      userId: docData.userId,
      requestMethod: docData.requestMethod,
      endpointUrl: docData.endpointUrl,
      requestTimestamp: docData.requestTimestamp,
      requestDuration: docData.requestDuration,
      responseStatusCode: docData.responseStatusCode,
      requestSize: docData.requestSize,
      responseSize: docData.responseSize,
      errorDetails: docData.errorDetails || '',
    };
  });

  return data;
};
