import { useTranslations } from 'next-intl';
import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import { signOutUser } from '../../lib/auth';
import { genStyles } from '../../styles/genStyles';
import { ADDITION_COLOR } from '../../theme/theme';

const STYLES = genStyles({
  button: {
    color: ADDITION_COLOR.backgroundMain,
    '&:hover': {
      color: ADDITION_COLOR.light,
    },
  },
});

const SignOutButton: React.FC = () => {
  const t = useTranslations();

  const onClickSignOut = () => {
    signOutUser(t);
  };

  return (
    <Button
      size="medium"
      variant="contained"
      color="secondary"
      onClick={onClickSignOut}
      endIcon={<LogoutIcon />}
      sx={STYLES.button}
      data-testid="buttons"
    >
      {t('header.logout')}
    </Button>
  );
};

export default SignOutButton;
