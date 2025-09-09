import { useTranslations } from 'next-intl';
import React from 'react';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Button from '@mui/material/Button';
import ROUTES from '../../shared/types/types';
import { genStyles } from '@/styles/genStyles';
import { ADDITION_COLOR } from '@/theme/theme';

const STYLES = genStyles({
  button: {
    color: ADDITION_COLOR.backgroundMain,
    '&:hover': {
      color: ADDITION_COLOR.light,
    },
  },
});

const SignInButton: React.FC = () => {
  const t = useTranslations();

  return (
    <Button
      size="medium"
      variant="contained"
      color="primary"
      sx={STYLES.button}
      endIcon={<ExitToAppIcon />}
      href={ROUTES.SIGN_IN}
    >
      {t('header.login')}
    </Button>
  );
};

export default SignInButton;
