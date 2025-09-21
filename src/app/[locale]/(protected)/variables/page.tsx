import VariablesPage from '../../../../pageComponents/Variables';
import { tockenCheck } from '../../../../utils/token-check';

export default async function Page() {
  await tockenCheck();

  return <VariablesPage />;
}
