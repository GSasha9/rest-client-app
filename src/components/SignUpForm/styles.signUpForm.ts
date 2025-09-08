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
    backgroundColor: ADDITION_COLOR.secondary,
  },
  nameInput: {
    mb: 5,
  },
  emailInput: {
    mt: 0,
    mb: 5,
  },
  passInput: {
    mt: 0,
    mb: '0.4rem',
  },
  confirmPassInput: {
    mt: '2rem',
  },
  button: {
    mt: 5,
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
  errorName: {
    bottom: 3,
  },
  errorMail: {
    bottom: 3,
  },
  errorPass: {
    top: '3.4rem',
  },
  errorConfirmPass: {
    top: '2.8rem',
  },
});
