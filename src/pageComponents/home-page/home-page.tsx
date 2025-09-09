'use client';

import './home-page.scss';
import RequestDetails from '@/components/request-details/request-details';
import RequestEditor from '@/components/request-editor/request-editor';
import { REQUEST_METHODS } from '@/shared/constants/request-methods';
import { SelectChangeEvent } from '@mui/material';

import { useState } from 'react';

const HomePage = () => {
  const [method, setMethod] = useState(REQUEST_METHODS.get);

  console.log(method);

  const handleSelect = (e: SelectChangeEvent) => {
    setMethod(e.target.value);
  };

  return (
    <div className="editor">
      <RequestEditor selectMethod={method} handleSelect={handleSelect} />
      <RequestDetails />
    </div>
  );
};

export default HomePage;
