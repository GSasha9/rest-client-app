'use client';

import { RequestResult } from '../../utils/perform-request';
import s from './ResponseSection.module.scss';
import React from 'react';

interface ResponseSectionProps {
  response?: RequestResult;
}
const ResponseSection = ({ response }: ResponseSectionProps) => {
  if (!response?.body) return <div className={s['wrapper']}>Response:</div>;

  return (
    <div className="wrapper">
      <div>Status: {response?.status}</div>
      Response:
      <div className={s['table-wrapper']}>
        <pre className={s['response-text']}>{response?.body || ''}</pre>
      </div>
    </div>
  );
};

export default ResponseSection;
