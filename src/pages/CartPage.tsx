import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

/**
 * CartPage component - Displays shopping cart with items and checkout button.
 */
const CartPage: React.FC = () => {
  const { cart, updateQuantity, removeItem, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

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
   * Handle proceed to checkout.
   */
  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate('/checkout');
    } else {
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
    }
  };

  /**
   * Get placeholder image based on category.
   */
  const getPlaceholderImage = (category: string): string => {
    const categoryImages: Record<string, string> = {
      burgers: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop',
      sides: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=100&h=100&fit=crop',
      drinks: 'https://images.unsplash.com/photo-1437418747212-8d9709afab22?w=100&h=100&fit=crop',
      desserts: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=100&h=100&fit=crop',
      combos: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=100&h=100&fit=crop',
    };
    return categoryImages[category] || categoryImages.burgers;
  };

  // Empty cart state
  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container-custom py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="text-8xl mb-6">🛒</div>
            <h1 className="text-2xl font-display font-bold text-gray-900 mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any delicious burgers yet.
              Browse our menu to get started!
            </p>
            <Link to="/menu" className="btn-primary btn-lg inline-flex items-center">
              <ShoppingBag className="h-5 w-5 mr-2" />
              Browse Menu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container-custom py-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900">
            Your Cart
          </h1>
          <p className="text-gray-600 mt-2">
            {cart.items.length} item{cart.items.length !== 1 ? 's' : ''} in your cart
          </p>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map(item => (
              <div key={item.menuItem.id} className="card p-4">
                <div className="flex gap-4">
                  {/* Item Image */}
                  <img
                    src={getPlaceholderImage(item.menuItem.category)}
                    alt={item.menuItem.name}
                    className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                  />

                  {/* Item Details */}
                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {item.menuItem.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {formatPrice(item.menuItem.price)} each
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.menuItem.id)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                        aria-label={`Remove ${item.menuItem.name} from cart`}
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.menuItem.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-100 transition-colors rounded-l-lg"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4 py-2 font-medium text-gray-900 min-w-[48px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100 transition-colors rounded-r-lg"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <p className="font-semibold text-primary-600">
                        {formatPrice(item.menuItem.price * item.quantity)}
                      </p>
                    </div>

                    {/* Special Instructions */}
                    {item.specialInstructions && (
                      <p className="mt-2 text-sm text-gray-500 italic">
                        Note: {item.specialInstructions}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Clear Cart Button */}
            <div className="flex justify-end">
              <button
                onClick={clearCart}
                className="btn-secondary text-sm"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(cart.subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (8.5%)</span>
                  <span>{formatPrice(cart.tax)}</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between text-lg font-semibold text-gray-900">
                  <span>Total</span>
                  <span>{formatPrice(cart.total)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="btn-primary btn-lg w-full flex items-center justify-center"
              >
                Proceed to Checkout
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>

              {!isAuthenticated && (
                <p className="mt-4 text-sm text-gray-500 text-center">
                  You'll need to log in to complete your order.
                </p>
              )}

              <Link
                to="/menu"
                className="btn-secondary w-full mt-4 text-center block"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
