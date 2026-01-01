/**
 * Booking Form component
 * Handles table reservation requests
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Users, User, Mail, Phone, MessageSquare, Loader, AlertCircle, CheckCircle } from 'lucide-react';
import { useBookingStore } from '../../store/bookingStore';
import { useAuthStore } from '../../store/authStore';
import type { BookingFormData } from '../../types';

const BookingForm: React.FC = () => {
  const navigate = useNavigate();
  const { createBooking, isLoading, error, currentBooking } = useBookingStore();
  const { user, isAuthenticated } = useAuthStore();

  const [formData, setFormData] = useState<BookingFormData>({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    date: '',
    time: '',
    guests: 2,
    specialRequests: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];
  
  // Get maximum date (30 days from now)
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  // Available time slots
  const timeSlots = [
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '17:00', '17:30', '18:00', '18:30',
    '19:00', '19:30', '20:00', '20:30', '21:00',
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'guests' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createBooking(formData);
      setIsSubmitted(true);
    } catch {
      // Error is handled by the store
    }
  };

  if (isSubmitted && currentBooking) {
    return (
      <div className="w-full max-w-lg mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="font-display font-bold text-2xl text-burger-brown mb-2">
            Booking Confirmed!
          </h2>
          <p className="text-gray-600 mb-6">
            Your table has been reserved. We look forward to seeing you!
          </p>

          <div className="bg-gray-50 rounded-lg p-4 text-left mb-6">
            <h3 className="font-semibold text-burger-brown mb-3">Reservation Details</h3>
            <div className="space-y-2 text-sm">
              <p><span className="text-gray-500">Confirmation #:</span> {currentBooking.id}</p>
              <p><span className="text-gray-500">Date:</span> {currentBooking.date}</p>
              <p><span className="text-gray-500">Time:</span> {currentBooking.time}</p>
              <p><span className="text-gray-500">Guests:</span> {currentBooking.guests}</p>
              <p><span className="text-gray-500">Name:</span> {currentBooking.userName}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate('/menu')}
              className="btn-primary flex-1"
            >
              View Menu
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
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <span className="text-4xl">🍽️</span>
          <h2 className="font-display font-bold text-2xl text-burger-brown mt-4">
            Reserve a Table
          </h2>
          <p className="text-gray-600 mt-2">Book your dining experience with us</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="input-field pl-10"
                placeholder="John Doe"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input-field pl-10"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="input-field pl-10"
                placeholder="(555) 123-4567"
              />
            </div>
          </div>

          {/* Date and Time Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Date *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={today}
                  max={maxDateStr}
                  required
                  className="input-field pl-10"
                />
              </div>
            </div>

            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                Time *
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="input-field pl-10 appearance-none"
                >
                  <option value="">Select time</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Guests */}
          <div>
            <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
              Number of Guests *
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                required
                className="input-field pl-10 appearance-none"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Special Requests */}
          <div>
            <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-1">
              Special Requests (Optional)
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <textarea
                id="specialRequests"
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                rows={3}
                className="input-field pl-10 resize-none"
                placeholder="Any special requests or dietary requirements..."
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary flex items-center justify-center space-x-2 mt-6"
          >
            {isLoading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Booking...</span>
              </>
            ) : (
              <span>Reserve Table</span>
            )}
          </button>
        </form>

        {!isAuthenticated && (
          <p className="mt-4 text-center text-sm text-gray-500">
            <a href="/login" className="text-burger-orange hover:underline">
              Sign in
            </a>{' '}
            to save your bookings and auto-fill your details
          </p>
        )}
      </div>
    </div>
  );
};

export default BookingForm;
