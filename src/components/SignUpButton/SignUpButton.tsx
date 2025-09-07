import { useTranslations } from 'next-intl';
import React from 'react';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
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

const SignUpButton: React.FC = () => {
  const t = useTranslations();

  return (
    <Button
      variant="contained"
      href={ROUTES.SIGN_UP}
      color="secondary"
      size="medium"
      sx={STYLES.button}
      endIcon={<VpnKeyIcon />}
    >
      {t('header.signUp')}
    </Button>
  );
};

export default SignUpButton;
