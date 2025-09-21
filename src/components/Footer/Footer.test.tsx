import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Footer from './Footer';
import { NextIntlClientProvider } from 'next-intl';
import enMessages from '../../../messages/en.json';
import userEvent from '@testing-library/user-event';
import { FC, JSX } from 'react';

vi.mock('next/image', () => ({
  __esModule: true,
  default: ((props: JSX.IntrinsicElements['img']) => <img {...props} />) as FC<
    JSX.IntrinsicElements['img']
  >,
}));

vi.mock('next/font/google', () => ({
  Roboto: () => ({
    className: 'roboto-font',
    style: {
      fontFamily: 'Roboto',
    },
  }),
}));

describe('Footer', () => {
  const renderFooter = () =>
    render(
      <NextIntlClientProvider locale="en" messages={enMessages}>
        <Footer />
      </NextIntlClientProvider>
    );

  it('renders all the main elements', () => {
    renderFooter();

    expect(screen.getByText('GSasha')).toBeInTheDocument();
    expect(screen.getByText('MaximD')).toBeInTheDocument();
    expect(screen.getByText('KsushaSher')).toBeInTheDocument();
    expect(screen.getByText(/2025/i)).toBeInTheDocument();

    const img = screen.getByAltText('courseLogo');
    expect(img).toBeInTheDocument();
  });

  it('contains correct href links', () => {
    renderFooter();

    expect(screen.getByText('GSasha').closest('a')).toHaveAttribute(
      'href',
      'https://github.com/GSasha9'
    );
    expect(screen.getByText('MaximD').closest('a')).toHaveAttribute(
      'href',
      'https://github.com/MaximDudaryonok'
    );
    expect(screen.getByText('KsushaSher').closest('a')).toHaveAttribute(
      'href',
      'https://github.com/ksushasher'
    );

    const logoLink = screen.getByAltText('courseLogo').closest('a');
    expect(logoLink).toHaveAttribute('href', 'https://rs.school/');
  });

  it('checks navigation on click', async () => {
    renderFooter();
    const user = userEvent.setup();

    const gsashaLink = screen.getByText('GSasha').closest('a')!;
    await user.click(gsashaLink);
    expect(gsashaLink).toHaveAttribute('href', 'https://github.com/GSasha9');

    const maximLink = screen.getByText('MaximD').closest('a')!;
    await user.click(maximLink);
    expect(maximLink).toHaveAttribute(
      'href',
      'https://github.com/MaximDudaryonok'
    );

    const ksushaLink = screen.getByText('KsushaSher').closest('a')!;
    await user.click(ksushaLink);
    expect(ksushaLink).toHaveAttribute('href', 'https://github.com/ksushasher');

    const logoLink = screen.getByAltText('courseLogo').closest('a')!;
    await user.click(logoLink);
    expect(logoLink).toHaveAttribute('href', 'https://rs.school/');
  });
});
