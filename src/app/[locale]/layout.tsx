import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { locales } from '@/i18n/config';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import theme from '@/theme/theme';
import { ThemeProvider } from '@mui/system';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ToastifyNotification from '@/components/ToastifyNotification';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <head>
        <title>REST Client</title>
      </head>
      <body>
        <NextIntlClientProvider>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <Header />
              <div className="wrapper-app">
                {/* <ErrorBoundary fallback={<ComponentError />}> */}
                {children}
                {/* </ErrorBoundary> */}
              </div>
              <Footer />
              <ToastifyNotification />
            </ThemeProvider>
          </AppRouterCacheProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
