'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const VariablesPage = dynamic(() => import('./VariablesPage'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function VariablesPageWrapper() {
  return <VariablesPage />;
}
