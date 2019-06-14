// flow
import React from 'react';

type Props = {
  categories: Array<Object>,
  onChange: (selectedCategory: string) => void,
};

const CategorySelector = ({categories, onChange}: Props) => {
  const handleChange = value => {
    onChange(value !== '' ? value : null);
  };

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
