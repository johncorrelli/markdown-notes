// flow
import React from 'react';

type Props = {
  notes: Array<Object>,
  onChange: (selectedCategory: string) => void,
};

const CategorySelector = ({notes, onChange}: Props) => {
  const categories = [];

  const handleChange = value => {
    onChange(value !== '' ? value : null);
  };

  notes.forEach(note => {
    if (categories.indexOf(note.category) !== -1) {
      return;
    }

    categories.push(note.category);
  });

  categories.sort();

  return (
    <select
      className="category-selector"
      name="categoryFilter"
      onChange={e => handleChange(e.target.value)}
    >
      <option value="">All Categories</option>
      {categories.map((category, index) => {
        return <option key={index}>{category}</option>;
      })}
    </select>
  );
};

export default CategorySelector;
