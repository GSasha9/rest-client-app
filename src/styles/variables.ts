export const themeVars = {
  spacer: '1rem',
  paddingBase: '1.5rem',

  headerHeight: '70px',
  footerHeight: '70px',

  backgroundMain: '#f0f4ff',
  backgroundFooter: '#232946',
  shadowMain: '#b8c1ec',
  borderFooter: '#eebbc3',
  textFooter: '#fffffe',

  primaryMain: '#ff6a3d',
  primaryLight: '#ffb86b',
  primaryDark: '#d7263d',
  primaryContrastText: '#232946',

  secondaryMain: '#3f72af',
  secondaryLight: '#dbe2ef',
  secondaryDark: '#112d4e',
  secondaryContrastText: '#fffffe',

  translucent: 'rgba(63, 114, 175, 0.3)',

  textGoogle: '#1a1a2e',
  backgroundGoogle: '#f9f7f7',

  errorMain: '#d7263d',
  warningMain: '#ffd166',
  infoMain: '#118ab2',

  successMain: 'rgba(42, 157, 143, 0.57)',
  successLight: '#caffbf',

  backgroundDefault: '#ffffff',
  backgroundPaper: '#f1faee',

  textPrimary: '#232946',
  textSecondary: '#393e46',
  textDisabled: '#bdbdbd',

  fontMessage: "'Arial', serif",
} as const;

export type ThemeVars = typeof themeVars;
