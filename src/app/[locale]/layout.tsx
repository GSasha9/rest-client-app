import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import theme from '@/theme/theme';
import { ThemeProvider } from '@mui/system';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ToastifyNotification from '@/components/ToastifyNotification';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'REACTQ32025',
};

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} className="light">
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
