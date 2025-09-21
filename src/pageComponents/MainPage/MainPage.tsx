'use client';

import { useTranslations } from 'next-intl';
import s from './MainPage.module.scss';
import { auth } from '@/lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import useUserName from '@/hooks/use-user-name';
import { Button, Box, Stack } from '@mui/material';
import Link from 'next/link';
import ROUTES from '@/shared/types/types';
import { useEffect, useState } from 'react';
import MainContent from './MainContent';
import PageNavigation from '@/components/PageNavigation/PageNavigation';

const MainPage = () => {
  const t = useTranslations();
  const [user, loadingUser] = useAuthState(auth);
  const [isReady, setIsReady] = useState(false);
  const [name, setName] = useState<string | null>(null);
  const fetchedName = useUserName();

  useEffect(() => {
    if (!loadingUser) {
      if (!user) {
        setIsReady(true);
      } else if (fetchedName !== undefined) {
        setName(fetchedName);
        setIsReady(true);
      }
    }
  }, [loadingUser, fetchedName, user]);

  if (!isReady) {
    return <div>{t('loader.message')}</div>;
  }

  return (
    <>
      {user ? (
        <Stack
          direction="column"
          gap={5}
          alignItems="center"
          justifyContent="center"
        >
          <h1 className={s['main__title']}>
            {t('main.welcomeUser')}
            {` ${name}!`}
          </h1>
          <PageNavigation />
          <div className={s['main__content']}>
            <MainContent />
          </div>
        </Stack>
      ) : (
        <Stack
          direction="column"
          gap={5}
          alignItems="center"
          justifyContent="center"
        >
          <h1 className={s['main__title']}>{t('main.welcome')}</h1>
          <div className={s['main__content']}>
            {' '}
            <MainContent />
          </div>
          <Box>
            <Button color="inherit" component={Link} href={ROUTES.SIGN_IN}>
              {t('header.login')}
            </Button>
            <Button color="inherit" component={Link} href={ROUTES.SIGN_UP}>
              {t('header.signUp')}
            </Button>
          </Box>
        </Stack>
      )}
    </>
  );
};

export default MainPage;
