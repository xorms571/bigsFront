type CategoryProps = {
  handleCategory: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  categories: string[];
  category: string;
};
const Category = ({ categories, category, handleCategory }: CategoryProps) => {
  return (
    <select className="border border-black rounded-md" name="category" onChange={handleCategory} value={category} required>
      {categories.map((categoryOption) => (
        <option key={categoryOption} value={categoryOption}>
          {categoryOption}
        </option>
      ))}
    </select>
  );
};

export default Category;
