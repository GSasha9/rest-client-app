'use client';

import dynamic from 'next/dynamic';
import { AnalyticsData } from '@/lib/analytics';
import Loader from '../Loader';

const HistoryAnalyticsClient = dynamic(
  () => import('@/components/HistoryAnalytics/HistoryAnalyticsClient'),
  { loading: () => <Loader /> }
);

interface Props {
  data: AnalyticsData[];
}

export default function HistoryAnalyticsWrapper({ data }: Props) {
  return <HistoryAnalyticsClient data={data} />;
}
