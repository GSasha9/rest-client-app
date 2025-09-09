'use client';

import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import './body-editor.scss';
import { useEffect } from 'react';

interface BodyEditorProps {
  body: string;
  handleBody: (value: string) => void;
}

const BodyEditor = ({ body, handleBody }: BodyEditorProps) => {
  const [error, setError] = useState(false);
  const [localBody, setLocalBody] = useState(body);

  useEffect(() => {
    setLocalBody(body);
  }, [body]);

  const handlePrettify = () => {
    try {
      const parsed = JSON.parse(localBody);

      handleBody(JSON.stringify(parsed, null, 4));
      setError(false);
    } catch {
      setError(true);
    }
  };

  return (
    <div className="body">
      <h4 className="title-h4">Body</h4>
      <div className="body__content">
        <div className="body-editor">
          <TextField
            className="text-field"
            multiline={true}
            rows={5}
            value={localBody}
            label="Request Body"
            onChange={(e) => {
              const value = e.currentTarget.value;

              setLocalBody(value);
              handleBody(value);
            }}
            error={error}
            helperText={error ? 'Prettifying only for JSON' : ''}
          />
          <Button
            className="button"
            onClick={handlePrettify}
            disabled={error || !localBody}
          >
            Prettify
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BodyEditor;
