import { render, screen } from '@testing-library/react';
import HistoryAnalyticsServer from './HistoryAnalyticsServer';
import ROUTES from '@/shared/types/types';

const mockData = [
  {
    dataId: '1',
    userId: 'user123',
    requestDuration: 120,
    responseStatusCode: 200,
    requestTimestamp: Date.now(),
    requestMethod: 'GET',
    requestSize: 512,
    responseSize: 1024,
    errorDetails: '',
    endpointUrl: '/api/test',
  },
];

const mockColumnHeaders = [
  'Duration',
  'Status Code',
  'Timestamp',
  'Method',
  'Request Size',
  'Response Size',
  'Error Details',
  'Endpoint/URL',
];

describe('HistoryAnalyticsServer', () => {
  it('renders table with headers and data', () => {
    render(
      <HistoryAnalyticsServer
        data={mockData}
        columnHeaders={mockColumnHeaders}
      />
    );

    mockColumnHeaders.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });

    expect(screen.getByText('120 ms')).toBeInTheDocument();
    expect(screen.getByText('200')).toBeInTheDocument();
    expect(screen.getByText('GET')).toBeInTheDocument();
    expect(screen.getByText('512 B')).toBeInTheDocument();
    expect(screen.getByText('1024 B')).toBeInTheDocument();
    expect(screen.getByText('-')).toBeInTheDocument();
    expect(screen.getByText('/api/test')).toBeInTheDocument();

    const link = screen.getByText('/api/test').closest('a');
    expect(link).toHaveAttribute('href', `${ROUTES.RESTFUL}?dataId=1`);
  });
});
