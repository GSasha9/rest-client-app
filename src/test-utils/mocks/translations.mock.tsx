import { getTranslations } from 'next-intl/server';

export type Translations = Awaited<ReturnType<typeof getTranslations>>;

export const createMockT = (): Translations => {
  const fn = ((key: string, params?: Record<string, unknown>) =>
    params ? `${key} ${JSON.stringify(params)}` : key) as Translations;

  fn.rich = () => '' as React.ReactNode;
  fn.markup = () => '';
  fn.raw = () => '';
  fn.has = () => true;

  return fn;
};
