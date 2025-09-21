import { LocalePrefix, Pathnames } from 'next-intl/routing';

export const defaultLocale = 'en' as const;
export const locales = ['en', 'ru'] as const;
export type LocaleType = (typeof locales)[number];

export const localePrefix: LocalePrefix<typeof locales> = 'always';

export const pathnames = {
  '/': '/',
  '/pathnames': {
    en: '/pathnames',
    ru: '/pathnames',
  },
} satisfies Pathnames<typeof locales>;

export const port = process.env.PORT || 3000;
export const host = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `http://localhost:${port}`;
