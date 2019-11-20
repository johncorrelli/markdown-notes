import {KeyboardEventResponse, IS_HANDLED} from './keyboard-event-response';

export const wrapSelectedText = (
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

  return new KeyboardEventResponse(
    pieces.join(''),
    selectionPosition,
    IS_HANDLED
  );
};
