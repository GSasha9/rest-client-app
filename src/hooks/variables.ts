import { useCallback, useState } from 'react';
import { isVariables } from '../models/typeguard/variables';
import { UNIQ_KEY } from '../shared/constants/variables';
import { getAuth } from 'firebase/auth';

const initState = () => {
  const USER_ID = getAuth().currentUser?.uid;
  const variablesLS = localStorage.getItem(`${UNIQ_KEY}_${USER_ID}_vars`);

  try {
    const obj = variablesLS ? JSON.parse(variablesLS) : {};

    return isVariables(obj) ? Object.entries(obj) : [];
  } catch (error: unknown) {
    console.warn('JSON parsing error:', error);

    return [];
  }
};

export const useVariables = () => {
  const USER_ID = getAuth().currentUser?.uid;
  const [variables, setVars] = useState(initState);

  const setVariables = useCallback(
    (newVars: [string, string][]) => {
      setVars(newVars);
      localStorage.setItem(
        `${UNIQ_KEY}_${USER_ID}_vars`,
        JSON.stringify(Object.fromEntries(newVars))
      );
    },
    [USER_ID]
  );

  return [variables, setVariables] as const;
};
