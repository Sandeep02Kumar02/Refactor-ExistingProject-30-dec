import React from 'react';
import { Plus, Star, Sparkles } from 'lucide-react';
import type { MenuItem } from '../types';
import { useCart } from '../context/CartContext';

/**
 * Props for MenuItemCard component.
 */
interface MenuItemCardProps {
  item: MenuItem;
  showFullDescription?: boolean;
}

/**
 * MenuItemCard component displays a single menu item.
 * Shows image, name, description, price, and add to cart button.
 * 
 * @param item - Menu item to display
 * @param showFullDescription - Whether to show full or truncated description
 */
const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, showFullDescription = false }) => {
  const { addItem, isItemInCart, getItemQuantity } = useCart();
  const inCart = isItemInCart(item.id);
  const quantity = getItemQuantity(item.id);

  /**
   * Handle adding item to cart.
   */
  const handleAddToCart = () => {
    addItem(item, 1);
  };

  /**
   * Format price to USD currency.
   */
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  /**
   * Get placeholder image based on category.
   */
  const getPlaceholderImage = (): string => {
    const categoryImages: Record<string, string> = {
      burgers: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
      sides: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop',
      drinks: 'https://images.unsplash.com/photo-1437418747212-8d9709afab22?w=400&h=300&fit=crop',
      desserts: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop',
      combos: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=300&fit=crop',
    };
    return categoryImages[item.category] || categoryImages.burgers;
  };

  return (
    <div className="card group">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={getPlaceholderImage()}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {item.isPopular && (
            <span className="badge bg-yellow-500 text-white">
              <Star className="h-3 w-3 mr-1" />
              Popular
            </span>
          )}
          {item.isNew && (
            <span className="badge bg-green-500 text-white">
              <Sparkles className="h-3 w-3 mr-1" />
              New
            </span>
          )}
        </div>

        {/* Cart Quantity Badge */}
        {inCart && (
          <div className="absolute top-2 right-2">
            <span className="badge bg-primary-600 text-white">
              {quantity} in cart
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="card-body">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {item.name}
          </h3>
          <span className="text-lg font-bold text-primary-600 whitespace-nowrap ml-2">
            {formatPrice(item.price)}
          </span>
        </div>

        <p className={`text-sm text-gray-600 mb-4 ${showFullDescription ? '' : 'line-clamp-2'}`}>
          {item.description}
        </p>

        {/* Calories */}
        {item.calories && (
          <p className="text-xs text-gray-500 mb-3">
            {item.calories} cal
          </p>
        )}

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className={`w-full btn ${inCart ? 'btn-secondary' : 'btn-primary'} flex items-center justify-center`}
        >
          <Plus className="h-4 w-4 mr-1" />
          {inCart ? 'Add Another' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default MenuItemCard;
