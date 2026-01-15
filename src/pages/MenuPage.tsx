import React, { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import { allMenuItems, burgers, sides, drinks, desserts, combos } from '../data/menu';
import MenuItemCard from '../components/MenuItemCard';
import type { MenuCategory } from '../types';

/**
 * Category filter option type.
 */
interface CategoryOption {
  id: MenuCategory | 'all';
  name: string;
  count: number;
}

/**
 * MenuPage component - Displays all menu items with filtering and search.
 */
const MenuPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | 'all'>('all');
  const [showFilters, setShowFilters] = useState(false);

  /**
   * Category options with item counts.
   */
  const categories: CategoryOption[] = [
    { id: 'all', name: 'All Items', count: allMenuItems.length },
    { id: 'burgers', name: 'Burgers', count: burgers.length },
    { id: 'sides', name: 'Sides', count: sides.length },
    { id: 'drinks', name: 'Drinks', count: drinks.length },
    { id: 'desserts', name: 'Desserts', count: desserts.length },
    { id: 'combos', name: 'Combos', count: combos.length },
  ];

  /**
   * Filtered menu items based on search query and category.
   */
  const filteredItems = useMemo(() => {
    let items = allMenuItems;

    // Filter by category
    if (selectedCategory !== 'all') {
      items = items.filter(item => item.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      items = items.filter(
        item =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.ingredients?.some(ing => ing.toLowerCase().includes(query))
      );
    }

    return items;
  }, [searchQuery, selectedCategory]);

  /**
   * Handle search input change.
   */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  /**
   * Handle category selection.
   */
  const handleCategoryChange = (category: MenuCategory | 'all') => {
    setSelectedCategory(category);
    setShowFilters(false);
  };

  /**
   * Clear all filters.
   */
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="container-custom py-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-2">
            Our Menu
          </h1>
          <p className="text-gray-600">
            Explore our delicious selection of burgers, sides, and more.
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="sticky top-16 bg-white shadow-sm z-30">
        <div className="container-custom py-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="input pl-10"
              />
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden btn-secondary flex items-center justify-center"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </button>

            {/* Desktop Category Tabs */}
            <div className="hidden md:flex items-center space-x-2 overflow-x-auto scrollbar-hide">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors
                    ${selectedCategory === category.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {category.name}
                  <span className="ml-1 opacity-70">({category.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Filter Options */}
          {showFilters && (
            <div className="md:hidden mt-4 pb-2">
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors
                      ${selectedCategory === category.id
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700'
                      }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="container-custom py-8">
        {/* Active Filters */}
        {(searchQuery || selectedCategory !== 'all') && (
          <div className="mb-6 flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-600">Active filters:</span>
            {selectedCategory !== 'all' && (
              <span className="badge badge-primary">
                {categories.find(c => c.id === selectedCategory)?.name}
              </span>
            )}
            {searchQuery && (
              <span className="badge badge-primary">
                Search: "{searchQuery}"
              </span>
            )}
            <button
              onClick={clearFilters}
              className="text-sm text-primary-600 hover:underline ml-2"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Results Count */}
        <p className="text-gray-600 mb-6">
          Showing {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''}
        </p>

        {/* Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map(item => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🍔</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No items found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <button onClick={clearFilters} className="btn-primary">
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;
