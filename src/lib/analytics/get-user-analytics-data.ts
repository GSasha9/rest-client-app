import { collection, orderBy, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { AnalyticsData } from './analytics-data.type';

export const GetUserAnalyticsData = async (userId: string) => {
  const q = query(
    collection(db, 'requestHistory'),
    where('userId', '==', userId),
    orderBy('requestTimestamp', 'desc')
  );
  const queryResult = await getDocs(q);

  return queryResult.docs.map((doc) => doc.data() as AnalyticsData);
};
