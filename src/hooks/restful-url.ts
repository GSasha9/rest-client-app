'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { RestData } from '../models/rest-client';

export const useRestfulUrl = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const data = useMemo(
    () => JSON.parse(atob(searchParams.get('data') || '') || '""') as RestData,
    [searchParams]
  );

  const setSearchParams = (newData: Partial<RestData>) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('data', btoa(JSON.stringify({ ...data, ...newData })));
    const query = params.toString();

    router.push(pathname + (query ? '?' + query : ''));
  };

  return [data, setSearchParams] as const;
};
