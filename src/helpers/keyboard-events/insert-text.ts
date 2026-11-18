import {removeText} from './remove-text';
import {getCurrentLineBeforeCursor} from './line-helpers';
import {KeyboardEventResponse, IS_HANDLED} from './keyboard-event-response';

export const insertText = (
  value: string,
  position: number,
  textToInsert: string
): KeyboardEventResponse => {
  const selectionPosition = position + textToInsert.length;
  const newValue = `${value.substring(
    0,
    position
  )}${textToInsert}${value.substring(position)}`;

  return new KeyboardEventResponse(newValue, selectionPosition, IS_HANDLED);
};

export const insertTextAtBeginningOfLine = (
  value: string,
  position: number,
  textToInsert: string
): KeyboardEventResponse => {
  const currentLine = getCurrentLineBeforeCursor(value, position);
  const newLine = `${textToInsert}${currentLine}`;

  return replaceLine(value, position, currentLine, newLine);
};

export const replaceLine = (
  value: string,
  position: number,
  currentLine: string,
  newLine: string
): KeyboardEventResponse => {
  try {
    const {newValue, selectionPosition} = removeText(
      value,
      position,
      currentLine
    );

    return insertText(newValue, selectionPosition, newLine);
  } catch {
    return new KeyboardEventResponse(value, position, IS_HANDLED);
  }
};
