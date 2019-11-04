import * as fn from '../wrap-selection.js';
import {KeyboardEventResponse, IS_HANDLED} from '../keyboard-event-response';

describe('wrap-selection.js', () => {
  describe('wrapSelectedText', () => {
    it('should wrap the selected text with the specified wrapper', () => {
      const currentValue = '0 WRAP ME 0';
      const wrapWith = '*';
      const expectedValue = '0 *WRAP ME* 0';
      const selectionStart = 2;
      const selectionEnd = selectionStart + 7;

      const call = fn.wrapSelectedText(
        currentValue,
        selectionStart,
        selectionEnd,
        wrapWith
      );
      const returnValue = new KeyboardEventResponse(
        expectedValue,
        selectionEnd + wrapWith.length,
        IS_HANDLED
      );

      expect(call).toStrictEqual(returnValue);
    });

    it('should insert the wrapWith value at the current cursor position if there is no selection', () => {
      const currentValue = '0 INSERT BEFORE 0';
      const wrapWith = '*';
      const expectedValue = '0 **INSERT BEFORE 0';
      const selectionStart = 2;
      const selectionEnd = selectionStart;

      const call = fn.wrapSelectedText(
        currentValue,
        selectionStart,
        selectionEnd,
        wrapWith
      );
      const returnValue = new KeyboardEventResponse(
        expectedValue,
        selectionEnd + wrapWith.length,
        IS_HANDLED
      );

      expect(call).toStrictEqual(returnValue);
    });
  });
});
