import { useState } from 'react';
import s from './HeadersEditor.module.scss';
import { HeaderItem } from '../../models/rest-client';

interface HeaderElementProps {
  index: number;
  headers: HeaderItem[];
  data: HeaderItem;
  setData: (data: HeaderItem[]) => void;
}

const HeaderElement = ({
  index,
  headers,
  data,
  setData,
}: HeaderElementProps) => {
  const [key, setKey] = useState(data.key);
  const [value, setValue] = useState(data.value);
  const [on, setOn] = useState(data.on);

  const handleSetHeader = (header: HeaderItem, index: number) => {
    const newHeaders = headers.map((item, idx) =>
      index === idx ? header : item
    );

    setData(newHeaders);
  };

  const handleChangeKey = (event: React.ChangeEvent<HTMLInputElement>) =>
    setKey(event.target.value);
  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value);
  const handleToggleOn = (event: React.ChangeEvent<HTMLInputElement>) =>
    setOn(event.target.checked);

  const handleBlur = () => handleSetHeader({ key, value, on }, index);

  const handleRemove = () => setData(headers.filter((_, idx) => index !== idx));

  return (
    <div>
      <input
        className={s['input']}
        placeholder="key"
        value={key}
        onChange={handleChangeKey}
        onBlur={handleBlur}
      />
      <input
        className={s['input']}
        placeholder="value"
        value={value}
        onChange={handleChangeValue}
        onBlur={handleBlur}
      />
      <input
        type="checkbox"
        name="header"
        checked={on}
        onBlur={handleBlur}
        onChange={handleToggleOn}
      />
      <button onClick={handleRemove}> - </button>
    </div>
  );
};

export default HeaderElement;
