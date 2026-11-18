import {KEY_B, KEY_I, KEY_TAB, KEY_RETURN} from 'keycode-js';
import {insertNewLineIfAddingList} from './list-events';
import {insertTab, removeTab} from './tab-key';
import {wrapSelectedText} from './wrap-selection';
import {KeyboardEventResponse, IS_NOT_HANDLED} from './keyboard-event-response';

/** The parts of a keydown event (and its input/textarea target) we read. */
export type KeyDownEvent = {
  target: {
    value: string;
    selectionStart: number | null;
    selectionEnd: number | null;
  };
  ctrlKey: boolean;
  keyCode: number;
  metaKey: boolean;
  shiftKey: boolean;
};

export const handleKeyDown = (
  keyboardEvent: KeyDownEvent,
  keyListeners: string[]
): KeyboardEventResponse => {
  const {target} = keyboardEvent;
  const {value} = target;
  const selectionStart = target.selectionStart ?? 0;
  const selectionEnd = target.selectionEnd ?? 0;

  // Cmd+B or Ctrl+B
  if (
    isKeyComboTracked('meta+b', keyListeners) &&
    isKeyComboPressed('meta+b', keyboardEvent)
  ) {
    return wrapSelectedText(value, selectionStart, selectionEnd, '**');
  }

  // Cmd+I or Ctrl+I
  if (
    isKeyComboTracked('meta+i', keyListeners) &&
    isKeyComboPressed('meta+i', keyboardEvent)
  ) {
    return wrapSelectedText(value, selectionStart, selectionEnd, '*');
  }

  // Enter
  if (
    isKeyComboTracked('enter', keyListeners) &&
    isKeyComboPressed('enter', keyboardEvent)
  ) {
    return insertNewLineIfAddingList(value, selectionStart);
  }

  // Shift+Tab
  if (
    isKeyComboTracked('shift+tab', keyListeners) &&
    isKeyComboPressed('shift+tab', keyboardEvent)
  ) {
    return removeTab(value, selectionEnd);
  }

  // Tab
  if (
    isKeyComboTracked('tab', keyListeners) &&
    isKeyComboPressed('tab', keyboardEvent)
  ) {
    return insertTab(value, selectionEnd);
  }

  return new KeyboardEventResponse(value, selectionEnd, IS_NOT_HANDLED);
};

export const isKeyComboPressed = (
  keyCombo: string,
  keyboardEvent: KeyDownEvent
): boolean => {
  const {
    ctrlKey: isCtrlKeyPressed,
    keyCode,
    metaKey: isMetaKeyPressed,
    shiftKey: isShiftKeyPressed,
  } = keyboardEvent;

  const isCtrlOrMetaKey = isCtrlKeyPressed || isMetaKeyPressed;

  switch (keyCombo) {
    case 'enter':
      return keyCode === KEY_RETURN;
    case 'meta+b':
      return isCtrlOrMetaKey && keyCode === KEY_B;
    case 'meta+i':
      return isCtrlOrMetaKey && keyCode === KEY_I;
    case 'shift+tab':
      return isShiftKeyPressed && keyCode === KEY_TAB;
    case 'tab':
      return keyCode === KEY_TAB;
    default:
      return false;
  }
};

const isKeyComboTracked = (combo: string, keyListeners: string[]) => {
  return keyListeners.indexOf(combo) > -1;
};
