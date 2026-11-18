import {getNoteCategories, getNotesByCategory} from '../categories';
import {EMPTY_CATEGORY_NAME} from '../../constants/categories';
import type {Note} from '../../types';

const note = (id: string, category: string | null): Note => ({
  id,
  title: `Note ${id}`,
  category,
  value: null,
});

describe('categories.ts', () => {
  describe('getNoteCategories', () => {
    it('should list uncategorized notes under the empty category name', () => {
      const notes = [note('1', null), note('2', 'Dev Notes')];

      expect(getNoteCategories(notes)).toStrictEqual([
        'Dev Notes',
        EMPTY_CATEGORY_NAME,
      ]);
    });

    it('should return unique categories sorted case-insensitively', () => {
      const notes = [
        note('1', 'work'),
        note('2', 'Personal'),
        note('3', 'work'),
        note('4', 'archive'),
      ];

      expect(getNoteCategories(notes)).toStrictEqual([
        'archive',
        'Personal',
        'work',
      ]);
    });
  });

  describe('getNotesByCategory', () => {
    it('should return every note when no category is selected', () => {
      const notes = [note('1', 'a'), note('2', 'b')];

      expect(getNotesByCategory(notes, null)).toBe(notes);
    });

    it('should return only notes in the selected category', () => {
      const notes = [note('1', 'a'), note('2', 'b')];

      expect(getNotesByCategory(notes, 'b')).toStrictEqual([notes[1]]);
    });
  });
});
