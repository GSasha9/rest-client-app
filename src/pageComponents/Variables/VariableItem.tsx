import React, { useState } from 'react';
import s from './Variables.module.scss';

interface VariableItemProps {
  variables: [string, string][];
  variable: string;
  value: string;
  setVariables: (newVars: [string, string][]) => void;
}

const VariableItem = ({
  variables,
  variable,
  value,
  setVariables,
}: VariableItemProps) => {
  const [variableState, setVariableState] = useState(variable);
  const [valueState, setValueState] = useState(value);

  const handleChangeVariable = (event: React.ChangeEvent<HTMLInputElement>) =>
    setVariableState(event.target.value);

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValueState(event.target.value);

  const handleRemove = () =>
    setVariables(variables.filter(([key]) => key !== variable));

  const handleBlur = () => {
    const newItem: [string, string] = [variableState, valueState];
    const newVars = variables.map<[string, string]>(([key, value]) =>
      key === variable ? newItem : [key, value]
    );

    setVariables(newVars);
  };

  return (
    <div className={s['variable-item']}>
      <div className={s['key-value']}>
        <input
          className={s.input}
          value={variableState}
          onChange={handleChangeVariable}
          placeholder="variable"
          onBlur={handleBlur}
        />
        :
        <input
          className={s.input}
          value={valueState}
          onChange={handleChangeValue}
          placeholder="value"
          onBlur={handleBlur}
        />
      </div>
      <button className="default-btn" onClick={handleRemove}>
        delete
      </button>
    </div>
  );
};

export default VariableItem;
