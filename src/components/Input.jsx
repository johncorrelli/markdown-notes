// @flow
import React from 'react';
import {handleKeyDown} from '../helpers/keyboard-events';

type Props = {
  keyListeners: Array,
  name: String,
  onChange: e => void,
  onSave: () => void,
  tagName: String,
  value: string,
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
