import { render, screen } from '@testing-library/react';
import Developers from './Developers';
import { IntlProvider } from 'next-intl';

const messages = {
  ksusha: 'Kseniya Sharshneva',
  sasha: 'Alexandra Hurbanava',
  maxim: 'Maxim Dudaryonak',
};

describe('Developers', () => {
  it('renders all developer cards with names, roles, contributions and images', () => {
    render(
      <IntlProvider messages={messages} locale="en">
        <Developers />
      </IntlProvider>
    );

    expect(screen.getByText(messages.ksusha)).toBeInTheDocument();
    expect(screen.getByText(messages.sasha)).toBeInTheDocument();
    expect(screen.getByText(messages.maxim)).toBeInTheDocument();

    expect(screen.getAllByText('Front-end developer').length).toBe(3);

    expect(screen.getByText('REST Client, Variables')).toBeInTheDocument();
    expect(
      screen.getByText('History and Analytics, Main Page')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Authorization, Header, Footer')
    ).toBeInTheDocument();

    expect(screen.getByAltText(messages.ksusha)).toBeInTheDocument();
    expect(screen.getByAltText(messages.sasha)).toBeInTheDocument();
    expect(screen.getByAltText(messages.maxim)).toBeInTheDocument();
  });
});
