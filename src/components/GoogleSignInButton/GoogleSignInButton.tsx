import Image from 'next/image';
import React, { FC } from 'react';
import Button from '@mui/material/Button';
import googleLogo from '../../../public/google-color-icon.svg';
import { STYLES } from './styles.googleSignInButton';

interface IGoogleSignInButtonProps {
  title: string;
}

const GoogleSignInButton: FC<IGoogleSignInButtonProps> = ({ title }) => {
  return (
    <Button sx={STYLES.googleButton}>
      <Image
        src={googleLogo}
        width={25}
        height={25}
        alt="Google sign in button"
        style={STYLES.googleIcon}
      />
      {title}
    </Button>
  );
};

export default GoogleSignInButton;
