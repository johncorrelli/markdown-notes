import * as fn from '../tab-key';
import {KeyboardEventResponse, IS_HANDLED} from '../keyboard-event-response';

describe('tab-key.js', () => {
  describe('insertTab', () => {
    it('should insert a tab after the current cursor position', () => {
      const value = '0123';
      const selection = value.length;

      const nextValue = `${value}${fn.TAB}`;
      const nextPosition = selection + fn.TAB.length;

      const call = fn.insertTab(value, selection);
      const returnValue = new KeyboardEventResponse(
        nextValue,
        nextPosition,
        IS_HANDLED
      );

      expect(call).toStrictEqual(returnValue);
    });

    it('should indent the current line when it is a list item', () => {
      const value = '- 0123';
      const selection = value.length;

      const nextValue = `${fn.TAB}${value}`;
      const nextPosition = selection + fn.TAB.length;

      const call = fn.insertTab(value, selection);
      const returnValue = new KeyboardEventResponse(
        nextValue,
        nextPosition,
        IS_HANDLED
      );

      expect(call).toStrictEqual(returnValue);
    });

    it('should indent the current line when it is a checklist item', () => {
      const value = '- [x] 0123';
      const selection = value.length;

      const nextValue = `${fn.TAB}${value}`;
      const nextPosition = selection + fn.TAB.length;

      const call = fn.insertTab(value, selection);
      const returnValue = new KeyboardEventResponse(
        nextValue,
        nextPosition,
        IS_HANDLED
      );

      expect(call).toStrictEqual(returnValue);
    });
  });

  describe('removeTab', () => {
    it('should remove the tab before the cursor in the current line', () => {
      const value = `123${fn.TAB}`;
      const selection = value.length;
      const expectedValue = '123';

      const nextValue = expectedValue;
      const nextPosition = expectedValue.length;

      const call = fn.removeTab(value, selection);
      const returnValue = new KeyboardEventResponse(
        nextValue,
        nextPosition,
        IS_HANDLED
      );

      expect(call).toStrictEqual(returnValue);
    });

    it('should fail gracefully if there is not a tab before the cursor in the current line', () => {
      const value = '123';
      const selection = value.length;

      const call = fn.removeTab(value, selection);
      const returnValue = new KeyboardEventResponse(
        value,
        value.length,
        IS_HANDLED
      );

      expect(call).toStrictEqual(returnValue);
    });

    it('should outdent an indented list item', () => {
      const value = `${fn.TAB}- list item`;
      const selection = value.length;
      const expectedValue = '- list item';

      const call = fn.removeTab(value, selection);
      const returnValue = new KeyboardEventResponse(
        expectedValue,
        expectedValue.length,
        IS_HANDLED
      );

      expect(call).toStrictEqual(returnValue);
    });

    it('should remove the tab before the cursor in a list item', () => {
      const value = `${fn.TAB}- list item${fn.TAB}`;
      const selection = value.length;
      const expectedValue = `${fn.TAB}- list item`;

      const call = fn.removeTab(value, selection);
      const returnValue = new KeyboardEventResponse(
        expectedValue,
        expectedValue.length,
        IS_HANDLED
      );

      expect(call).toStrictEqual(returnValue);
    });

    it('should fail gracefully if the list item is not indented', () => {
      const value = '- list item';
      const selection = value.length;

      const call = fn.removeTab(value, selection);
      const returnValue = new KeyboardEventResponse(
        value,
        value.length,
        IS_HANDLED
      );

      expect(call).toStrictEqual(returnValue);
    });
  });
});
