import * as fn from '../line-helpers';

describe('line-helpers.js', () => {
  describe('getCurrentLineBeforeCursor', () => {
    it('should grab the current line from the cursor position', () => {
      const value = 'one\ntwo\nthree';
      const position = 6; // cursor is between the 'w' and the 'o' on line 'two'

      expect(fn.getCurrentLineBeforeCursor(value, position)).toBe('tw');

      // move cursor to after the 'o' in line 'two'
      expect(fn.getCurrentLineBeforeCursor(value, position + 1)).toBe('two');
    });
  });

  describe('trimLine', () => {
    it('should return the current line without any leading spaces', () => {
      expect(fn.trimLine('    one')).toBe('one');
      expect(fn.trimLine('\t    one')).toBe('one');
    });
  });

  describe('firstCharacter', () => {
    it('it should get the first character of a line', () => {
      expect(fn.firstCharacter('    one')).toBe(' ');
      expect(fn.firstCharacter('one')).toBe('o');
      expect(fn.firstCharacter('- one')).toBe('-');
    });
  });
});
