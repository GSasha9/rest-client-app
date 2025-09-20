'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { tockenCheck } from '@/utils/token-check';
import React from 'react';
// import Loader from '../../components/Loader';

const VariablesPage = dynamic(() => import('./VariablesPage'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function VariablesPageWrapper() {
  const [authorized, setAuthorized] = useState('');

  useEffect(() => {
    tockenCheck().then((valid) => setAuthorized(valid.uid));
  }, []);

  if (!authorized) return;

  return <VariablesPage />;
}
