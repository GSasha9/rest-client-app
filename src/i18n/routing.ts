import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'ru'],
  defaultLocale: 'en',

  pathnames: {
    '/': '/',
    '/pathnames': {
      ru: '/pathnames',
      en: '/pathnames',
    },
  },
});
