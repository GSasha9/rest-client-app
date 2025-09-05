import { Button, Input } from '@mui/material';
import { REQUEST_METHODS } from '@/shared/constants/request-methods';
import { SelectChangeEvent } from 'node_modules/@mui/material';
import './request-editor.scss';
import SelectMethod from '../select-method/select-method';

interface RequestEditorProps {
  selectMethod: string;
  handleSelect: (e: SelectChangeEvent) => void;
}

const RequestEditor = ({ selectMethod, handleSelect }: RequestEditorProps) => {
  return (
    <div className="request-editor">
      <div className="request-editor__item-select">
        <SelectMethod
          method={selectMethod}
          handleSelect={handleSelect}
          options={REQUEST_METHODS}
        ></SelectMethod>
      </div>
      <div className="request-editor__item-input">
        <Input className={'input-field'} placeholder="Enter URL"></Input>
      </div>
      <div className="request-editor__item-button">
        <Button className={'button'}>Send</Button>
      </div>
    </div>
  );
};

export default RequestEditor;
