import s from './HeadersEditor.module.scss';
import { HeaderItem } from '../../models/rest-client';
import { useState } from 'react';

interface HeaderElementProps {
  index: number;
  headers: HeaderItem[];
  data: HeaderItem;
  setData: (data: HeaderItem[]) => void;
}

export const HeaderElement = ({
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
    <div className={s['header-item']}>
      <input
        className={s['input']}
        placeholder="key"
        value={key}
        onChange={handleChangeKey}
        onBlur={handleBlur}
        name="key"
      />
      <input
        className={s['input']}
        placeholder="value"
        value={value}
        onChange={handleChangeValue}
        onBlur={handleBlur}
        name="value"
      />
      <label style={{ whiteSpace: 'nowrap' }}>
        apply header:
        <input
          type="checkbox"
          name="header"
          checked={on}
          onBlur={handleBlur}
          onChange={(event) => {
            handleToggleOn(event);
          }}
        />
      </label>
      <button className="default-btn" onClick={handleRemove}>
        delete
      </button>
    </div>
  );
};
