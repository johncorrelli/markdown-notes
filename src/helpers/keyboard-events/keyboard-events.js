import {KEY_B, KEY_I, KEY_S, KEY_TAB, KEY_ENTER, KEY_RETURN} from 'keycode-js';

const TAB = '    ';

export const handleKeyDown = (
  keyboardEvent,
  keyListeners,
  onChange,
  onSave
) => {
  const {target} = keyboardEvent;
  const {value, selectionStart, selectionEnd} = target;

  const onSaveValue = value => {
    onSave(value);
  };

  const updateElementValue = (newValue, selectionPosition) => {
    updateElementState(target, newValue, selectionPosition, onChange);
    keyboardEvent.preventDefault();
  };

  // Cmd+B or Ctrl+B
  if (
    isKeyComboTracked('meta+b', keyListeners) &&
    isKeyComboPressed('meta+b', keyboardEvent)
  ) {
    const {newValue, selectionPosition} = wrapSelectedText(
      target,
      value,
      selectionStart,
      selectionEnd,
      '**'
    );

    updateElementValue(newValue, selectionPosition);
    return;
  }

  // Cmd+I or Ctrl+I
  if (
    isKeyComboTracked('meta+i', keyListeners) &&
    isKeyComboPressed('meta+i', keyboardEvent)
  ) {
    const {newValue, selectionPosition} = wrapSelectedText(
      target,
      value,
      selectionStart,
      selectionEnd,
      '*'
    );

    updateElementValue(newValue, selectionPosition);
    return;
  }

  // Cmd+S or Ctrl+S
  if (
    isKeyComboTracked('meta+s', keyListeners) &&
    isKeyComboPressed('meta+s', keyboardEvent)
  ) {
    onSaveValue(value);
    keyboardEvent.preventDefault();
    return;
  }

  // Enter
  if (
    isKeyComboTracked('enter', keyListeners) &&
    isKeyComboPressed('enter', keyboardEvent)
  ) {
    onSaveValue(value);
    return;
  }

  // Shift+Tab
  if (
    isKeyComboTracked('shift+tab', keyListeners) &&
    isKeyComboPressed('shift+tab', keyboardEvent)
  ) {
    try {
      const {newValue, selectionPosition} = removeText(
        value,
        selectionEnd,
        TAB
      );

      updateElementValue(newValue, selectionPosition);
    } catch (e) {}

    keyboardEvent.preventDefault();
    return;
  }

  // Tab
  if (
    isKeyComboTracked('tab', keyListeners) &&
    isKeyComboPressed('tab', keyboardEvent)
  ) {
    const {newValue, selectionPosition} = insertText(value, selectionEnd, TAB);

    updateElementValue(newValue, selectionPosition);
    return;
  }
};

const isKeyComboPressed = (keyCombo, keyboardEvent) => {
  const {
    ctrlKey: isCtrlKeyPressed,
    keyCode,
    metaKey: isMetaKeyPressed,
    shiftKey: isShiftKeyPressed,
  } = keyboardEvent;

  const isCtrlOrMetaKey = isCtrlKeyPressed || isMetaKeyPressed;

  switch (keyCombo) {
    case 'enter':
      return keyCode === KEY_ENTER || keyCode === KEY_RETURN;
    case 'meta+b':
      return isCtrlOrMetaKey && keyCode === KEY_B;
    case 'meta+i':
      return isCtrlOrMetaKey && keyCode === KEY_I;
    case 'meta+s':
      return isCtrlOrMetaKey && keyCode === KEY_S;
    case 'shift+tab':
      return isShiftKeyPressed && keyCode === KEY_TAB;
    case 'tab':
      return keyCode === KEY_TAB;
    default:
      return false;
  }
};

const isKeyComboTracked = (combo, keyListeners) => {
  return keyListeners.indexOf(combo) > -1;
};

const insertText = (value, position, textToInsert) => {
  const selectionPosition = position + textToInsert.length;

  return {
    newValue: `${value.substring(0, position)}${textToInsert}${value.substring(
      position
    )}`,
    selectionPosition,
  };
};

const removeText = (value, position, textToRemove) => {
  const beforePosition = value.substring(0, position);
  const textToRemoveLength = textToRemove.length;

  if (
    beforePosition.substring(beforePosition.length - textToRemoveLength) !==
    textToRemove
  ) {
    throw new Error('Text to remove not found before cursor.');
  }

  const trimmedBefore = value.substring(0, position - textToRemoveLength);
  const selectionPosition = position - textToRemove.length;

  return {
    newValue: `${trimmedBefore}${value.substring(position)}`,
    selectionPosition,
  };
};

const wrapSelectedText = (
  target,
  value,
  selectionStart,
  selectionEnd,
  wrapWith
) => {
  const pieces = [
    value.substring(0, selectionStart),
    wrapWith,
    value.substring(selectionStart, selectionEnd),
    wrapWith,
    value.substring(selectionEnd),
  ];

  const selectionPosition = selectionEnd + wrapWith.length;

  return {
    newValue: pieces.join(''),
    selectionPosition,
  };
};

const updateElementState = (target, newValue, selectionPosition, onChange) => {
  onChange(newValue);
  setTimeout(() => {
    target.setSelectionRange(selectionPosition, selectionPosition);
  }, 1);
};
