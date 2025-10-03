import Link from 'next/link';
import s from './HistoryAnalytics.module.scss';
import ROUTES from '@/shared/types/types';
import { FetchedAnalyticsData } from './models/types/fetched-analytics-data';

export interface HistoryAnalyticsServerProps {
  data?: FetchedAnalyticsData;
  columnHeaders: string[];
}

const HistoryAnalyticsServer = ({
  data,
  columnHeaders,
}: HistoryAnalyticsServerProps) => {
  return (
    <div className={s['analytics-data']}>
      <table className={s['analytics-table']}>
        <thead>
          <tr>
            {columnHeaders.map((el) => (
              <th key={el}>{el}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((el) => (
            <tr key={el.dataId}>
              <td>{el.requestDuration} ms</td>
              <td>{el.responseStatusCode}</td>
              <td>{new Date(el.requestTimestamp).toLocaleString()}</td>
              <td>{el.requestMethod}</td>
              <td>{el.requestSize} B</td>
              <td>{el.responseSize} B</td>
              <td>{el.errorDetails || '-'}</td>
              <td>
                <Link
                  href={`${ROUTES.RESTFUL}?dataId=${el.dataId}`}
                  className={s['url-link']}
                >
                  {el.endpointUrl}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryAnalyticsServer;
