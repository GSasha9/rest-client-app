'use client';

import Box from '@mui/material/Box';
import { User } from 'firebase/auth';
import SignInButton from '../SignInButton';
import SignOutButton from '../SignOutButton';
import SignUpButton from '../SignUpButton';
import withUser from '../../utils/withUser';
import theme from '../../theme/theme';
import { JSX } from 'react';

const STYLES = {
  wrapper: {
    display: 'flex',
    gap: 3,
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItem: 'center',
    },
  },
};

export interface IProps {
  user?: User | null;
}

const Buttons: ({ user }: { user: IProps }) => JSX.Element = ({
  user,
}: {
  user: IProps;
}) => {
  if (user) return <SignOutButton />;

  return (
    <Box sx={STYLES.wrapper}>
      <SignInButton />
      <SignUpButton />
    </Box>
  );
};

export default withUser(Buttons, false);
