export interface AnalyticsData {
  dataId: string;
  userId: string;
  requestDuration: number;
  responseStatusCode: number;
  requestTimestamp: number;
  requestMethod: string;
  requestSize: number;
  responseSize: number;
  errorDetails: string;
  endpointUrl: string;
  headers?: Record<string, string>;
  body?: string | null;
}
