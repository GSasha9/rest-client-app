import { Methods } from '../rest-client';

export const isMethod = (value: string): value is Methods =>
  value === 'GET' ||
  value === 'PATCH' ||
  value === 'POST' ||
  value === 'PUT' ||
  value === 'DELETE';
