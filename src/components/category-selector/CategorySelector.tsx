type Props = {
  blankOption?: string;
  categories: Array<string | null>;
  onChange: (selectedCategory: string | null) => void;
  value?: string | null;
};

const CategorySelector = ({
  blankOption,
  categories,
  onChange,
  value,
}: Props) => {
  const handleChange = (value: string) => {
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
