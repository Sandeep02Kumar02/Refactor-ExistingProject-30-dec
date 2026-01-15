import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

/**
 * NotFoundPage component - 404 error page.
 */
const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full text-center">
        {/* Burger Emoji */}
        <div className="text-8xl mb-6 animate-bounce">🍔</div>

        {/* Error Code */}
        <h1 className="text-6xl font-display font-bold text-primary-600 mb-4">
          404
        </h1>

        {/* Message */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          Looks like this page got lost on its way to the grill.
          Let's get you back to some delicious burgers!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="btn-primary btn-lg inline-flex items-center justify-center"
          >
            <Home className="h-5 w-5 mr-2" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn-secondary btn-lg inline-flex items-center justify-center"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Go Back
          </button>
        </div>

        {/* Fun Message */}
        <p className="mt-8 text-sm text-gray-500">
          While you're here, why not check out our{' '}
          <Link to="/menu" className="text-primary-600 hover:underline">
            menu
          </Link>
          ?
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
