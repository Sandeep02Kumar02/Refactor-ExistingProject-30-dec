/**
 * Profile Page component
 * User profile and order history
 */

import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Calendar, ShoppingBag, Clock, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useOrderStore } from '../store/orderStore';
import { useBookingStore } from '../store/bookingStore';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { orders } = useOrderStore();
  const { bookings } = useBookingStore();

  if (!isAuthenticated || !user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-burger-cream py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-24 h-24 bg-burger-orange rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-white" />
            </div>
            <div className="flex-grow text-center md:text-left">
              <h1 className="font-display font-bold text-2xl text-burger-brown mb-2">
                {user.name}
              </h1>
              <div className="space-y-1 text-gray-600">
                <p className="flex items-center justify-center md:justify-start gap-2">
                  <Mail className="w-4 h-4" />
                  {user.email}
                </p>
                {user.phone && (
                  <p className="flex items-center justify-center md:justify-start gap-2">
                    <Phone className="w-4 h-4" />
                    {user.phone}
                  </p>
                )}
                <p className="flex items-center justify-center md:justify-start gap-2">
                  <Calendar className="w-4 h-4" />
                  Member since {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order History */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="font-display font-semibold text-xl text-burger-brown mb-4 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Order History
            </h2>
            {orders.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No orders yet</p>
                <button
                  onClick={() => navigate('/menu')}
                  className="mt-4 text-burger-orange hover:underline"
                >
                  Start ordering
                </button>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="border rounded-lg p-4 hover:border-burger-orange transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-burger-brown">{order.id}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          order.status === 'confirmed'
                            ? 'bg-green-100 text-green-700'
                            : order.status === 'preparing'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {order.items.length} items · ${order.total.toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Booking History */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="font-display font-semibold text-xl text-burger-brown mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Reservations
            </h2>
            {bookings.length === 0 ? (
              <div className="text-center py-8">
                <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No reservations yet</p>
                <button
                  onClick={() => navigate('/booking')}
                  className="mt-4 text-burger-orange hover:underline"
                >
                  Book a table
                </button>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="border rounded-lg p-4 hover:border-burger-orange transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-burger-brown">{booking.id}</p>
                        <p className="text-sm text-gray-500">
                          {booking.date} at {booking.time}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          booking.status === 'confirmed'
                            ? 'bg-green-100 text-green-700'
                            : booking.status === 'cancelled'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {booking.guests} guests
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
