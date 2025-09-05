'use client';

import RequestEditor from '@/components/request-editor.tsx/request-editor';
import { REQUEST_METHODS } from '@/shared/constants/request-methods';
import { SelectChangeEvent } from '@mui/material';

import { useState } from 'react';

const HomePage = () => {
  const [method, setMethod] = useState(REQUEST_METHODS.get);

  console.log(method);

  const handleSelect = (e: SelectChangeEvent) => {
    setMethod(e.target.value);
  };

  return <RequestEditor selectMethod={method} handleSelect={handleSelect} />;
};

export default HomePage;
