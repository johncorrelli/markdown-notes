import type {ReactNode} from 'react';
import type {OnChangeCheckbox} from './types';
import './checkbox-styles.scss';

type Props = {
  checked: boolean;
  children: ReactNode;
  line: number;
  onChange: OnChangeCheckbox;
};

const Checkbox = ({checked, children, line, onChange}: Props) => {
  const toggleCheckbox = () => onChange(line, !checked);

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
