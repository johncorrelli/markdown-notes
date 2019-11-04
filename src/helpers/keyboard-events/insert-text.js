import {removeText} from './remove-text';
import {getCurrentLineBeforeCursor} from './line-helpers';
import {KeyboardEventResponse, IS_HANDLED} from './keyboard-event-response';

export const insertText = (value, position, textToInsert) => {
  const selectionPosition = position + textToInsert.length;
  const newValue = `${value.substring(
    0,
    position
  )}${textToInsert}${value.substring(position)}`;

  return new KeyboardEventResponse(newValue, selectionPosition, IS_HANDLED);
};

export const insertTextAtBeginningOfLine = (value, position, textToInsert) => {
  const currentLine = getCurrentLineBeforeCursor(value, position);
  const newLine = `${textToInsert}${currentLine}`;

  return replaceLine(value, position, currentLine, newLine);
};

export const replaceLine = (value, position, currentLine, newLine) => {
  try {
    const {newValue, selectionPosition} = removeText(
      value,
      position,
      currentLine
    );

    return insertText(newValue, selectionPosition, newLine);
  } catch (e) {
    return new KeyboardEventResponse(value, position, IS_HANDLED);
  }
};
