// @flow
import React from 'react';
import {handleKeyDown} from '../../../helpers/keyboard-events';

type Props = {
  keyListeners: Array<string>,
  name: string,
  onChange: (value: string) => void,
  onSave: (value: string) => void,
  placeholderText?: string,
  tagName?: string,
  value: ?string,
};

const Input = ({
  keyListeners,
  name,
  onChange,
  onSave,
  placeholderText,
  tagName,
  value,
}: Props) => {
  const TagName = tagName || 'input';

  const onBlur = value => {
    return onSave(value);
  };

  return (
    <TagName
      name={name}
      onBlur={e => onBlur(e.target.value)}
      onChange={e => onChange(e.target.value)}
      onKeyDown={e => handleKeyDown(e, keyListeners, onChange, onSave)}
      placeholder={placeholderText}
      value={value || ''}
    />
  );
};

export default Input;
