import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Truck, Store, Search } from 'lucide-react';
import { categories, getMenuItemsByCategory } from '../data/menuData';
import MenuItemCard from '../components/MenuItemCard';
import { useCart } from '../context/CartContext';
import { MenuCategory } from '../types';

type OrderType = 'delivery' | 'pickup';

function OrderPage() {
  const [orderType, setOrderType] = useState<OrderType>('delivery');
  const [activeCategory, setActiveCategory] = useState<string>('burgers');
  const [searchQuery, setSearchQuery] = useState('');
  const { cart, itemCount } = useCart();

  const filteredItems = useMemo(() => {
    let items = getMenuItemsByCategory(activeCategory as MenuCategory);

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      items = items.filter(
        item =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
      );
    }

    return items;
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-12">
        <div className="container-custom">
          <h1 className="text-4xl font-display font-bold mb-4">Order Online</h1>
          <p className="text-primary-100 max-w-2xl">
            Choose your favorite items and we'll have them ready for you in no time.
          </p>
        </div>
      </section>

      {/* Order Type Selection */}
      <section className="bg-white border-b sticky top-16 md:top-20 z-40">
        <div className="container-custom py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex gap-4">
              <button
                onClick={() => setOrderType('delivery')}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  orderType === 'delivery'
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Truck size={20} />
                Delivery
              </button>
              <button
                onClick={() => setOrderType('pickup')}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  orderType === 'pickup'
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Store size={20} />
                Pickup
              </button>
            </div>

            {/* Cart Summary */}
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                {itemCount > 0 ? (
                  <span>
                    {itemCount} item{itemCount !== 1 ? 's' : ''} • ${cart.total.toFixed(2)}
                  </span>
                ) : (
                  <span>Your cart is empty</span>
                )}
              </div>
              <Link
                to="/cart"
                className={`btn-primary flex items-center gap-2 ${
                  itemCount === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <ShoppingBag size={18} />
                View Cart
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-custom py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Categories */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-44">
              <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
              <nav className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeCategory === category.id
                        ? 'bg-primary-50 text-primary-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-xl">{category.icon}</span>
                    <span>{category.name}</span>
                    <span className="ml-auto text-sm text-gray-400">
                      {getMenuItemsByCategory(category.id as MenuCategory).length}
                    </span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Menu Items */}
          <main className="flex-grow">
            {/* Search */}
            <div className="mb-6">
              <div className="relative">
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
            </div>

            {/* Category Title */}
            <div className="mb-6">
              <h2 className="text-2xl font-display font-bold text-gray-900 flex items-center gap-2">
                <span>{categories.find(c => c.id === activeCategory)?.icon}</span>
                {categories.find(c => c.id === activeCategory)?.name}
              </h2>
              <p className="text-gray-600 mt-1">
                {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''} available
              </p>
            </div>

            {/* Items Grid */}
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <MenuItemCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  No items found
                </h3>
                <p className="text-gray-600">
                  Try a different search term
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="btn-outline mt-4"
                >
                  Clear Search
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Floating Cart Button (Mobile) */}
      {itemCount > 0 && (
        <div className="fixed bottom-4 left-4 right-4 lg:hidden">
          <Link
            to="/cart"
            className="btn-primary w-full py-4 flex items-center justify-center gap-3 text-lg shadow-lg"
          >
            <ShoppingBag size={24} />
            View Cart ({itemCount}) • ${cart.total.toFixed(2)}
          </Link>
        </div>
      )}
    </div>
  );
}

export default OrderPage;
