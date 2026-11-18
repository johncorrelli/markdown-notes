import {useRef, type KeyboardEvent} from 'react';
import {handleKeyDown} from '../../../helpers/keyboard-events/keyboard-events';

type Props = {
  keyListeners: string[];
  name: string;
  onChange: (value: string) => void;
  onSave: (value: string) => void;
  placeholderText?: string;
  tagName?: 'input' | 'textarea';
  value: string | null | undefined;
};

type Field = HTMLInputElement | HTMLTextAreaElement;

const Input = ({
  keyListeners,
  name,
  onChange,
  onSave,
  placeholderText,
  tagName,
  value,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const onKeyDown = (event: KeyboardEvent<Field>) => {
    const {newValue, selectionPosition, isHandled} = handleKeyDown(
      {
        target: event.currentTarget,
        ctrlKey: event.ctrlKey,
        keyCode: event.keyCode,
        metaKey: event.metaKey,
        shiftKey: event.shiftKey,
      },
      keyListeners
    );
    const element = inputRef.current ?? textareaRef.current;

    onChange(newValue);

    if (isHandled) {
      window.setTimeout(() => {
        element?.setSelectionRange(selectionPosition, selectionPosition);
      }, 1);
      event.preventDefault();
    }
  };

  const fieldProps = {
    name,
    onBlur: (e: {target: Field}) => onSave(e.target.value),
    onChange: (e: {target: Field}) => onChange(e.target.value),
    onKeyDown,
    placeholder: placeholderText,
    value: value || '',
  };

  return tagName === 'textarea' ? (
    <textarea ref={textareaRef} {...fieldProps} />
  ) : (
    <input ref={inputRef} {...fieldProps} />
  );
};

export default Input;
