import { genStyles } from '../../styles/genStyles';
import { ADDITION_COLOR } from '../../theme/theme';

export const STYLES = genStyles({
  googleButton: {
    backgroundColor: ADDITION_COLOR.light,
    color: ADDITION_COLOR.fontGoogle,
    border: '1px solid #ddd',
    borderRadius: '0.3rem',
    textTransform: 'none',
    fontSize: '0.8rem',
    padding: '0.6rem 0.9rem',
    marginTop: '0.7rem',
    cursor: 'pointer',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    transition: '0.3s all ease',
    '&:hover': {
      backgroundColor: ADDITION_COLOR.backgroundGoogle,
      border: `1px solid ${ADDITION_COLOR.fontGoogle}`,
    },
    '&:active': {
      backgroundColor: ADDITION_COLOR.successLight,
      border: '1px solid #296CEB',
    },
  },
  googleIcon: {
    width: '25px',
    height: '25px',
  },
});
