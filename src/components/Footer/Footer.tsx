'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';
import { Box, Container, Link, Typography } from '@mui/material';
import courseLogo from 'public/rss-logo.svg';
import { genStyles } from '@/styles/genStyles';
import theme, { ADDITION_COLOR } from '../../theme/theme';

const STYLES = genStyles({
  wrapper: {
    height: ADDITION_COLOR.footerHeight,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: ADDITION_COLOR.backgroundFooter,
  },
  info: {
    padding: '0px 16px',
    color: '$background-default',
    maxWidth: '1200px',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 7,
    [theme.breakpoints.down('sm')]: { gap: 1 },
  },
  links: {
    display: 'flex',
    justifyContent: 'flex-start',
    gap: 5,
    flexGrow: 1,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      gap: 0,
      fontSize: '1rem',
    },
  },
  link: {
    lineHeight: 1.25,
    color: 'background.default',
    transition: '0.25s color ease',
    '&:hover': {
      color: 'secondary.main',
    },
  },
  year: {},
});

const Footer: React.FC = () => {
  const t = useTranslations();

  return (
    <Container
      component="footer"
      sx={STYLES.wrapper}
      disableGutters
      maxWidth={false}
    >
      <Box sx={STYLES.info}>
        <Box sx={STYLES.links}>
          <Link
            variant="body1"
            sx={STYLES.link}
            href="https://github.com/GSasha9"
          >
            GSasha
          </Link>

          <Link
            variant="body1"
            sx={STYLES.link}
            href="https://github.com/MaximDudaryonok"
          >
            MaximD
          </Link>

          <Link
            variant="body1"
            sx={STYLES.link}
            href="https://github.com/ksushasher"
          >
            KsushaSher
          </Link>
        </Box>
        <Typography sx={STYLES.year}>2025 {t('footer.year')}</Typography>
        <Link href="https://rs.school/">
          <Image src={courseLogo} width={42} height={42} alt="courseLogo" />
        </Link>
      </Box>
    </Container>
  );
};

export default Footer;
