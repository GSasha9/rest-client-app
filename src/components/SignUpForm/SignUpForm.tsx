'use client';

import { useTranslations } from 'next-intl';
import React, { useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  FormControl,
  InputLabel,
  Avatar,
  Box,
  Button,
  Container,
  FormGroup,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';

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
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
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
      const authResult = await signUpUser(
        data.name,
        data.email,
        data.password,
        t
      );

      if (authResult?.success) router.push(ROUTES.MAIN_PAGE);

      reset();
    } catch (err) {
      if (err instanceof Error) errorNotifyMessage(err.message);
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
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
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
                    data-testid="sign-up-name"
                  />
                  {errors?.name && (
                    <Typography
                      variant="body2"
                      sx={{ ...STYLES.errorForm, ...STYLES.errorName }}
                    >
                      {errors.name.message}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12 }}>
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
                    data-testid="sign-up-email"
                  />
                  {errors?.email && (
                    <Typography
                      variant="body2"
                      sx={{ ...STYLES.errorForm, ...STYLES.errorMail }}
                    >
                      {errors.email.message}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12 }}>
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
                    onChange={(e) => setPassword(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword((s) => !s)}
                          onMouseDown={(e) => e.preventDefault()}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label={t('form.password')}
                    data-testid="sign-up-password"
                  />
                  {errors?.password && (
                    <Typography
                      variant="body2"
                      sx={{ ...STYLES.errorForm, ...STYLES.errorPass }}
                    >
                      {errors.password.message}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <PasswordStrength password={password} />
              </Grid>

              <Grid size={{ xs: 12 }}>
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
                    data-testid="sign-up-confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    {...register('confirmPassword')}
                    autoComplete="current-password"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle confirmPassword visibility"
                          onClick={() => setShowConfirmPassword((s) => !s)}
                          onMouseDown={(e) => e.preventDefault()}
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label={t('form.confirmPassword')}
                  />
                  {errors?.confirmPassword && (
                    <Typography
                      variant="body2"
                      sx={{
                        ...STYLES.errorForm,
                        ...STYLES.errorConfirmPass,
                      }}
                    >
                      {errors.confirmPassword.message}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Button
                  sx={STYLES.button}
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={!isValid}
                  color="info"
                  data-testid="sign-up-button"
                >
                  {t('form.button.signUp')}
                </Button>
              </Grid>

              <Grid size={{ xs: 12 }} sx={STYLES.link}>
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
          </FormGroup>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUpForm;
