'use client';

import VariableItem from './VariableItem';
import s from './Variables.module.scss';

const VariablesPage = () => {
  return (
    <div className={s.wrapper}>
      <h2>
        Variables <button className="default-btn">add</button>
      </h2>
      <VariableItem />
    </div>
  );
};

export default VariablesPage;
