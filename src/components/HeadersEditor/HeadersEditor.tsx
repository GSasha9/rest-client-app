'use client';

import { Button, Input } from '@mui/material';
import './HeadersEditor.scss';
import { useState } from 'react';

interface HeaderEditorProps {
  handleHeader: (obj: { key: string; value: string }) => void;
}

const HeadersEditor = ({ handleHeader }: HeaderEditorProps) => {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');

  const handleButton = () => {
    const header = { key: key, value: value };

    handleHeader(header);
  };

  return (
    <div className="headers">
      <h4 className="title-h4">Headers</h4>
      <div className="headers__content">
        <div className="headers-editor">
          <div className="headers-editor__inputs-wrapper">
            <Input
              className="input"
              placeholder="key"
              onChange={(e) => setKey(e.currentTarget.value)}
            />
            <Input
              className="input"
              placeholder="value"
              onChange={(e) => setValue(e.currentTarget.value)}
            />
          </div>
          <Button
            className="default-btn headers-editor__button"
            onClick={handleButton}
          >
            Add header
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeadersEditor;
