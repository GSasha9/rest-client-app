import { SxProps } from '@mui/material';

export const genStyles = <T extends Record<string, SxProps>>(styles: T): T =>
  styles;
