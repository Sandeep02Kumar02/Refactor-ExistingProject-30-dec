import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, CheckCircle, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import type { OrderType } from '../types';

/**
 * CheckoutPage component - Order placement with delivery/pickup options.
 */
const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  
  const [orderType, setOrderType] = useState<OrderType>('pickup');
  const [deliveryAddress, setDeliveryAddress] = useState(user?.address || '');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

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
   * Validate form before submission.
   */
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (orderType === 'delivery' && !deliveryAddress.trim()) {
      newErrors.address = 'Delivery address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle order submission.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Generate order ID
      const newOrderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
      
      // Save order to local storage
      const order = {
        id: newOrderId,
        userId: user?.id,
        items: cart.items,
        subtotal: cart.subtotal,
        tax: cart.tax,
        total: cart.total,
        status: 'confirmed',
        orderType,
        deliveryAddress: orderType === 'delivery' ? deliveryAddress : undefined,
        specialInstructions: specialInstructions || undefined,
        createdAt: new Date().toISOString(),
        estimatedReadyTime: new Date(Date.now() + 30 * 60000).toISOString(),
      };

      // Get existing orders
      const existingOrders = JSON.parse(localStorage.getItem('burger_palace_orders') || '[]');
      localStorage.setItem('burger_palace_orders', JSON.stringify([...existingOrders, order]));

      setOrderId(newOrderId);
      setOrderPlaced(true);
      clearCart();
    } catch (error) {
      console.error('Order submission error:', error);
      setErrors({ submit: 'Failed to place order. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Order confirmation screen
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto p-6">
          <div className="card p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-display font-bold text-gray-900 mb-2">
              Order Confirmed!
            </h1>
            <p className="text-gray-600 mb-4">
              Your order has been placed successfully.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-500 mb-1">Order Number</p>
              <p className="text-xl font-semibold text-primary-600">{orderId}</p>
            </div>
            <div className="flex items-center justify-center text-gray-600 mb-6">
              <Clock className="h-5 w-5 mr-2" />
              <span>Estimated ready time: 25-30 minutes</span>
            </div>
            <button
              onClick={() => navigate('/orders')}
              className="btn-primary w-full mb-3"
            >
              View My Orders
            </button>
            <button
              onClick={() => navigate('/menu')}
              className="btn-secondary w-full"
            >
              Order More
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Redirect if cart is empty
  if (cart.items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container-custom py-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900">
            Checkout
          </h1>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Order Type Selection */}
              <div className="card p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Order Type
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setOrderType('pickup')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      orderType === 'pickup'
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-center">
                      <span className="text-2xl mb-2 block">🏪</span>
                      <span className={`font-medium ${orderType === 'pickup' ? 'text-primary-600' : 'text-gray-700'}`}>
                        Pickup
                      </span>
                      <p className="text-sm text-gray-500 mt-1">
                        Ready in 15-20 min
                      </p>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      orderType === 'delivery'
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-center">
                      <span className="text-2xl mb-2 block">🚗</span>
                      <span className={`font-medium ${orderType === 'delivery' ? 'text-primary-600' : 'text-gray-700'}`}>
                        Delivery
                      </span>
                      <p className="text-sm text-gray-500 mt-1">
                        30-45 min
                      </p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Delivery Address (conditional) */}
              {orderType === 'delivery' && (
                <div className="card p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    <MapPin className="inline-block h-5 w-5 mr-2" />
                    Delivery Address
                  </h2>
                  <div>
                    <textarea
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="Enter your full delivery address..."
                      className={`input min-h-[100px] ${errors.address ? 'input-error' : ''}`}
                      rows={3}
                    />
                    {errors.address && (
                      <p className="error-message">{errors.address}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Pickup Location (conditional) */}
              {orderType === 'pickup' && (
                <div className="card p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    <MapPin className="inline-block h-5 w-5 mr-2" />
                    Pickup Location
                  </h2>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-medium text-gray-900">Burger Palace</p>
                    <p className="text-gray-600">123 Burger Street</p>
                    <p className="text-gray-600">Foodie City, FC 12345</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Open: 11am - 10pm
                    </p>
                  </div>
                </div>
              )}

              {/* Special Instructions */}
              <div className="card p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Special Instructions
                </h2>
                <textarea
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="Any special requests or dietary requirements..."
                  className="input"
                  rows={3}
                />
              </div>

              {/* Contact Information */}
              <div className="card p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Contact Information
                </h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="font-medium text-gray-900">{user?.name}</p>
                  <p className="text-gray-600">{user?.email}</p>
                  {user?.phone && (
                    <p className="text-gray-600">{user.phone}</p>
                  )}
                </div>
              </div>

              {/* Error Message */}
              {errors.submit && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-700">{errors.submit}</p>
                </div>
              )}
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>

              {/* Items List */}
              <div className="space-y-3 mb-6">
                {cart.items.map(item => (
                  <div key={item.menuItem.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.quantity}x {item.menuItem.name}
                    </span>
                    <span className="text-gray-900">
                      {formatPrice(item.menuItem.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <hr className="border-gray-200 mb-4" />

              {/* Totals */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(cart.subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (8.5%)</span>
                  <span>{formatPrice(cart.tax)}</span>
                </div>
                {orderType === 'delivery' && (
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span>{cart.subtotal >= 30 ? 'FREE' : formatPrice(4.99)}</span>
                  </div>
                )}
                <hr className="border-gray-200" />
                <div className="flex justify-between text-lg font-semibold text-gray-900">
                  <span>Total</span>
                  <span>
                    {formatPrice(
                      cart.total + (orderType === 'delivery' && cart.subtotal < 30 ? 4.99 : 0)
                    )}
                  </span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="btn-primary btn-lg w-full flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Placing Order...
                  </>
                ) : (
                  `Place Order - ${formatPrice(cart.total + (orderType === 'delivery' && cart.subtotal < 30 ? 4.99 : 0))}`
                )}
              </button>

              {orderType === 'delivery' && cart.subtotal < 30 && (
                <p className="mt-4 text-sm text-gray-500 text-center">
                  Add {formatPrice(30 - cart.subtotal)} more for free delivery!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
