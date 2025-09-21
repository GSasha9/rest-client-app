'use client';

import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Stack,
} from '@mui/material';
import { useTranslations } from 'next-intl';

const Developers = () => {
  const t = useTranslations();

  const developersInfo = [
    {
      name: t('ksusha'),
      role: 'Front-end developer',
      contribution: 'REST Client, Variables',
      img: '/ava3.png',
    },
    {
      name: t('sasha'),
      role: 'Front-end developer',
      contribution: 'History and Analytics, Main Page',
      img: '/sasha.png',
    },
    {
      name: t('maxim'),
      role: 'Front-end developer',
      contribution: 'Authorization, Header, Footer',
      img: '/maxim.png',
    },
  ];

  return (
    <Stack direction="row" alignItems="center" gap={4}>
      {developersInfo.map((el) => {
        return (
          <Card sx={{ maxWidth: 300 }} key={el.name}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="240"
                image={el.img}
                alt={el.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {el.name}
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  {el.role}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {el.contribution}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        );
      })}
    </Stack>
  );
};

export default Developers;
