export interface AnalyticsData {
  userId: string;
  requestDuration: number;
  responseStatusCode: number;
  requestTimestamp: number;
  requestMethod: string;
  requestSize: number;
  responseSize: number;
  errorDetails: string;
  endpointUrl: string;
}
