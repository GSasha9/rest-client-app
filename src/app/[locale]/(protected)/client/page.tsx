import RestClientWrapper from '../../../../pageComponents/RestClient/RestClientWrapper';
import { tockenCheck } from '../../../../utils/token-check';

export default async function RestClientPage() {
  await tockenCheck();

  return <RestClientWrapper />;
}
