'use client';

import React from 'react';
import ProtectedAuthRoute from '@/components/ProtectedAuthRoute';
import SignUpForm from '@/components/SignUpForm';

const SignUpPage = () => {
  return (
    <ProtectedAuthRoute>
      <SignUpForm />
    </ProtectedAuthRoute>
  );
};

export default SignUpPage;
