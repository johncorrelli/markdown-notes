import * as fn from '../list-events';
import {KeyboardEventResponse, IS_HANDLED} from '../keyboard-event-response';

describe('list-events.js', () => {
  describe('insertNewLineIfAddingList', () => {
    it('should insert a list row if previous line was a list', () => {
      const previousValue = '- item 1\n- item 2';
      const nextValue = `${previousValue}\n- `;

      const call = fn.insertNewLineIfAddingList(
        previousValue,
        previousValue.length
      );
      const returnValue = new KeyboardEventResponse(
        nextValue,
        nextValue.length,
        IS_HANDLED
      );

      expect(call).toStrictEqual(returnValue);
    });

    it('should insert a list row if previous line was a list with proper indentation', () => {
      const previousValue = '- item 1\n    - item 2';
      const nextValue = `${previousValue}\n    - `;

      const call = fn.insertNewLineIfAddingList(
        previousValue,
        previousValue.length
      );
      const returnValue = new KeyboardEventResponse(
        nextValue,
        nextValue.length,
        IS_HANDLED
      );

      expect(call).toStrictEqual(returnValue);
    });

    it('should insert a checklist row if previous line was a checklist item', () => {
      const previousValue = '- [x] item 1\n- [ ] item 2';
      const nextValue = `${previousValue}\n- [ ] `;

      const call = fn.insertNewLineIfAddingList(
        previousValue,
        previousValue.length
      );
      const returnValue = new KeyboardEventResponse(
        nextValue,
        nextValue.length,
        IS_HANDLED
      );

      expect(call).toStrictEqual(returnValue);
    });

    it('should insert a checklist row if previous line was a completed checklist item', () => {
      const previousValue = '- [x] item 1\n- [x] item 2';
      const nextValue = `${previousValue}\n- [ ] `;

      const call = fn.insertNewLineIfAddingList(
        previousValue,
        previousValue.length
      );
      const returnValue = new KeyboardEventResponse(
        nextValue,
        nextValue.length,
        IS_HANDLED
      );

      expect(call).toStrictEqual(returnValue);
    });

    it('should insert a checklist row if previous line was a completed checklist item with proper indentation', () => {
      const previousValue = '- [x] item 1\n    - [x] item 2';
      const nextValue = `${previousValue}\n    - [ ] `;

      const call = fn.insertNewLineIfAddingList(
        previousValue,
        previousValue.length
      );
      const returnValue = new KeyboardEventResponse(
        nextValue,
        nextValue.length,
        IS_HANDLED
      );

      expect(call).toStrictEqual(returnValue);
    });

    it('should insert a new line if previous line is not a list or checklist item', () => {
      const previousValue = 'row 1\nrow 2';
      const nextValue = `${previousValue}\n`;

      const call = fn.insertNewLineIfAddingList(
        previousValue,
        previousValue.length
      );
      const returnValue = new KeyboardEventResponse(
        nextValue,
        nextValue.length,
        IS_HANDLED
      );

      expect(call).toStrictEqual(returnValue);
    });

    it('should remove the previous list line if it was an empty list item', () => {
      const baseValue = '- row 1\n- row 2';
      const previousValueWithEmptyItem = `${baseValue}\n- `;
      const nextValue = `${baseValue}\n\n`;

      const call = fn.insertNewLineIfAddingList(
        previousValueWithEmptyItem,
        previousValueWithEmptyItem.length
      );
      const returnValue = new KeyboardEventResponse(
        nextValue,
        nextValue.length,
        IS_HANDLED
      );

      expect(call).toStrictEqual(returnValue);
    });
  });

  describe('isListItem', () => {
    it('should correctly recognize if a trimmed line is a list or not', () => {
      // standard list item
      expect(fn.isListItem('- hey there')).toBe(true);
      expect(fn.isListItem('+ hey there')).toBe(true);
      expect(fn.isListItem('- ')).toBe(true);
      expect(fn.isListItem('+ ')).toBe(true);

      // checklist items
      expect(fn.isListItem('- [ ] checklist item')).toBe(true);
      expect(fn.isListItem('- [x] checklist item')).toBe(true);
      expect(fn.isListItem('+ [ ] checklist item')).toBe(true);
      expect(fn.isListItem('+ [x] checklist item')).toBe(true);

      // not list items
      expect(fn.isListItem('not')).toBe(false);
      expect(fn.isListItem('\n')).toBe(false);
      expect(fn.isListItem('* row')).toBe(false);
      expect(fn.isListItem('-')).toBe(false); // is not a list until there is a space after the first character
      expect(fn.isListItem('+')).toBe(false); // is not a list until there is a space after the first character
    });
  });
});
