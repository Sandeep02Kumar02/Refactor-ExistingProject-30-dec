import { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import { menuItems, categories, getMenuItemsByCategory } from '../data/menuData';
import MenuItemCard from '../components/MenuItemCard';
import { MenuCategory } from '../types';

function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlyPopular, setShowOnlyPopular] = useState(false);
  const [showOnlyNew, setShowOnlyNew] = useState(false);

  const filteredItems = useMemo(() => {
    let items = activeCategory === 'all'
      ? menuItems
      : getMenuItemsByCategory(activeCategory as MenuCategory);

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      items = items.filter(
        item =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.ingredients?.some(ing => ing.toLowerCase().includes(query))
      );
    }

    // Apply popular filter
    if (showOnlyPopular) {
      items = items.filter(item => item.isPopular);
    }

    // Apply new items filter
    if (showOnlyNew) {
      items = items.filter(item => item.isNew);
    }

    return items;
  }, [activeCategory, searchQuery, showOnlyPopular, showOnlyNew]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-12">
        <div className="container-custom">
          <h1 className="text-4xl font-display font-bold mb-4">Our Menu</h1>
          <p className="text-primary-100 max-w-2xl">
            Explore our mouthwatering selection of handcrafted burgers, crispy sides,
            refreshing drinks, and delicious desserts.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 md:top-20 bg-white shadow-sm z-40">
        <div className="container-custom py-4">
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-grow">
              <Search
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showOnlyPopular}
                  onChange={(e) => setShowOnlyPopular(e.target.checked)}
                  className="w-4 h-4 text-primary-500 rounded focus:ring-primary-500"
                />
                Popular Only
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showOnlyNew}
                  onChange={(e) => setShowOnlyNew(e.target.checked)}
                  className="w-4 h-4 text-primary-500 rounded focus:ring-primary-500"
                />
                New Items
              </label>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-hide">
            <button
              onClick={() => setActiveCategory('all')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                activeCategory === 'all'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Filter size={16} />
              All Items
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  activeCategory === category.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Items Grid */}
      <section className="py-8">
        <div className="container-custom">
          {filteredItems.length > 0 ? (
            <>
              <p className="text-gray-600 mb-6">
                Showing {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''}
                {activeCategory !== 'all' && (
                  <span> in {categories.find(c => c.id === activeCategory)?.name}</span>
                )}
                {searchQuery && <span> matching "{searchQuery}"</span>}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredItems.map((item) => (
                  <MenuItemCard key={item.id} item={item} showDetails />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🍔</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No items found
              </h3>
              <p className="text-gray-600">
                Try adjusting your filters or search query
              </p>
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                  setShowOnlyPopular(false);
                  setShowOnlyNew(false);
                }}
                className="btn-primary mt-4"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default MenuPage;
