import { Button, Input } from '@mui/material';
import './headers-editor.scss';

const HeadersEditor = () => {
  return (
    <div className="headers-editor">
      <div className="headers-editor__inputs-wrapper">
        <Input className="input" placeholder="key" />
        <Input className="input" placeholder="value" />
      </div>
      <Button className="button headers-editor__button">Add header</Button>
    </div>
  );
};

export default HeadersEditor;
