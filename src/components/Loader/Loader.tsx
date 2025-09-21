import React from 'react';
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import { ADDITION_COLOR } from '../../theme/theme';

const Loader = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height={`calc(100vh - (${ADDITION_COLOR.headerHeight} + ${ADDITION_COLOR.footerHeight}))`}
    >
      <CircularProgress color="primary" />
    </Box>
  );
};

export default Loader;
