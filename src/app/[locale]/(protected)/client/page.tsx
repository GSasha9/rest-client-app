import dynamic from 'next/dynamic';

const RestClient = dynamic(() => import('@/pageComponents/RestClient'));

export default function RestClientPage() {
  return <RestClient />;
}
