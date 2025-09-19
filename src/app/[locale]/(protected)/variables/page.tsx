import dynamic from 'next/dynamic';
import { tockenCheck } from '@/utils/token-check';

export const VariablesPage = dynamic(
  () => import('@/pageComponents/Variables')
);

export default async function Page() {
  await tockenCheck();

  return <VariablesPage />;
}
