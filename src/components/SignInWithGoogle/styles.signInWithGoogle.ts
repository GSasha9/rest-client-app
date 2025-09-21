import { genStyles } from '../../styles/genStyles';
import { ADDITION_COLOR } from '../../theme/theme';

export const STYLES = genStyles({
  content: {
    marginTop: 1,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  googleFont: {
    mt: 1,
    color: ADDITION_COLOR.fontGoogle,
  },
});
