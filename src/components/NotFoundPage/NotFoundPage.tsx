'use client';

import { useTranslations } from 'next-intl';
import { Box, Button, Typography } from '@mui/material';
import { genStyles } from '@/styles/genStyles';
import { ADDITION_COLOR } from '@/theme/theme';

const STYLES = genStyles({
  wrapper: {
    backgroundColor: ADDITION_COLOR.backgroundMain,
    display: 'flex',
    justifyContent: 'center',
    flexGrow: 1,
    p: { xl: 3, lg: 3, md: 3, sm: 5, xs: 5 },
  },
  content: {
    display: 'flex',
    gap: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: { xl: '1.25rem', xs: '1rem' },
  },
  error: {
    border: { xl: 14, lg: 14, md: 13, sm: 12, xs: 11 },
    px: '18px',
    fontSize: { xl: '14rem', lg: '14rem', md: '12rem', sm: '9rem', xs: '7rem' },
    fontWeight: '400',
    color: 'text.secondary ',
  },
  textBottom: {
    textAlign: 'center',
    pb: '30px',
    fontSize: { xl: '1.25rem', xs: '1rem' },
  },
  button: {
    color: 'primary',
    ':hover': {
      color: 'white',
    },
  },
});

export default function NotFoundPage() {
  const t = useTranslations();

  return (
    <Box sx={STYLES.wrapper}>
      <Box sx={STYLES.content}>
        <Typography variant="h6" sx={STYLES.text}>
          {t('notfound.messageNotFound')}
        </Typography>

        <Typography variant="h1" sx={STYLES.error}>
          404
        </Typography>

        <Typography variant="h6" sx={STYLES.textBottom}>
          {t('notfound.message')}
        </Typography>

        <Button size="medium" variant="contained" sx={STYLES.button} href="/">
          {t('notfound.link')}
        </Button>
      </Box>
    </Box>
  );
}
