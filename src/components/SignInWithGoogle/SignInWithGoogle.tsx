import { useTranslations } from 'next-intl';
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { signInWithGoogle } from '@/lib/auth';
import { errorNotifyMessage } from '@/utils/notifyMessage';
import { STYLES } from './styles.signInWithGoogle';
import GoogleSignInButton from '../GoogleSignInButton/GoogleSignInButton';

const SignInWithGoogle: React.FC = () => {
  const t = useTranslations();

  const signInGoogle = async () => {
    try {
      await signInWithGoogle(t);
    } catch (err) {
      if (err instanceof Error) {
        errorNotifyMessage(err.message);
      }
    }
  };

  return (
    <Box sx={STYLES.content}>
      <Typography
        sx={STYLES.googleFont}
        component="h2"
        variant="body2"
        data-testid="google-title"
      >
        {t('form.subtitle.google')}
      </Typography>
      <Box
        style={{ display: 'flex', justifyContent: 'center' }}
        onClick={signInGoogle}
        data-testid="button-wrapper"
      >
        <GoogleSignInButton title={t('form.button.google')} />
      </Box>
    </Box>
  );
};

export default SignInWithGoogle;
