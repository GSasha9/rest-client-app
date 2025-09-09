import { Input } from '@mui/material';
import { REQUEST_METHODS } from '@/shared/constants/request-methods';
import { SelectChangeEvent } from 'node_modules/@mui/material';
import './request-editor.scss';
import SelectMethod from '../select-method/select-method';
import { ChangeEvent } from 'react';

interface RequestEditorProps {
  method: string;
  handleSelect: (e: SelectChangeEvent) => void;
  handleUrl: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const RequestEditor = ({
  method,
  handleSelect,
  handleUrl,
}: RequestEditorProps) => {
  return (
    <>
      {' '}
      <div className="request-editor__item-select">
        <SelectMethod
          method={method}
          handleSelect={handleSelect}
          options={REQUEST_METHODS}
        ></SelectMethod>
      </div>
      <div className="request-editor__item-input">
        <Input
          className={'input-field'}
          placeholder="Enter URL"
          onChange={handleUrl}
        ></Input>
      </div>
    </>
  );
};

export default RequestEditor;
