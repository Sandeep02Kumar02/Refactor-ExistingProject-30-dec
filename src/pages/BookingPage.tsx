/**
 * Booking Page component
 * Table reservation page with booking form
 */

import BookingForm from '../components/booking/BookingForm';

const BookingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-burger-cream py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="section-title">Book a Table</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Reserve your spot for a memorable dining experience. We look forward to serving you!
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-3xl mx-auto">
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <span className="text-2xl mb-2 block">⏰</span>
            <h3 className="font-semibold text-burger-brown">Hours</h3>
            <p className="text-sm text-gray-600">Mon-Thu: 11am-10pm</p>
            <p className="text-sm text-gray-600">Fri-Sat: 11am-11pm</p>
            <p className="text-sm text-gray-600">Sun: 12pm-9pm</p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <span className="text-2xl mb-2 block">👥</span>
            <h3 className="font-semibold text-burger-brown">Party Size</h3>
            <p className="text-sm text-gray-600">We accommodate</p>
            <p className="text-sm text-gray-600">groups of 1-10 guests</p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <span className="text-2xl mb-2 block">📅</span>
            <h3 className="font-semibold text-burger-brown">Advance Booking</h3>
            <p className="text-sm text-gray-600">Book up to 30 days</p>
            <p className="text-sm text-gray-600">in advance</p>
          </div>
        </div>

        {/* Booking Form */}
        <BookingForm />
      </div>
    </div>
  );
};

export default BookingPage;
