import {insertText, insertTextAtBeginningOfLine} from './insert-text';
import {removeText, removeTextFromBeginningOfLine} from './remove-text';
import {getCurrentLineBeforeCursor, trimLine} from './line-helpers';
import {isListItem} from './list-events';
import {KeyboardEventResponse, IS_HANDLED} from './keyboard-event-response';

export const TAB = '    ';

export const insertTab = (value, selectionEnd) => {
  const trimmedCurrentLine = trimLine(
    getCurrentLineBeforeCursor(value, selectionEnd)
  );

  if (isListItem(trimmedCurrentLine)) {
    return indentLine(value, selectionEnd);
  }

  return insertText(value, selectionEnd, TAB);
};

export const removeTab = (value, selectionEnd) => {
  try {
    return removeTabInCurrentLine(value, selectionEnd);
  } catch (e) {
    return new KeyboardEventResponse(value, selectionEnd, IS_HANDLED);
  }
};

const indentLine = (value, position) => {
  return insertTextAtBeginningOfLine(value, position, TAB);
};

const outdentLine = (value, position) => {
  return removeTextFromBeginningOfLine(value, position, TAB);
};

const removeTabBeforeCursor = (value, position) => {
  return removeText(value, position, TAB);
};

const removeTabInCurrentLine = (value, position) => {
  try {
    return removeTabBeforeCursor(value, position);
  } catch (e) {
    return outdentLine(value, position);
  }
};
