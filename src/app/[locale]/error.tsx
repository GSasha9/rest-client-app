'use client';

import ComponentError from '../../components/ComponentError';

export default function ErrorError({ error }: { error: Error }) {
  return <ComponentError error={error} />;
}
