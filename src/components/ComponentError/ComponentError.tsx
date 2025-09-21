'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Box, Button, Typography } from '@mui/material';
import errorPic from 'public/wrench.svg';
import { genStyles } from '@/styles/genStyles';
import { ADDITION_COLOR } from '@/theme/theme';
import { JSX } from 'react';

const STYLES = genStyles({
  wrapper: {
    backgroundColor: ADDITION_COLOR.backgroundMain,
    display: 'flex',
    justifyContent: 'center',
    flexGrow: 1,
  },
  content: {
    display: 'flex',
    gap: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    p: { xl: 3, lg: 3, md: 3, sm: 5, xs: 5 },
  },
  text: {},
  errorImg: { width: { md: 200, sm: 180, xs: 130 } },
  textBottom: {
    pb: { xl: 7, lg: 7, md: 7, sm: 5, xs: 0 },
    textAlign: 'center',
  },
  button: {
    color: 'primary',
    ':hover': {
      color: 'white',
    },
  },
});

function ComponentError({ error }: { error?: Error }): JSX.Element {
  const t = useTranslations();

  return (
    <Box sx={STYLES.wrapper}>
      <Box sx={STYLES.content}>
        <Typography variant="h3" sx={STYLES.text}>
          {t('error.message')}
        </Typography>
        <Box sx={STYLES.errorImg}>
          <Image
            src={errorPic}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }}
            alt="error"
            priority
          ></Image>
        </Box>
        <Typography variant="h6" sx={STYLES.textBottom}>
          {error?.message ? error.message : t('error.description')}
        </Typography>
        <Button size="medium" variant="contained" sx={STYLES.button} href="/">
          {t('notfound.link')}
        </Button>
      </Box>
    </Box>
  );
}
export default ComponentError;
