'use client';

import s from './MethodEditor.module.scss';
import { MenuItem, Select } from '@mui/material';
import { REQUEST_METHODS } from '../../shared/constants/request-methods';
import { Methods } from '../../models/rest-client';

interface MethodEditorProps {
  method: Methods;
  setMethod: (method: Methods) => void;
}

const MethodEditor = ({ method, setMethod }: MethodEditorProps) => {
  return (
    <div className={s['wrapper']}>
      <Select
        className={s['select-field']}
        value={method}
        onChange={(event) => setMethod(event.target.value as Methods)}
        variant="standard"
      >
        {Object.values(REQUEST_METHODS).map((method) => (
          <MenuItem key={method} value={method}>
            {method}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default MethodEditor;
