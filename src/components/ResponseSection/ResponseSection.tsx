'use client';

import { RequestResult } from '../../utils/perform-request';
import s from './ResponseSection.module.scss';
import React from 'react';

interface ResponseSectionProps {
  response?: RequestResult;
}
const ResponseSection = ({ response }: ResponseSectionProps) => {
  return (
    <div className={s['wrapper']}>
      Response:
      <pre className={s['response-text']}>{response?.body || ''}</pre>
    </div>
  );
};

export default ResponseSection;
