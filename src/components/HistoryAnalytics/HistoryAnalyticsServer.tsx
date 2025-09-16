import { FetchedAnalyticsData } from './types/fetched-analytics-data';
import s from './HistoryAnalytics.module.scss';

interface HistoryAnalyticsServerProps {
  data?: FetchedAnalyticsData;
}

const HistoryAnalyticsServer = ({ data }: HistoryAnalyticsServerProps) => {
  return (
    <div className={s['analytics-data']}>
      {data?.map((el) => {
        return (
          <button className={s['button-link']} key={el.requestTimestamp}>
            <span className={s['button-link-method']}>{el.requestMethod}</span>
            <span>{el.endpointUrl}</span>
          </button>
        );
      })}
    </div>
  );
};

export default HistoryAnalyticsServer;
