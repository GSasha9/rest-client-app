import Link from 'next/link';
import s from './HistoryAnalytics.module.scss';
import ROUTES from '@/shared/types/types';
import { FetchedAnalyticsData } from './types/fetched-analytics-data';

interface HistoryAnalyticsServerProps {
  data?: FetchedAnalyticsData;
}

const HistoryAnalyticsServer = ({ data }: HistoryAnalyticsServerProps) => {
  return (
    <div className={s['analytics-data']}>
      {data?.map((el) => (
        <Link
          key={el.dataId}
          href={`${ROUTES.RESTFUL}?dataId=${el.dataId}`}
          className={s['button-link']}
        >
          <span className={s['button-link-method']}>{el.requestMethod}</span>
          <span>{el.endpointUrl}</span>
        </Link>
      ))}
    </div>
  );
};

export default HistoryAnalyticsServer;
