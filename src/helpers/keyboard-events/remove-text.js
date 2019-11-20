import {getCurrentLineBeforeCursor} from './line-helpers';
import {replaceLine} from './insert-text';
import {KeyboardEventResponse, IS_HANDLED} from './keyboard-event-response';

export const removeText = (value, position, textToRemove) => {
  const beforePosition = value.substring(0, position);
  const textToRemoveLength = textToRemove.length;

  if (
    beforePosition.substring(beforePosition.length - textToRemoveLength) !==
    textToRemove
  ) {
    throw new Error('Text to remove not found before cursor.');
  }

  const trimmedBefore = value.substring(0, position - textToRemoveLength);
  const newValue = `${trimmedBefore}${value.substring(position)}`;
  const selectionPosition = position - textToRemove.length;

  return new KeyboardEventResponse(newValue, selectionPosition, IS_HANDLED);
};

export const removeTextFromBeginningOfLine = (
  value,
  position,
  textToRemove
) => {
  const currentLine = getCurrentLineBeforeCursor(value, position);

  if (currentLine.substring(0, 4) !== textToRemove) {
    throw new Error(
      'Text to remove not found at the beginning of the current line.'
    );
  }

  const newLine = currentLine.substring(textToRemove.length);

  return replaceLine(value, position, currentLine, newLine);
};
