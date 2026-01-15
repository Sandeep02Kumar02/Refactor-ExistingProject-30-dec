import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Users, CheckCircle, Loader2, Phone, Mail, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import type { BookingFormData } from '../types';

/**
 * Available time slots for reservations.
 */
const TIME_SLOTS = [
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
  '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM',
  '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM',
];

/**
 * Party size options.
 */
const PARTY_SIZES = [1, 2, 3, 4, 5, 6, 7, 8];

/**
 * BookingPage component - Table reservation form.
 */
const BookingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState<BookingFormData>({
    date: '',
    time: '',
    partySize: 2,
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    specialRequests: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  /**
   * Get minimum date (today).
   */
  const getMinDate = (): string => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  /**
   * Get maximum date (30 days from now).
   */
  const getMaxDate = (): string => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    return maxDate.toISOString().split('T')[0];
  };

  /**
   * Handle input change.
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'partySize' ? parseInt(value, 10) : value,
    }));
    // Clear error when field is modified
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  /**
   * Validate form before submission.
   */
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.date) {
      newErrors.date = 'Please select a date';
    }

    if (!formData.time) {
      newErrors.time = 'Please select a time';
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission.
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

      // Generate booking ID
      const newBookingId = `BK-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

      // Save booking to local storage
      const booking = {
        id: newBookingId,
        userId: user?.id,
        ...formData,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      };

      const existingBookings = JSON.parse(localStorage.getItem('burger_palace_bookings') || '[]');
      localStorage.setItem('burger_palace_bookings', JSON.stringify([...existingBookings, booking]));

      setBookingId(newBookingId);
      setBookingConfirmed(true);
    } catch (error) {
      console.error('Booking error:', error);
      setErrors({ submit: 'Failed to book table. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Format date for display.
   */
  const formatDate = (dateStr: string): string => {
    if (!dateStr) return '';
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Booking confirmation screen
  if (bookingConfirmed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="max-w-md w-full mx-auto px-4">
          <div className="card p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-display font-bold text-gray-900 mb-2">
              Reservation Confirmed!
            </h1>
            <p className="text-gray-600 mb-6">
              Your table has been successfully reserved.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <p className="text-sm text-gray-500 mb-1">Confirmation Number</p>
              <p className="text-lg font-semibold text-primary-600 mb-4">{bookingId}</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                  <span>{formatDate(formData.date)}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-400 mr-2" />
                  <span>{formData.time}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 text-gray-400 mr-2" />
                  <span>{formData.partySize} {formData.partySize === 1 ? 'guest' : 'guests'}</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-500 mb-6">
              A confirmation email has been sent to {formData.email}
            </p>

            <button
              onClick={() => navigate('/menu')}
              className="btn-primary w-full mb-3"
            >
              View Menu
            </button>
            <button
              onClick={() => navigate('/')}
              className="btn-secondary w-full"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary-600 text-white py-12">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Book a Table
          </h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Reserve your spot for a delicious dine-in experience at Burger Palace.
            We can't wait to serve you!
          </p>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Date and Time Selection */}
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                <Calendar className="inline-block h-5 w-5 mr-2" />
                Select Date & Time
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Date */}
                <div>
                  <label htmlFor="date" className="label">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={getMinDate()}
                    max={getMaxDate()}
                    className={`input ${errors.date ? 'input-error' : ''}`}
                  />
                  {errors.date && <p className="error-message">{errors.date}</p>}
                </div>

                {/* Time */}
                <div>
                  <label htmlFor="time" className="label">
                    Time
                  </label>
                  <select
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className={`input ${errors.time ? 'input-error' : ''}`}
                  >
                    <option value="">Select a time</option>
                    {TIME_SLOTS.map(slot => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                  {errors.time && <p className="error-message">{errors.time}</p>}
                </div>
              </div>
            </div>

            {/* Party Size */}
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                <Users className="inline-block h-5 w-5 mr-2" />
                Party Size
              </h2>

              <div className="flex flex-wrap gap-2">
                {PARTY_SIZES.map(size => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, partySize: size }))}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      formData.partySize === size
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {size} {size === 1 ? 'Guest' : 'Guests'}
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-3">
                For parties larger than 8, please call us at (555) 123-4567
              </p>
            </div>

            {/* Contact Information */}
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Contact Information
              </h2>

              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="label">
                    <User className="inline-block h-4 w-4 mr-1" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={`input ${errors.name ? 'input-error' : ''}`}
                  />
                  {errors.name && <p className="error-message">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="label">
                    <Mail className="inline-block h-4 w-4 mr-1" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={`input ${errors.email ? 'input-error' : ''}`}
                  />
                  {errors.email && <p className="error-message">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="label">
                    <Phone className="inline-block h-4 w-4 mr-1" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(555) 123-4567"
                    className={`input ${errors.phone ? 'input-error' : ''}`}
                  />
                  {errors.phone && <p className="error-message">{errors.phone}</p>}
                </div>
              </div>

              {isAuthenticated && (
                <p className="text-sm text-gray-500 mt-4">
                  ✓ Logged in as {user?.name}
                </p>
              )}
            </div>

            {/* Special Requests */}
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Special Requests
              </h2>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                placeholder="Any special requests? (e.g., high chair, wheelchair accessible, birthday celebration)"
                className="input"
                rows={3}
              />
            </div>

            {/* Error Message */}
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700">{errors.submit}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary btn-lg w-full flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Booking...
                </>
              ) : (
                <>
                  <Calendar className="h-5 w-5 mr-2" />
                  Confirm Reservation
                </>
              )}
            </button>

            <p className="text-sm text-gray-500 text-center">
              By booking, you agree to our reservation policy.
              Cancellations must be made at least 2 hours in advance.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
