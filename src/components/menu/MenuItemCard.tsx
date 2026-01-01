/**
 * Menu Item Card component
 * Displays individual menu items with add to cart functionality
 */

import { useState } from 'react';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import type { MenuItem } from '../../types';
import { useCartStore } from '../../store/cartStore';

interface MenuItemCardProps {
  item: MenuItem;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem(item, quantity);
    setTimeout(() => {
      setIsAdding(false);
      setQuantity(1);
    }, 500);
  };

  const incrementQuantity = () => setQuantity((prev) => Math.min(prev + 1, 10));
  const decrementQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1));

  return (
    <div className="card">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {item.isPopular && (
          <span className="absolute top-2 right-2 bg-burger-orange text-white text-xs font-bold px-2 py-1 rounded">
            Popular
          </span>
        )}
        {!item.isAvailable && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-600 text-white px-4 py-2 rounded font-semibold">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-display font-semibold text-lg text-burger-brown">
            {item.name}
          </h3>
          <span className="text-burger-orange font-bold text-lg">
            ${item.price.toFixed(2)}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>

        {item.calories && (
          <p className="text-gray-400 text-xs mb-3">{item.calories} cal</p>
        )}

        {/* Quantity and Add to Cart */}
        {item.isAvailable && (
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-2 border rounded-lg">
              <button
                onClick={decrementQuantity}
                className="p-2 text-gray-600 hover:text-burger-orange transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-medium">{quantity}</span>
              <button
                onClick={incrementQuantity}
                className="p-2 text-gray-600 hover:text-burger-orange transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                isAdding
                  ? 'bg-green-500 text-white'
                  : 'bg-burger-orange hover:bg-burger-red text-white'
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>{isAdding ? 'Added!' : 'Add'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuItemCard;
