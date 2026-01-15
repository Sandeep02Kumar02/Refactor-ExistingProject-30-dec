import { useState } from 'react';
import { Calendar, Clock, Users, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { BookingFormData, TimeSlot } from '../types';

// Available time slots
const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const startHour = 11;
  const endHour = 21;
  
  for (let hour = startHour; hour <= endHour; hour++) {
    for (const minute of [0, 30]) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      // Simulate some slots being unavailable
      const available = Math.random() > 0.2;
      slots.push({ time, available });
    }
  }
  
  return slots;
};

const partySizes = [1, 2, 3, 4, 5, 6, 7, 8, 'Large Party (9+)'];

function BookingPage() {
  const { user, isAuthenticated } = useAuth();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timeSlots] = useState<TimeSlot[]>(generateTimeSlots);
  
  const [formData, setFormData] = useState<BookingFormData>({
    guestName: user?.name || '',
    guestEmail: user?.email || '',
    guestPhone: user?.phone || '',
    date: '',
    time: '',
    partySize: 2,
    specialRequests: '',
  });

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];
  
  // Get maximum date (30 days from now)
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleTimeSelect = (time: string) => {
    setFormData(prev => ({ ...prev, time }));
    setError(null);
  };

  const handlePartySizeSelect = (size: number | string) => {
    if (typeof size === 'number') {
      setFormData(prev => ({ ...prev, partySize: size }));
    } else {
      // For large parties, set to 9 and show a note
      setFormData(prev => ({ ...prev, partySize: 9 }));
    }
    setError(null);
  };

  const validateStep = (currentStep: number): boolean => {
    switch (currentStep) {
      case 1:
        if (!formData.date) {
          setError('Please select a date');
          return false;
        }
        if (!formData.time) {
          setError('Please select a time');
          return false;
        }
        return true;
      case 2:
        if (!formData.partySize) {
          setError('Please select party size');
          return false;
        }
        return true;
      case 3:
        if (!formData.guestName.trim()) {
          setError('Please enter your name');
          return false;
        }
        if (!formData.guestEmail.trim()) {
          setError('Please enter your email');
          return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.guestEmail)) {
          setError('Please enter a valid email');
          return false;
        }
        if (!formData.guestPhone.trim()) {
          setError('Please enter your phone number');
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(step)) return;
    
    setIsSubmitting(true);
    setError(null);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate success
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container-custom">
          <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-green-500" size={40} />
            </div>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
              Reservation Confirmed!
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for your reservation, {formData.guestName}!
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
              <h3 className="font-semibold text-gray-900 mb-4">Booking Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">
                    {new Date(formData.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-medium">{formData.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Party Size:</span>
                  <span className="font-medium">{formData.partySize} {formData.partySize === 1 ? 'Guest' : 'Guests'}</span>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-gray-500 mb-6">
              A confirmation email has been sent to {formData.guestEmail}
            </p>
            
            <button
              onClick={() => {
                setIsSuccess(false);
                setStep(1);
                setFormData({
                  guestName: user?.name || '',
                  guestEmail: user?.email || '',
                  guestPhone: user?.phone || '',
                  date: '',
                  time: '',
                  partySize: 2,
                  specialRequests: '',
                });
              }}
              className="btn-primary"
            >
              Make Another Reservation
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-12">
        <div className="container-custom">
          <h1 className="text-4xl font-display font-bold mb-4">Book a Table</h1>
          <p className="text-primary-100 max-w-2xl">
            Reserve your table for a memorable dining experience. Whether it's a casual
            meal or a special celebration, we're ready to serve you.
          </p>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="bg-white border-b">
        <div className="container-custom py-6">
          <div className="flex justify-center">
            <div className="flex items-center space-x-4 md:space-x-8">
              {['Date & Time', 'Party Size', 'Your Details'].map((label, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step > index + 1
                        ? 'bg-green-500 text-white'
                        : step === index + 1
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step > index + 1 ? '✓' : index + 1}
                  </div>
                  <span
                    className={`ml-2 text-sm hidden sm:inline ${
                      step >= index + 1 ? 'text-gray-900 font-medium' : 'text-gray-500'
                    }`}
                  >
                    {label}
                  </span>
                  {index < 2 && (
                    <div
                      className={`w-12 md:w-20 h-1 ml-4 rounded ${
                        step > index + 1 ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-12">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit}>
              {/* Error Message */}
              {error && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
                  <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
                  <p className="text-red-700">{error}</p>
                </div>
              )}

              {/* Step 1: Date & Time */}
              {step === 1 && (
                <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 animate-fade-in">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    <Calendar className="text-primary-500" />
                    Select Date & Time
                  </h2>

                  {/* Date Picker */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      min={today}
                      max={maxDateStr}
                      className="input-field"
                    />
                  </div>

                  {/* Time Slots */}
                  {formData.date && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Available Times
                      </label>
                      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot.time}
                            type="button"
                            onClick={() => slot.available && handleTimeSelect(slot.time)}
                            disabled={!slot.available}
                            className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                              formData.time === slot.time
                                ? 'bg-primary-500 text-white'
                                : slot.available
                                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                : 'bg-gray-50 text-gray-300 cursor-not-allowed'
                            }`}
                          >
                            {slot.time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: Party Size */}
              {step === 2 && (
                <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 animate-fade-in">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    <Users className="text-primary-500" />
                    Party Size
                  </h2>

                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                    {partySizes.map((size) => (
                      <button
                        key={size.toString()}
                        type="button"
                        onClick={() => handlePartySizeSelect(size)}
                        className={`py-4 px-3 rounded-lg font-medium transition-colors ${
                          formData.partySize === (typeof size === 'number' ? size : 9)
                            ? 'bg-primary-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        } ${typeof size === 'string' ? 'col-span-3 sm:col-span-2' : ''}`}
                      >
                        {typeof size === 'number' ? (
                          <>
                            <Users className="inline mr-1\" size={16} />
                            {size}
                          </>
                        ) : (
                          size
                        )}
                      </button>
                    ))}
                  </div>

                  {formData.partySize >= 9 && (
                    <p className="mt-4 text-sm text-gray-600 bg-yellow-50 p-3 rounded-lg">
                      For parties of 9 or more, please call us at (555) 123-4567 for special arrangements.
                    </p>
                  )}
                </div>
              )}

              {/* Step 3: Contact Details */}
              {step === 3 && (
                <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 animate-fade-in">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Your Details
                  </h2>

                  {!isAuthenticated && (
                    <p className="mb-6 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                      <a href="/login" className="text-primary-600 font-medium hover:underline">
                        Sign in
                      </a>
                      {' '}to auto-fill your details and track your reservations.
                    </p>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="guestName"
                        value={formData.guestName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="guestEmail"
                        value={formData.guestEmail}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="guestPhone"
                        value={formData.guestPhone}
                        onChange={handleInputChange}
                        placeholder="(555) 123-4567"
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Special Requests (optional)
                      </label>
                      <textarea
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleInputChange}
                        placeholder="Any dietary requirements, celebrations, seating preferences..."
                        rows={3}
                        className="input-field"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="mt-6 flex justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="btn-secondary"
                  >
                    Back
                  </button>
                ) : (
                  <div />
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="btn-primary"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Confirming...
                      </>
                    ) : (
                      <>
                        <CheckCircle size={20} />
                        Confirm Reservation
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Booking Summary */}
              {step === 3 && (
                <div className="mt-8 bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Booking Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-gray-400" />
                      <span>
                        {formData.date && new Date(formData.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-gray-400" />
                      <span>{formData.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-gray-400" />
                      <span>{formData.partySize} {formData.partySize === 1 ? 'Guest' : 'Guests'}</span>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BookingPage;
