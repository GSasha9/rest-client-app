// import dynamic from 'next/dynamic';
// import { tockenCheck } from '@/utils/token-check';
import VariablesPage from '../../../../pageComponents/Variables';

// export const VariablesPage = dynamic(
//   () =>
//     import('@/pageComponents/Variables', {
//       ssr: false,
//     })
// );

export default async function Page() {
  // await tockenCheck();

  return <VariablesPage />;
}
