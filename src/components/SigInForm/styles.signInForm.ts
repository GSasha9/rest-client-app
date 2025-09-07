import { genStyles } from '../../styles/genStyles';
import { ADDITION_COLOR } from '../../theme/theme';

export const STYLES = genStyles({
  content: {
    paddingTop: 15,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  logo: {
    m: 1,
    backgroundColor: ADDITION_COLOR.main,
  },
  emailInput: {
    mb: 5,
  },
  button: {
    mt: 8,
    mb: 1,
  },
  link: {
    textAlign: 'center',
  },
  errorForm: {
    position: 'absolute',
    left: 0,
    color: ADDITION_COLOR.mainLight,
    fontFamily: ADDITION_COLOR.fontMessage,
    fontSize: '0.6rem',
  },
  errorMail: {
    bottom: 3,
  },
  errorPass: {
    top: '2.8rem',
  },
});
