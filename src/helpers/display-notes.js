export function displayNotes(notes, selectedCategory) {
  const filteredNotes = notes.filter(note => {
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

  return filteredNotes;
}
