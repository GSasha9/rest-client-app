'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { HistoryAnalyticsServerProps } from './HistoryAnalyticsServer';

const HistoryAnalyticsServer = dynamic(
  () => import('./HistoryAnalyticsServer'),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

export default function HistoryAnalyticsServerWrapper({
  data,
  columnHeaders,
}: HistoryAnalyticsServerProps) {
  return <HistoryAnalyticsServer data={data} columnHeaders={columnHeaders} />;
}
