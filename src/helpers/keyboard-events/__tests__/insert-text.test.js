import * as fn from '../insert-text';
import {
  KeyboardEventResponse,
  IS_HANDLED,
  IS_NOT_HANDLED,
} from '../keyboard-event-response';

describe('insert-text.js', () => {
  const textToInsert = 'ABC';

  describe('insertText', () => {
    it('should insert text at the beginning of the string of text', () => {
      const previousValue = '012345';
      const nextValue = `${textToInsert}012345`;

      const position = 0;
      const nextPosition = position + textToInsert.length;

      const call = fn.insertText(previousValue, position, textToInsert);
      const returnValue = new KeyboardEventResponse(
        nextValue,
        nextPosition,
        IS_HANDLED
      );

      expect(call).toStrictEqual(returnValue);
    });

    it('should insert text at the selection position inside the string of text', () => {
      const previousValue = '012345';
      const nextValue = `012${textToInsert}345`;

      const position = 3;
      const nextPosition = position + textToInsert.length;

      const call = fn.insertText(previousValue, position, textToInsert);
      const returnValue = new KeyboardEventResponse(
        nextValue,
        nextPosition,
        IS_HANDLED
      );

      expect(call).toStrictEqual(returnValue);
    });

    it('should insert text at the end of the string of text', () => {
      const previousValue = '012345';
      const nextValue = `012345${textToInsert}`;

      const position = 6;
      const nextPosition = position + textToInsert.length;

      const call = fn.insertText(previousValue, position, textToInsert);
      const returnValue = new KeyboardEventResponse(
        nextValue,
        nextPosition,
        IS_HANDLED
      );

      expect(call).toStrictEqual(returnValue);
    });
  });

  describe('insertTextAtBeginningOfLine', () => {
    it('should insert the specified value at the beginning of the current line', () => {
      const previousValue = '012345';
      const nextValue = `${textToInsert}012345`;

      const position = 3;
      const nextPosition = position + textToInsert.length;

      const call = fn.insertTextAtBeginningOfLine(
        previousValue,
        position,
        textToInsert
      );
      const returnValue = new KeyboardEventResponse(
        nextValue,
        nextPosition,
        IS_HANDLED
      );

      expect(call).toStrictEqual(returnValue);
    });

    it('should insert the specified value at the beginning of the current line when there are multiple lines', () => {
      const previousValue = '0\n1\n2\nInsert Text On This Line\n4\n5';
      const nextValue = `0\n1\n2\n${textToInsert}Insert Text On This Line\n4\n5`;

      const position = 14;
      const nextPosition = position + textToInsert.length;

      const call = fn.insertTextAtBeginningOfLine(
        previousValue,
        position,
        textToInsert
      );
      const returnValue = new KeyboardEventResponse(
        nextValue,
        nextPosition,
        IS_HANDLED
      );

      expect(call).toStrictEqual(returnValue);
    });
  });

  describe('replaceLine', () => {
    it('should replace the currently selected line with a new value', () => {
      const originalLine = '3 Replace this line here';
      const replacedLine = '3 With this line here';

      const previousValue = `0\n1\n2\n${originalLine}\n4\n5`;
      const nextValue = `0\n1\n2\n${replacedLine}\n4\n5`;

      const position = 30; // cursor is after "here" in the original line
      const nextPosition = position - originalLine.length + replacedLine.length;

      const call = fn.replaceLine(
        previousValue,
        position,
        originalLine,
        replacedLine
      );
      const returnValue = new KeyboardEventResponse(
        nextValue,
        nextPosition,
        IS_HANDLED
      );

      expect(call).toStrictEqual(returnValue);
    });

    it('should fail gracefully if it cannot match the original line', () => {
      const originalLine = '3 Replace this line here';
      const incorrectOriginalLine = '3 Fail to replace this line';
      const replacedLine = '3 With this line here';

      const previousValue = `0\n1\n2\n${originalLine}\n4\n5`;

      const position = 30; // cursor is after "here" in the original line

      const call = fn.replaceLine(
        previousValue,
        position,
        incorrectOriginalLine,
        replacedLine
      );
      const returnValue = new KeyboardEventResponse(
        previousValue,
        position,
        IS_HANDLED
      );

      expect(call).toStrictEqual(returnValue);
    });
  });
});
