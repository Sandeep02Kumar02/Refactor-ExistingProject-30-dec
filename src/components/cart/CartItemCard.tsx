/**
 * Cart Item Card component
 * Displays individual items in the shopping cart with quantity controls
 */

import { Plus, Minus, Trash2 } from 'lucide-react';
import type { CartItem } from '../../types';
import { useCartStore } from '../../store/cartStore';

interface CartItemCardProps {
  item: CartItem;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCartStore();
  const { menuItem, quantity, specialInstructions } = item;

  const handleIncrement = () => {
    updateQuantity(menuItem.id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity === 1) {
      removeItem(menuItem.id);
    } else {
      updateQuantity(menuItem.id, quantity - 1);
    }
  };

  const handleRemove = () => {
    removeItem(menuItem.id);
  };

  const itemTotal = menuItem.price * quantity;

  return (
    <div className="flex items-center gap-4 bg-white rounded-lg p-4 shadow-sm">
      {/* Image */}
      <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
        <img
          src={menuItem.image}
          alt={menuItem.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex-grow min-w-0">
        <h3 className="font-semibold text-burger-brown truncate">{menuItem.name}</h3>
        <p className="text-sm text-gray-500">${menuItem.price.toFixed(2)} each</p>
        {specialInstructions && (
          <p className="text-xs text-gray-400 mt-1 truncate">
            Note: {specialInstructions}
          </p>
        )}
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-2">
        <button
          onClick={handleDecrement}
          className="p-1.5 rounded-full border border-gray-300 hover:border-burger-orange hover:text-burger-orange transition-colors"
          aria-label="Decrease quantity"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="w-8 text-center font-medium">{quantity}</span>
        <button
          onClick={handleIncrement}
          className="p-1.5 rounded-full border border-gray-300 hover:border-burger-orange hover:text-burger-orange transition-colors"
          aria-label="Increase quantity"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Price and Remove */}
      <div className="flex flex-col items-end gap-2">
        <span className="font-bold text-burger-orange">${itemTotal.toFixed(2)}</span>
        <button
          onClick={handleRemove}
          className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Remove item"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CartItemCard;
