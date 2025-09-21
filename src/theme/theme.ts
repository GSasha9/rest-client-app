'use client';

import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { themeVars } from '@/styles/variables';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const ADDITION_COLOR = {
  headerHeight: themeVars.headerHeight,
  footerHeight: themeVars.footerHeight,
  fontMessage: themeVars.fontMessage,

  backgroundMain: themeVars.backgroundMain,
  backgroundFooter: themeVars.backgroundFooter,
  textGoogle: themeVars.textGoogle,
  backgroundGoogle: themeVars.backgroundGoogle,
  shadowMain: themeVars.shadowMain,
  borderFooter: themeVars.borderFooter,
  textFoo: themeVars.textFooter,
  info: themeVars.infoMain,
  main: themeVars.primaryMain,
  mainLight: themeVars.primaryLight,
  secondary: themeVars.secondaryMain,
  light: themeVars.backgroundDefault,
  translucent: themeVars.translucent,
  fontGoogle: themeVars.textGoogle,
  successLight: themeVars.successLight,
};

const theme = createTheme({
  palette: {
    primary: {
      main: themeVars.primaryMain,
      light: themeVars.primaryLight,
      dark: themeVars.primaryDark,
      contrastText: themeVars.primaryContrastText,
    },
    secondary: {
      main: themeVars.secondaryMain,
      light: themeVars.secondaryLight,
      dark: themeVars.secondaryDark,
      contrastText: themeVars.secondaryContrastText,
    },
    error: {
      main: themeVars.errorMain,
    },
    warning: {
      main: themeVars.warningMain,
    },
    info: {
      main: themeVars.infoMain,
    },
    success: {
      main: themeVars.successMain,
      light: themeVars.successLight,
    },
    background: {
      default: themeVars.backgroundDefault,
      paper: themeVars.backgroundPaper,
    },
    text: {
      primary: themeVars.textPrimary,
      secondary: themeVars.textSecondary,
      disabled: themeVars.textDisabled,
    },
  },

  breakpoints: {
    values: {
      xs: 300,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  spacing: 4,

  typography: {
    fontFamily: roboto.style.fontFamily,
    h1: {
      fontSize: '4.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '4rem',
      fontWeight: 400,
    },
    h3: {
      fontSize: '2.1rem',
      fontWeight: 400,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 400,
    },
    h5: {
      fontSize: '1.3rem',
      fontWeight: 400,
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 300,
    },
    body1: {
      fontSize: '1.1rem',
      fontWeight: 300,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.43,
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
      textTransform: 'uppercase',
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 400,
        },
      },
    },
    MuiLink: {
      variants: [],
      styleOverrides: {
        root: {
          color: themeVars.primaryMain,
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
            color: themeVars.primaryLight,
          },
          '&.active': {
            color: themeVars.primaryLight,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          color: '#fff',
          backgroundColor: '#FF9C00',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            color: themeVars.textSecondary,
            '&.Mui-error': {
              color: themeVars.primaryLight,
            },
          },
          '& .MuiInputLabel-root': {
            color: themeVars.secondaryDark,
            '&.Mui-error': {
              color: themeVars.primaryLight,
            },
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: themeVars.secondaryDark,
            },
            '&:hover fieldset': {
              borderColor: themeVars.textPrimary,
            },
            '&.Mui-focused fieldset': {
              borderColor: themeVars.infoMain,
            },
            '&.Mui-error fieldset': {
              borderColor: themeVars.primaryLight,
            },
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          position: 'relative',
          '& .MuiInputBase-root': {
            color: themeVars.textSecondary,
            '&.Mui-error': {
              color: themeVars.primaryLight,
            },
          },
          '& .MuiInputLabel-root': {
            color: themeVars.secondaryDark,
            '&.Mui-error': {
              color: themeVars.primaryLight,
            },
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: themeVars.secondaryDark,
            },
            '&:hover fieldset': {
              borderColor: themeVars.textPrimary,
            },
            '&.Mui-focused fieldset': {
              borderColor: themeVars.infoMain,
            },
            '&.Mui-error fieldset': {
              borderColor: themeVars.primaryLight,
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow:
            '0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14), 0px 9px 46px 8px rgba(0,0,0,0.12)',
        },
      },
    },
  },
});

export default theme;
