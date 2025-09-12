import { FetchedAnalyticsData } from './types/fetched-analytics-data';

interface HistoryAnalyticsServerProps {
  data?: FetchedAnalyticsData;
}

const HistoryAnalyticsServer = ({ data }: HistoryAnalyticsServerProps) => {
  return (
    <>
      <div>HistoryAnalytics</div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
};

export default HistoryAnalyticsServer;
