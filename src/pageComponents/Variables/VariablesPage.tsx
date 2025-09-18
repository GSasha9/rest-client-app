'use client';

import { useVariables } from '../../hooks/variables';
import VariableItem from './VariableItem';
import s from './Variables.module.scss';

const VariablesPage = () => {
  const [variables, setVariables] = useVariables();
  const isDisabledAdd = variables.some(([key]) => key === '');

  const handleAddVariable = () => setVariables([...variables, ['', '']]);

  return (
    <div className={s.wrapper}>
      <h2>
        Variables{' '}
        <button
          className="default-btn"
          disabled={isDisabledAdd}
          onClick={handleAddVariable}
        >
          add
        </button>
      </h2>
      {variables.map(([key, value]) => (
        <VariableItem
          variables={variables}
          key={key}
          variable={key}
          value={value}
          setVariables={setVariables}
        />
      ))}
    </div>
  );
};

export default VariablesPage;
