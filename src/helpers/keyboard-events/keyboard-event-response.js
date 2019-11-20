export const IS_HANDLED = true;
export const IS_NOT_HANDLED = false;

export class KeyboardEventResponse {
  constructor(newValue, selectionPosition, isHandled) {
    this.newValue = newValue || '';
    this.selectionPosition = selectionPosition || 0;
    this.isHandled = isHandled || IS_NOT_HANDLED;
  }
}
