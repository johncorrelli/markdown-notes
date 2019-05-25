// @flow
import React from 'react';
import {handleKeyDown} from '../helpers/keyboard-events';

type Props = {
  keyListeners: Array<string>,
  name: string,
  onChange: (value: string) => void,
  onSave: () => void,
  tagName?: string,
  value: ?string,
};

const Input = ({
  keyListeners,
  name,
  onChange,
  onSave,
  tagName,
  value,
}: Props) => {
  const TagName = tagName || 'input';

  return (
    <TagName
      name={name}
      onBlur={onSave}
      onChange={e => onChange(e.target.value)}
      onKeyDown={e => handleKeyDown(e, keyListeners, onChange, onSave)}
      value={value || ''}
    />
  );
};

export default Input;
