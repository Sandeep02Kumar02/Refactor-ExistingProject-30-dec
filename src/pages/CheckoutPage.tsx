/**
 * Checkout Page component
 * Handles order completion with order type selection and confirmation
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, ShoppingBag, Clock, CheckCircle, Loader, ArrowLeft, AlertCircle } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useOrderStore } from '../store/orderStore';
import { useAuthStore } from '../store/authStore';
import type { OrderType } from '../types';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, getSubtotal, getTax, getTotal, clearCart } = useCartStore();
  const { createOrder, isLoading, error, currentOrder } = useOrderStore();
  const { user, isAuthenticated } = useAuthStore();

  const [orderType, setOrderType] = useState<OrderType>('pickup');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const subtotal = getSubtotal();
  const tax = getTax();
  const total = getTotal();

  if (items.length === 0 && !isSubmitted) {
    return (
      <div className="min-h-screen bg-burger-cream py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-xl shadow-lg p-12">
            <ShoppingBag className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <h2 className="font-display font-bold text-2xl text-burger-brown mb-4">
              Your Cart is Empty
            </h2>
            <p className="text-gray-600 mb-8">
              Add some delicious items to your cart before checkout.
            </p>
            <Link to="/menu" className="btn-primary">
              Browse Menu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (orderType === 'delivery' && !deliveryAddress.trim()) {
      return;
    }

    try {
      await createOrder({
        userId: user?.id || 'guest',
        items,
        subtotal,
        tax,
        total,
        orderType,
        deliveryAddress: orderType === 'delivery' ? deliveryAddress : undefined,
        specialInstructions: specialInstructions || undefined,
      });
      clearCart();
      setIsSubmitted(true);
    } catch {
      // Error is handled by the store
    }
  };

  if (isSubmitted && currentOrder) {
    return (
      <div className="min-h-screen bg-burger-cream py-12">
        <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="font-display font-bold text-2xl text-burger-brown mb-2">
              Order Confirmed!
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for your order. We're preparing it now!
            </p>

            <div className="bg-gray-50 rounded-lg p-4 text-left mb-6">
              <h3 className="font-semibold text-burger-brown mb-3">Order Details</h3>
              <div className="space-y-2 text-sm">
                <p><span className="text-gray-500">Order #:</span> {currentOrder.id}</p>
                <p><span className="text-gray-500">Type:</span> {currentOrder.orderType === 'pickup' ? 'Pickup' : currentOrder.orderType === 'delivery' ? 'Delivery' : 'Dine-in'}</p>
                <p><span className="text-gray-500">Total:</span> ${currentOrder.total.toFixed(2)}</p>
                <p><span className="text-gray-500">Estimated Time:</span> {currentOrder.estimatedTime} minutes</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate('/menu')}
                className="btn-primary flex-1"
              >
                Order More
              </button>
              <button
                onClick={() => navigate('/')}
                className="btn-secondary flex-1"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-burger-cream py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          to="/cart"
          className="inline-flex items-center space-x-2 text-burger-brown hover:text-burger-orange mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Cart</span>
        </Link>

        <h1 className="font-display font-bold text-3xl text-burger-brown mb-8">
          Checkout
        </h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-red-600">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Options */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Type Selection */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="font-display font-semibold text-xl text-burger-brown mb-4">
                  Order Type
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { type: 'pickup' as const, icon: ShoppingBag, label: 'Pickup', time: '20 min' },
                    { type: 'delivery' as const, icon: MapPin, label: 'Delivery', time: '45 min' },
                    { type: 'dine-in' as const, icon: Clock, label: 'Dine-In', time: '15 min' },
                  ].map(({ type, icon: Icon, label, time }) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setOrderType(type)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        orderType === type
                          ? 'border-burger-orange bg-orange-50'
                          : 'border-gray-200 hover:border-burger-orange'
                      }`}
                    >
                      <Icon className={`w-8 h-8 mx-auto mb-2 ${
                        orderType === type ? 'text-burger-orange' : 'text-gray-400'
                      }`} />
                      <p className="font-semibold text-burger-brown">{label}</p>
                      <p className="text-sm text-gray-500">~{time}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Delivery Address */}
              {orderType === 'delivery' && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="font-display font-semibold text-xl text-burger-brown mb-4">
                    Delivery Address
                  </h2>
                  <textarea
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    required
                    rows={3}
                    className="input-field resize-none"
                    placeholder="Enter your full delivery address..."
                  />
                </div>
              )}

              {/* Special Instructions */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="font-display font-semibold text-xl text-burger-brown mb-4">
                  Special Instructions (Optional)
                </h2>
                <textarea
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  rows={3}
                  className="input-field resize-none"
                  placeholder="Any special requests or dietary requirements..."
                />
              </div>

              {!isAuthenticated && (
                <div className="bg-burger-yellow/20 rounded-lg p-4">
                  <p className="text-burger-brown text-sm">
                    <Link to="/login" className="font-semibold text-burger-orange hover:underline">
                      Sign in
                    </Link>{' '}
                    to save your orders and earn rewards on future purchases!
                  </p>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                <h2 className="font-display font-semibold text-xl text-burger-brown mb-4">
                  Order Summary
                </h2>

                {/* Items */}
                <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.menuItem.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.quantity}x {item.menuItem.name}
                      </span>
                      <span className="text-gray-800">
                        ${(item.menuItem.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <hr className="my-4" />

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  {orderType === 'delivery' && (
                    <div className="flex justify-between text-gray-600">
                      <span>Delivery Fee</span>
                      <span>$3.99</span>
                    </div>
                  )}
                  <hr />
                  <div className="flex justify-between font-bold text-lg text-burger-brown">
                    <span>Total</span>
                    <span>${(total + (orderType === 'delivery' ? 3.99 : 0)).toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-primary flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>Placing Order...</span>
                    </>
                  ) : (
                    <span>Place Order</span>
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  By placing your order, you agree to our terms of service.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
