import * as fn from '../remove-text';
import {KeyboardEventResponse, IS_HANDLED} from '../keyboard-event-response';

describe('remove-text.js', () => {
  describe('removeText', () => {
    const textToRemove = 'ABC';

    it('it should remove the specified text on the current line before the cursor', () => {
      const previousValue = `012${textToRemove}345`;
      const nextValue = '012345';

      const textToRemoveOffset = 3;
      const position = textToRemoveOffset + textToRemove.length;
      const nextPosition = position - textToRemove.length;

      const call = fn.removeText(previousValue, position, textToRemove);
      const returnValue = new KeyboardEventResponse(
        nextValue,
        nextPosition,
        IS_HANDLED
      );

      expect(call).toStrictEqual(returnValue);
    });

    it('should throw and exception if the text to remove is not before the cursor', () => {
      const incorrectTextToRemove = 'XYZ';
      const previousValue = `012${textToRemove}345`;

      const textToRemoveOffset = 3;
      const position = textToRemoveOffset + textToRemove.length;

      expect(() => {
        fn.removeText(previousValue, position, incorrectTextToRemove);
      }).toThrow();
    });
  });
});
