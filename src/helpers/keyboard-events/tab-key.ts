import {insertText, insertTextAtBeginningOfLine} from './insert-text';
import {removeText, removeTextFromBeginningOfLine} from './remove-text';
import {getCurrentLineBeforeCursor, trimLine} from './line-helpers';
import {isListItem} from './list-events';
import {KeyboardEventResponse, IS_HANDLED} from './keyboard-event-response';

export const TAB = '    ';

export const insertTab = (
  value: string,
  selectionEnd: number
): KeyboardEventResponse => {
  const trimmedCurrentLine = trimLine(
    getCurrentLineBeforeCursor(value, selectionEnd)
  );

  if (isListItem(trimmedCurrentLine)) {
    return indentLine(value, selectionEnd);
  }

  return insertText(value, selectionEnd, TAB);
};

export const removeTab = (
  value: string,
  selectionEnd: number
): KeyboardEventResponse => {
  try {
    return removeTabInCurrentLine(value, selectionEnd);
  } catch {
    return new KeyboardEventResponse(value, selectionEnd, IS_HANDLED);
  }
};

const indentLine = (value: string, position: number) => {
  return insertTextAtBeginningOfLine(value, position, TAB);
};

const outdentLine = (value: string, position: number) => {
  return removeTextFromBeginningOfLine(value, position, TAB);
};

const removeTabBeforeCursor = (value: string, position: number) => {
  return removeText(value, position, TAB);
};

const removeTabInCurrentLine = (value: string, position: number) => {
  try {
    return removeTabBeforeCursor(value, position);
  } catch {
    return outdentLine(value, position);
  }
};
