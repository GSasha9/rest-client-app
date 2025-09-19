import { tockenCheck } from '@/utils/token-check';
import dynamic from 'next/dynamic';

const RestClient = dynamic(() => import('@/pageComponents/RestClient'));

export default async function RestClientPage() {
  await tockenCheck();

  return <RestClient />;
}
