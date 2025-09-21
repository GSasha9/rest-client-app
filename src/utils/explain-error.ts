import { getTranslations } from 'next-intl/server';

export interface ErrorInfo {
  ok: boolean;
  status: number;
  statusText: string;
  error?: string;
}
export type ErrorState = {
  type: 'http' | 'network';
  message: string;
} | null;

export function explainError(
  err: ErrorInfo,
  t: ReturnType<typeof getTranslations> extends Promise<infer T> ? T : never
): ErrorState {
  if (err.ok) return null;

  if (err.status === 0) {
    const error = err.error?.toLowerCase() ?? '';

    if (error.includes('cors')) {
      return {
        type: 'network',
        message: t('cors'),
      };
    }

    if (error.includes('network')) {
      return {
        type: 'network',
        message: t('network'),
      };
    }

    if (error.includes('timeout')) {
      return {
        type: 'network',
        message: t('timeout'),
      };
    }

    return {
      type: 'network',
      message: t('unknownError'),
    };
  }

  if (err.status >= 400 && err.status < 500) {
    return {
      type: 'http',
      message: t('400500', { status: err.status, statusText: err.statusText }),
    };
  }

  if (err.status >= 500) {
    return {
      type: 'http',
      message: t('more500', { status: err.status, statusText: err.statusText }),
    };
  }

  return {
    type: 'http',
    message: t('somethingWrong'),
  };
}
