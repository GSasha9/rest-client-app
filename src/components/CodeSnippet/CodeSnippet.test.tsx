import { describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import CodeSnippet from './CodeSnippet';
import userEvent from '@testing-library/user-event';
import { Methods } from '../../models/rest-client';
import { RestData } from '../../hooks/restful-url';

describe('CodeSnippet', () => {
  const mockData: RestData = {
    url: 'test.com',
    method: 'POST',
    headers: { key: 'headerKey', value: 'headerValue' },
    body: 'testBody',
  };
  it('renders tabs correctly', () => {
    render(<CodeSnippet data={mockData} />);

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
    expect(screen.getAllByRole('tab').length).toEqual(9);
  });

  it('clicking a tab generates code', async () => {
    render(<CodeSnippet data={mockData} />);

    expect(screen.getByRole('tab', { selected: true })).toHaveTextContent('');

    const curlTab = screen.getByRole('tab', { name: /curl/i });

    await userEvent.click(curlTab);

    expect(curlTab).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('textbox')).toHaveTextContent('curl');

    const emptyTab = screen.getByRole('tab', { name: '' });

    await userEvent.click(emptyTab);

    expect(curlTab).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('textbox')).toHaveTextContent('curl');
  });
});
