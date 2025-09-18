import dynamic from 'next/dynamic';

export const VariablesPage = dynamic(
  () => import('@/pageComponents/Variables')
);

export default async function Page() {
  return <VariablesPage />;
}
