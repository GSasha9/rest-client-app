'use client';

import { useTranslations } from 'next-intl';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormControl, InputLabel } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { signInUser } from '@/lib/auth';
import ROUTES from '../../shared/types/types';
import {
  ISignInFormData,
  validateSignInSchema,
} from '@/validations/signInValidation.schema';
import { STYLES } from './styles.signInForm';
import SignInWithGoogle from '../SignInWithGoogle';
import { errorNotifyMessage } from '@/utils/notifyMessage';
import { useRouter } from 'next/navigation';

const SignInForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const router = useRouter();
  const onClickShowPassword = () => setShowPassword((show) => !show);
  const onMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const t = useTranslations();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ISignInFormData>({
    mode: 'all',
    resolver: yupResolver(validateSignInSchema(t)),
  });

  const onSubmit: SubmitHandler<ISignInFormData> = async (data) => {
    try {
      const authRequest = await signInUser(data.email, data.password, t);

      if (authRequest?.success) router.push(ROUTES.MAIN_PAGE);

      reset();
    } catch (err) {
      if (err instanceof Error) {
        errorNotifyMessage(err.message);
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={STYLES.content}>
        <Avatar sx={STYLES.logo}>
          <LockOpenIcon />
        </Avatar>
        <Typography component="h2" variant="h5">
          {t('form.title.signIn')}
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormGroup>
            <FormControl fullWidth>
              <TextField
                label={t('form.email')}
                type="email"
                margin="normal"
                fullWidth
                id="email"
                error={!!errors?.email}
                variant="outlined"
                sx={STYLES.emailInput}
                {...register('email')}
                autoComplete="email"
                size="small"
              />
              {errors?.email && (
                <Typography
                  component="h2"
                  variant="body2"
                  sx={{ ...STYLES.errorForm, ...STYLES.errorMail }}
                >
                  {errors.email.message}
                </Typography>
              )}
            </FormControl>
            <FormControl
              variant="outlined"
              size="small"
              error={!!errors?.password}
            >
              <InputLabel htmlFor="password">{t('form.password')}</InputLabel>
              <OutlinedInput
                id="password"
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                autoComplete="current-password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={onClickShowPassword}
                      onMouseDown={onMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label={t('form.password')}
              />
              {!isValid && errors?.password && (
                <Typography
                  component="h2"
                  variant="body2"
                  sx={{ ...STYLES.errorForm, ...STYLES.errorPass }}
                >
                  {errors.password.message}
                </Typography>
              )}
            </FormControl>
            <Button
              sx={STYLES.button}
              type="submit"
              variant="contained"
              fullWidth
              disabled={!isValid}
              color="info"
            >
              {t('form.button.signIn')}
            </Button>
          </FormGroup>
          <Grid container>
            <Grid sx={STYLES.link}>
              <Link
                href={ROUTES.SIGN_UP}
                variant="subtitle2"
                underline="hover"
                color="info.main"
              >
                {t('form.subtitle.signIn')}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <SignInWithGoogle />
    </Container>
  );
};

export default SignInForm;
