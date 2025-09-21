'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const RestClient = dynamic(() => import('./RestClient'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function RestClientWrapper() {
  return <RestClient />;
}
