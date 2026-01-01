/**
 * Category Filter component
 * Allows filtering menu items by category
 */

import { categories } from '../../data/menuItems';

interface CategoryFilterProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-8">
      <button
        onClick={() => onSelectCategory(null)}
        className={`px-6 py-2 rounded-full font-medium transition-all ${
          selectedCategory === null
            ? 'bg-burger-orange text-white shadow-md'
            : 'bg-white text-burger-brown hover:bg-burger-yellow'
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className={`px-6 py-2 rounded-full font-medium transition-all flex items-center space-x-2 ${
            selectedCategory === category.id
              ? 'bg-burger-orange text-white shadow-md'
              : 'bg-white text-burger-brown hover:bg-burger-yellow'
          }`}
        >
          <span>{category.icon}</span>
          <span>{category.name}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
