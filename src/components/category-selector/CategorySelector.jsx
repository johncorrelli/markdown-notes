// flow
import React from 'react';

type Props = {
  blankOption?: string,
  categories: Array<Object>,
  onChange: (selectedCategory: string) => void,
  value?: string,
};

const CategorySelector = ({
  blankOption,
  categories,
  onChange,
  value,
}: Props) => {
  const handleChange = value => {
    onChange(value !== '' ? value : null);
  };

  return (
    <select
      className="category-selector"
      value={value || ''}
      name="categoryFilter"
      onChange={e => handleChange(e.target.value)}
      onBlur={e => handleChange(e.target.value)}
    >
      {blankOption && <option value="">{blankOption}</option>}
      {categories
        .filter(c => c !== null)
        .sort()
        .map((category, index) => {
          return <option key={index}>{category}</option>;
        })}
    </select>
  );
};

export default CategorySelector;
