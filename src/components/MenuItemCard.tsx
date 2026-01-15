import { useState } from 'react';
import { Plus, Star, Flame, Sparkles } from 'lucide-react';
import { MenuItem } from '../types';
import { useCart } from '../context/CartContext';

interface MenuItemCardProps {
  item: MenuItem;
  showDetails?: boolean;
}

function MenuItemCard({ item, showDetails = false }: MenuItemCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    setIsAdding(true);
    // Simulate a brief delay for visual feedback
    await new Promise(resolve => setTimeout(resolve, 300));
    addToCart(item, 1);
    setIsAdding(false);
  };

  return (
    <div className="card card-hover group">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {item.isPopular && (
            <span className="badge bg-yellow-400 text-yellow-900">
              <Star size={14} className="mr-1" fill="currentColor" />
              Popular
            </span>
          )}
          {item.isNew && (
            <span className="badge bg-green-500 text-white">
              <Sparkles size={14} className="mr-1" />
              New
            </span>
          )}
        </div>

        {/* Quick Add Button */}
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`absolute bottom-3 right-3 bg-primary-500 text-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-primary-600 ${
            isAdding ? 'animate-pulse' : ''
          }`}
        >
          <Plus size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg text-gray-900 group-hover:text-primary-600 transition-colors">
            {item.name}
          </h3>
          <span className="text-primary-600 font-bold text-lg">
            ${item.price.toFixed(2)}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {item.description}
        </p>

        {/* Details */}
        {showDetails && item.ingredients && (
          <div className="mb-3">
            <p className="text-xs text-gray-500 font-medium mb-1">Ingredients:</p>
            <div className="flex flex-wrap gap-1">
              {item.ingredients.slice(0, 4).map((ingredient, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                >
                  {ingredient}
                </span>
              ))}
              {item.ingredients.length > 4 && (
                <span className="text-xs text-gray-400">
                  +{item.ingredients.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          {item.calories && (
            <span className="flex items-center text-sm text-gray-500">
              <Flame size={14} className="mr-1" />
              {item.calories} cal
            </span>
          )}
          
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="btn-primary py-2 px-4 text-sm"
          >
            {isAdding ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MenuItemCard;
