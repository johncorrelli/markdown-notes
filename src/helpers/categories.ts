import {EMPTY_CATEGORY_NAME} from '../constants/categories';
import type {Note} from '../types';

/**
 * Unique, case-insensitively sorted category names. Notes without a category
 * are listed under EMPTY_CATEGORY_NAME, matching how the notes list shows them.
 */
export const getNoteCategories = (notes: Note[]): string[] => {
  const uniqueCategories: string[] = [];

  notes.forEach(note => {
    const category = note.category || EMPTY_CATEGORY_NAME;

    if (uniqueCategories.indexOf(category) !== -1) {
      return;
    }

    uniqueCategories.push(category);
  });

  uniqueCategories.sort((a, b) => {
    const aCategory = a.toLowerCase();
    const bCategory = b.toLowerCase();

    if (aCategory < bCategory) {
      return -1;
    }
    if (aCategory > bCategory) {
      return 1;
    }
    return 0;
  });

  return uniqueCategories;
};

export const getNotesByCategory = (
  notes: Note[],
  selectedCategory: string | null
): Note[] => {
  if (!selectedCategory) {
    return notes;
  }

  return notes.filter(note => note.category === selectedCategory);
};
