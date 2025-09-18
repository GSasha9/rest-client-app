'use client';

import React from 'react';
import SignInForm from '@/components/SigInForm';
import ProtectedAuthRoute from '@/components/ProtectedAuthRoute';

const SignInPage = () => {
  return (
    <ProtectedAuthRoute>
      <SignInForm />
    </ProtectedAuthRoute>
  );
};

export default SignInPage;
