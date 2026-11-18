import Fuse, {type FuseOptionKey, type IFuseOptions} from 'fuse.js';
import {EMPTY_CATEGORY_NAME} from '../constants/categories';
import type {Note} from '../types';

const fuseOptions: IFuseOptions<Note> = {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 50,
  minMatchCharLength: 3,
};

export function displayNotes(
  notes: Note[],
  selectedCategory: string | null,
  searchString: string,
  searchKeys: FuseOptionKey<Note>[]
): Note[] {
  const filteredNotes = notes.filter(note => {
    if (!note.category) {
      note.category = EMPTY_CATEGORY_NAME;
    }

    return !selectedCategory || selectedCategory === note.category;
  });

  filteredNotes.sort((a, b) => {
    const aTitle = a.title.toLowerCase();
    const bTitle = b.title.toLowerCase();
    if (aTitle < bTitle) {
      return -1;
    }
    if (aTitle > bTitle) {
      return 1;
    }
    return 0;
  });

  if (!searchString || !searchKeys) {
    return filteredNotes;
  }

  const fuse = new Fuse(filteredNotes, {...fuseOptions, keys: searchKeys});

  return fuse.search(searchString).map(result => result.item);
}
