'use client';

import { useTranslations } from 'next-intl';
import { useVariables } from '../../hooks/variables';
import VariableItem from './VariableItem';
import s from './Variables.module.scss';

const VariablesPage = () => {
  const t = useTranslations('restClient.variables');
  const [variables, setVariables] = useVariables();
  const isDisabledAdd = variables.some(([key]) => key === '');

  const handleAddVariable = () => setVariables([...variables, ['', '']]);

  return (
    <div className={s.wrapper}>
      <h2>
        {t('variables')}{' '}
        <button
          className="default-btn"
          disabled={isDisabledAdd}
          onClick={handleAddVariable}
        >
          {t('add')}
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
