import { addDoc, collection } from 'firebase/firestore';
import { AnalyticsData } from './analytics-data.type';
import { db } from '../firebase';

export const saveAnalyticsData = async (analyticsData: AnalyticsData) => {
  try {
    await addDoc(collection(db, 'requestHistory'), analyticsData);
    console.log('Analytics saved!');
  } catch (err) {
    console.error('Error saving analytic:', err);
  }
};
