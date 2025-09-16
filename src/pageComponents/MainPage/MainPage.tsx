'use client';

import { useTranslations } from 'next-intl';
import s from './MainPage.module.scss';
import { auth } from '@/lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import useUserName from '@/hooks/use-user-name';
import { Button, Box } from '@mui/material';
import Link from 'next/link';
import ROUTES from '@/shared/types/types';
import { useEffect, useState } from 'react';

const MainPage = () => {
  const t = useTranslations();
  const [user, loadingUser] = useAuthState(auth);
  const [isReady, setIsReady] = useState(false);
  const [name, setName] = useState<string | null>(null);
  const fetchedName = useUserName();

  console.log(fetchedName);

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
    return <div>Loading...</div>;
  }

  return (
    <>
      {user ? (
        <>
          <h1 className={s['main__title']}>
            {t('main.welcomeUser')}
            {` ${name}!`}
          </h1>
          <div className={s['main__content']}></div>
          <Box>
            <Button color="inherit" component={Link} href={ROUTES.RESTFUL}>
              {t('dashboard.restful')}
            </Button>
            <Button color="inherit" component={Link} href={ROUTES.HISTORY}>
              {t('dashboard.history')}
            </Button>
            <Button color="inherit" component={Link} href="/variables">
              {t('dashboard.variables')}
            </Button>
          </Box>
        </>
      ) : (
        <>
          <h1 className={s['main__title']}>{t('main.welcome')}</h1>
          <div className={s['main__content']}></div>
          <Box>
            <Button color="inherit" component={Link} href={ROUTES.SIGN_IN}>
              {t('header.login')}
            </Button>
            <Button color="inherit" component={Link} href={ROUTES.SIGN_UP}>
              {t('header.signUp')}
            </Button>
          </Box>
        </>
      )}
    </>
  );
};

export default MainPage;
