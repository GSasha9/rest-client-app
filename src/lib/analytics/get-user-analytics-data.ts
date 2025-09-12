import { dbAdmin } from '../firebase-admin';

export const GetUserAnalyticsData = async (userId: string) => {
  const snapshot = await dbAdmin
    .collection('requestHistory')
    .where('userId', '==', userId)
    .orderBy('requestTimestamp', 'desc')
    .get();

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
};
