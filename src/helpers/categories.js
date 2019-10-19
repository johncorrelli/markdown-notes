export const getNoteCategories = notes => {
  const uniqueCategories = [];

  notes.forEach(note => {
    const {category} = note;

    if (uniqueCategories.indexOf(category) !== -1) {
      return;
    }

    uniqueCategories.push(category);
  });

  uniqueCategories.sort((a, b) => {
    const aCategory = a && a.toLowerCase();
    const bCategory = b && b.toLowerCase();

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

export const getNotesByCategory = (notes, selectedCategory) => {
  if (!selectedCategory) {
    return notes;
  }

  return notes.filter(note => note.category === selectedCategory);
};
