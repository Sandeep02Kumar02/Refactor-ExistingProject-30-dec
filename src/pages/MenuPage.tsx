/**
 * Menu Page component
 * Displays all menu items with category filtering
 */

import { useState, useMemo } from 'react';
import { menuItems } from '../data/menuItems';
import MenuItemCard from '../components/menu/MenuItemCard';
import CategoryFilter from '../components/menu/CategoryFilter';

const MenuPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    if (!selectedCategory) {
      return menuItems;
    }
    return menuItems.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-burger-cream py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="section-title">Our Menu</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From classic burgers to loaded fries, we have something delicious for everyone.
            All made fresh to order with premium ingredients.
          </p>
        </div>

        {/* Category Filter */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No items found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;
