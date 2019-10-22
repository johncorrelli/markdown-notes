//@flow
import React from 'react';
import type {OnChangeCheckbox, SourcePosition} from './types';
import './checkbox-styles.scss';

type Props = {
  checked: boolean,
  children: any,
  onChange: OnChangeCheckbox,
  sourcePosition: SourcePosition,
};

const Checkbox = ({checked, children, onChange, sourcePosition}: Props) => {
  const toggleCheckbox = () => onChange(sourcePosition.start.line, !checked);

  return (
    <li className="checkbox">
      <div
        className={`checkbox__toggle ${
          checked ? 'checkbox__toggle--checked' : ''
        }`}
        onClick={toggleCheckbox}
      />
      <div className="checkbox__label">{children}</div>
    </li>
  );
};

export default Checkbox;
