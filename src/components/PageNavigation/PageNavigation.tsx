import { Box, Button } from '@mui/material';
import Link from 'next/link';
import ROUTES from '@/shared/types/types';
import { useTranslations } from 'next-intl';
import s from './PageNavigation.module.scss';

const PageNavigation = () => {
  const t = useTranslations();

  return (
    <Box className={s['page-navigation']}>
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
  );
};

export default PageNavigation;
