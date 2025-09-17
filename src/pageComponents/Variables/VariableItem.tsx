import React, { useState } from 'react';
import s from './Variables.module.scss';

const VariableItem = () => {
  const [variableState, setVariableState] = useState('');
  const [valueState, setValueState] = useState('');

  const handleChangeVariable = (event: React.ChangeEvent<HTMLInputElement>) =>
    setVariableState(event.target.value);

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValueState(event.target.value);

  return (
    <div className={s['variable-item']}>
      <div className={s['key-value']}>
        <input
          className={s.input}
          value={variableState}
          onChange={handleChangeVariable}
          placeholder="variable"
        />
        :
        <input
          className={s.input}
          value={valueState}
          onChange={handleChangeValue}
          placeholder="value"
        />
      </div>
      <button className="default-btn">delete</button>
    </div>
  );
};

export default VariableItem;
