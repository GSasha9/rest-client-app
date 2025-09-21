import { render, screen } from '@testing-library/react';
import PageNavigation from './PageNavigation';
import { IntlProvider } from 'next-intl';

const messages = {
  dashboard: {
    restful: 'RESTful client',
    history: 'History',
    variables: 'Variables',
  },
};

describe('PageNavigation', () => {
  it('renders navigation buttons with correct text and links', () => {
    render(
      <IntlProvider messages={messages} locale="en">
        <PageNavigation />
      </IntlProvider>
    );

    const restfulButton = screen.getByText('RESTful client');
    const historyButton = screen.getByText('History');
    const variablesButton = screen.getByText('Variables');

    expect(restfulButton).toBeInTheDocument();
    expect(historyButton).toBeInTheDocument();
    expect(variablesButton).toBeInTheDocument();
  });
});
