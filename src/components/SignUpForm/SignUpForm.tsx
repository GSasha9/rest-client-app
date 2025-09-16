'use client';

import { useTranslations } from 'next-intl';
import React, { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import HowToRegIcon from '@mui/icons-material/HowToReg';
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

import { signUpUser } from '@/lib/auth';
import ROUTES from '../../shared/types/types';
import {
  ISignUpFormData,
  validateSignUpSchema,
} from '@/validations/signUpValidation.shema';
import { STYLES } from './styles.signUpForm';
import { errorNotifyMessage } from '@/utils/notifyMessage';
import PasswordStrength from '@/components/PasswordStrength';
import { useRouter } from 'next/navigation';

const SignUpForm = () => {
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (passwordInputRef.current) {
      setPassword(passwordInputRef.current!.value);
    }
  }, [passwordInputRef.current?.value]);

  const onClickShowPassword = () => setShowPassword((show) => !show);
  const onMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const onClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const onMouseDownConfirmPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const t = useTranslations();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ISignUpFormData>({
    mode: 'all',
    resolver: yupResolver(validateSignUpSchema(t)),
  });

  const onSubmit: SubmitHandler<ISignUpFormData> = async (data) => {
    try {
      const authResalt = await signUpUser(
        data.name,
        data.email,
        data.password,
        t
      );

      if (authResalt?.success) router.push(ROUTES.MAIN_PAGE);

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
        <Avatar sx={STYLES.logo} variant="rounded">
          <HowToRegIcon />
        </Avatar>
        <Typography component="h2" variant="h5">
          {t('form.title.signUp')}
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormGroup>
            <FormControl fullWidth>
              <TextField
                label={t('form.name')}
                type="text"
                margin="normal"
                fullWidth
                id="name"
                error={!!errors?.name}
                variant="outlined"
                sx={STYLES.nameInput}
                {...register('name')}
                autoComplete="name"
                size="small"
              />
              {errors?.name && (
                <Typography
                  component="h2"
                  variant="body2"
                  sx={{ ...STYLES.errorForm, ...STYLES.errorName }}
                >
                  {errors.name.message}
                </Typography>
              )}
            </FormControl>
            <FormControl fullWidth>
              <TextField
                label={t('form.email')}
                type="email"
                margin="normal"
                fullWidth
                id="emailSignUp"
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
              sx={STYLES.passInput}
              variant="outlined"
              size="small"
              error={!!errors?.password}
            >
              <InputLabel htmlFor="passwordSignUp">
                {t('form.password')}
              </InputLabel>
              <OutlinedInput
                id="passwordSignUp"
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                autoComplete="current-password"
                inputRef={passwordInputRef}
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
              {errors?.password && (
                <Typography
                  component="h2"
                  variant="body2"
                  sx={{ ...STYLES.errorForm, ...STYLES.errorPass }}
                >
                  {errors.password.message}
                </Typography>
              )}
            </FormControl>

            <PasswordStrength password={password} />

            <FormControl
              sx={STYLES.confirmPassInput}
              variant="outlined"
              size="small"
              error={!!errors?.confirmPassword}
            >
              <InputLabel htmlFor="confirmPassword">
                {t('form.confirmPassword')}
              </InputLabel>
              <OutlinedInput
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                {...register('confirmPassword')}
                autoComplete="current-password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirmPassword visibility"
                      onClick={onClickShowConfirmPassword}
                      onMouseDown={onMouseDownConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label={t('form.confirmPassword')}
              />
              {errors?.confirmPassword && (
                <Typography
                  component="h2"
                  variant="body2"
                  sx={{ ...STYLES.errorForm, ...STYLES.errorConfirmPass }}
                >
                  {errors.confirmPassword.message}
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
              {t('form.button.signUp')}
            </Button>
          </FormGroup>
          <Grid container>
            <Grid item xs={12} sx={STYLES.link}>
              <Link
                href={ROUTES.SIGN_IN}
                variant="subtitle2"
                underline="hover"
                color="info.main"
              >
                {t('form.subtitle.signUp')}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUpForm;
