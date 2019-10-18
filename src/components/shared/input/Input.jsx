// @flow
import React from 'react';
import {handleKeyDown} from '../../../helpers/keyboard-events';

type Props = {
  disabled?: boolean,
  keyListeners: Array<string>,
  name: string,
  onChange: (value: string) => void,
  onSave: (value: string) => void,
  placeholderText?: string,
  tagName?: string,
  value: ?string,
};

const Input = ({
  disabled,
  keyListeners,
  name,
  onChange,
  onSave,
  placeholderText,
  tagName,
  value,
}: Props) => {
  const TagName = tagName || 'input';

  if (disabled === true) {
    return <TagName disabled={true} value={value || ''} />;
  }

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
