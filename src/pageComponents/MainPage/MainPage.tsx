'use client';

import { useTranslations } from 'next-intl';
import s from './MainPage.module.scss';
import { auth } from '@/lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const MainPage = () => {
  const t = useTranslations();
  const [user] = useAuthState(auth);

  console.log(user);

  return (
    <>
      {user ? (
        <>
          <h1 className={s['main__title']}>
            {t('main.welcomeUser')}
            {user.displayName}
          </h1>
          <div className={s['main__content']}></div>
        </>
      ) : (
        <>
          <h1 className={s['main__title']}>{t('main.welcome')}</h1>
          <div className={s['main__content']}></div>
        </>
      )}
    </>
  );
};

export default MainPage;
