'use client';

import { toast } from 'react-toastify';
import { ErrorState } from '../../utils/explain-error';
import { RequestResult } from '../../utils/perform-request';
import s from './ResponseSection.module.scss';
import React from 'react';

interface ResponseSectionProps {
  response?: RequestResult;
  errorDetails?: ErrorState;
}
const ResponseSection = ({ response, errorDetails }: ResponseSectionProps) => {
  const hasErrorHttp = errorDetails?.type === 'http';
  const hasErrorNetwork = errorDetails?.type === 'network';

  if (hasErrorNetwork)
    toast.error(errorDetails.message, { toastId: 'network-error' });

  if (!response?.body || hasErrorNetwork)
    return <div className="wrapper">Response:</div>;

  return (
    <div className="wrapper">
      <div>Status: {response?.status}</div>
      Response:
      <div className={s['table-wrapper']}>
        {hasErrorHttp && (
          <pre className={s['response-text']}>{errorDetails.message}</pre>
        )}
        {!errorDetails && (
          <pre className={s['response-text']}>{response?.body || ''}</pre>
        )}
      </div>
    </div>
  );
};

export default ResponseSection;
