// @flow
import React from 'react';
import {handleKeyDown} from '../../../helpers/keyboard-events/keyboard-events';

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
  const ref = React.createRef();

  const onBlur = value => {
    return onSave(value);
  };

  const onKeyDown = event => {
    const {newValue, selectionPosition, isHandled} = handleKeyDown(
      event,
      keyListeners,
      onChange,
      onSave
    );
    const element = ref.current;

    onChange(newValue);

    if (isHandled) {
      window.setTimeout(() => {
        element.setSelectionRange(selectionPosition, selectionPosition);
      }, 1);
      event.preventDefault();
    }
  };

  return (
    <TagName
      name={name}
      onBlur={e => onBlur(e.target.value)}
      onChange={e => onChange(e.target.value)}
      onKeyDown={e => onKeyDown(e)}
      placeholder={placeholderText}
      ref={ref}
      value={value || ''}
    />
  );
};

export default Input;
