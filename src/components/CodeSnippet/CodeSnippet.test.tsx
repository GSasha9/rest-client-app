import { describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import CodeSnippet from './CodeSnippet';
import userEvent from '@testing-library/user-event';
import { LANGUAGES } from '@/shared/constants/languages';
import { NextIntlClientProvider } from 'next-intl';
import { RestData } from '../../models/rest-client';

describe('CodeSnippet', () => {
  const mockData: RestData = {
    url: 'test.com',
    method: 'POST',
    headers: { key: 'headerKey', value: 'headerValue' },
    body: 'testBody',
  };
  it('renders tabs correctly', () => {
    render(
      <NextIntlClientProvider locale="en">
        <CodeSnippet data={mockData} />{' '}
      </NextIntlClientProvider>
    );

    const tabs = screen.getAllByRole('tab');
    expect(tabs.map((t) => t.textContent)).toEqual(
      expect.arrayContaining([
        'Java Script (Fetch API)',
        'Java Script (XHR)',
        'curl',
        'NodeJS',
        'Python',
        'Java',
        'C#',
        'Go',
      ])
    );
    expect(screen.getAllByRole('tab').length).toEqual(8);
  });

  it('clicking a tab generates code', async () => {
    render(
      <NextIntlClientProvider locale="en">
        <CodeSnippet data={mockData} />
      </NextIntlClientProvider>
    );

    expect(screen.getByRole('tab', { selected: true })).toHaveTextContent(
      LANGUAGES.jsFetch.label
    );

    const curlTab = screen.getByRole('tab', { name: /curl/i });

    await userEvent.click(curlTab);

    expect(curlTab).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('textbox')).toHaveTextContent('curl');

    const goTab = screen.getByRole('tab', { name: LANGUAGES.go.label });

    await userEvent.click(goTab);

    expect(curlTab).toHaveAttribute('aria-selected', 'false');
  });
});
