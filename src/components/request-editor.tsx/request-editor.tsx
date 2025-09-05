import { Button, Input, MenuItem, Select } from '@mui/material';
import { REQUEST_METHODS } from '@/shared/constants/request-methods';
import { SelectChangeEvent } from 'node_modules/@mui/material';
import './request-editor.scss';

interface RequestEditorProps {
  selectMethod: string;
  handleSelect: (e: SelectChangeEvent) => void;
}

const RequestEditor = ({ selectMethod, handleSelect }: RequestEditorProps) => {
  return (
    <div className="request-editor">
      <div className="request-editor__item-select">
        <Select
          className="select-field"
          value={selectMethod}
          onChange={(e: SelectChangeEvent) => handleSelect(e)}
        >
          {Object.values(REQUEST_METHODS).map((method, index) => (
            <MenuItem
              key={method}
              value={method}
              selected={index === 0 ? true : false}
            >
              {method}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div className="request-editor__item-input">
        <Input className={'input-field'}></Input>
      </div>
      <div className="request-editor__item-button">
        <Button className={'item-button'} color="primary">
          Send
        </Button>
      </div>
    </div>
  );
};

export default RequestEditor;
