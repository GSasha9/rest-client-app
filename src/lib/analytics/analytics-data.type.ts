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

export const mockAnalyticsData: AnalyticsData = {
  userId: '1',
  requestDuration: 125,
  responseStatusCode: 200,
  requestTimestamp: 1757666765,
  requestMethod: 'GET',
  requestSize: 25,
  responseSize: 50,
  errorDetails: '',
  endpointUrl: 'mock',
};
