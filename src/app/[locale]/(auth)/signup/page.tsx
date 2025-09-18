'use client';

import React from 'react';
import SignUpForm from '@/components/SignUpForm';
import ProtectedAuthRoute from '@/components/ProtectedAuthRoute';

const SignUpPage = () => {
  return (
    <ProtectedAuthRoute>
      <SignUpForm />
    </ProtectedAuthRoute>
  );
};

export default SignUpPage;
