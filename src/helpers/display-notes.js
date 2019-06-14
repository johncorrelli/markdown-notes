import Fuse from 'fuse.js';

const UNCATEGORIZED = 'Uncategorized';

const fuseOptions = {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 50,
  maxPatternLength: 12,
  minMatchCharLength: 3,
};

export function displayNotes(
  notes,
  selectedCategory,
  searchString,
  searchKeys
) {
  const filteredNotes = notes.filter(note => {
    if (!note.category) {
      note.category = UNCATEGORIZED;
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

  return fuse.search(searchString);
}
