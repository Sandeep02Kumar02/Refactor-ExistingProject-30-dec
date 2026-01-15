import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Clock, CheckCircle, Truck, Package, XCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import type { Order, OrderStatus } from '../types';

/**
 * OrdersPage component - View order history and status.
 */
const OrdersPage: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  /**
   * Load orders from local storage on mount.
   */
  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('burger_palace_orders') || '[]');
    // Filter orders for current user and sort by date (newest first)
    const userOrders = storedOrders
      .filter((order: Order) => order.userId === user?.id)
      .sort((a: Order, b: Order) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    setOrders(userOrders);
  }, [user]);

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
   * Format date for display.
   */
  const formatDate = (dateStr: string): string => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  /**
   * Get status icon and color.
   */
  const getStatusInfo = (status: OrderStatus): { icon: React.ReactNode; color: string; label: string } => {
    const statusMap: Record<OrderStatus, { icon: React.ReactNode; color: string; label: string }> = {
      pending: { icon: <Clock className="h-4 w-4" />, color: 'text-yellow-600 bg-yellow-100', label: 'Pending' },
      confirmed: { icon: <CheckCircle className="h-4 w-4" />, color: 'text-blue-600 bg-blue-100', label: 'Confirmed' },
      preparing: { icon: <Package className="h-4 w-4" />, color: 'text-orange-600 bg-orange-100', label: 'Preparing' },
      ready: { icon: <CheckCircle className="h-4 w-4" />, color: 'text-green-600 bg-green-100', label: 'Ready' },
      'out-for-delivery': { icon: <Truck className="h-4 w-4" />, color: 'text-purple-600 bg-purple-100', label: 'Out for Delivery' },
      delivered: { icon: <CheckCircle className="h-4 w-4" />, color: 'text-green-600 bg-green-100', label: 'Delivered' },
      completed: { icon: <CheckCircle className="h-4 w-4" />, color: 'text-green-600 bg-green-100', label: 'Completed' },
      cancelled: { icon: <XCircle className="h-4 w-4" />, color: 'text-red-600 bg-red-100', label: 'Cancelled' },
    };
    return statusMap[status] || statusMap.pending;
  };

  /**
   * Toggle order details expansion.
   */
  const toggleOrder = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  // Empty state
  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container-custom py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="text-8xl mb-6">📦</div>
            <h1 className="text-2xl font-display font-bold text-gray-900 mb-4">
              No Orders Yet
            </h1>
            <p className="text-gray-600 mb-8">
              You haven't placed any orders yet. Start by browsing our delicious menu!
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
            My Orders
          </h1>
          <p className="text-gray-600 mt-2">
            View your order history and track current orders
          </p>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="max-w-3xl mx-auto space-y-4">
          {orders.map(order => {
            const statusInfo = getStatusInfo(order.status);
            const isExpanded = expandedOrder === order.id;

            return (
              <div key={order.id} className="card overflow-hidden">
                {/* Order Header */}
                <button
                  onClick={() => toggleOrder(order.id)}
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="font-mono text-sm text-gray-500">
                        {order.id}
                      </p>
                      <p className="font-semibold text-gray-900 text-left">
                        {formatPrice(order.total)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className={`badge ${statusInfo.color} flex items-center`}>
                      {statusInfo.icon}
                      <span className="ml-1">{statusInfo.label}</span>
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </button>

                {/* Order Details */}
                {isExpanded && (
                  <div className="border-t border-gray-100 p-4 bg-gray-50">
                    {/* Order Info */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Order Date</p>
                        <p className="font-medium">{formatDate(order.createdAt)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Order Type</p>
                        <p className="font-medium capitalize">{order.orderType}</p>
                      </div>
                    </div>

                    {/* Delivery Address */}
                    {order.deliveryAddress && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-500">Delivery Address</p>
                        <p className="font-medium">{order.deliveryAddress}</p>
                      </div>
                    )}

                    {/* Items */}
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-2">Items</p>
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex justify-between text-sm bg-white rounded p-2"
                          >
                            <span>
                              {item.quantity}x {item.menuItem.name}
                            </span>
                            <span className="font-medium">
                              {formatPrice(item.menuItem.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Special Instructions */}
                    {order.specialInstructions && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-500">Special Instructions</p>
                        <p className="text-sm italic">{order.specialInstructions}</p>
                      </div>
                    )}

                    {/* Order Totals */}
                    <div className="border-t border-gray-200 pt-4 space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Subtotal</span>
                        <span>{formatPrice(order.subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Tax</span>
                        <span>{formatPrice(order.tax)}</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>{formatPrice(order.total)}</span>
                      </div>
                    </div>

                    {/* Estimated Time */}
                    {order.estimatedReadyTime && order.status !== 'completed' && order.status !== 'cancelled' && (
                      <div className="mt-4 flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>
                          Estimated ready: {new Date(order.estimatedReadyTime).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
