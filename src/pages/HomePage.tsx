import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Calendar, Star, Clock, Award, Truck } from 'lucide-react';
import { getPopularItems } from '../data/menu';
import MenuItemCard from '../components/MenuItemCard';

/**
 * HomePage component - Landing page for Burger Palace.
 * Features hero section, popular items, and call-to-action sections.
 */
const HomePage: React.FC = () => {
  const popularItems = getPopularItems().slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-shadow">
              The Best Burgers in Town
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Handcrafted with premium ingredients and served with love.
              Order online or reserve your table for a delicious dine-in experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/menu"
                className="btn btn-lg bg-white text-primary-600 hover:bg-gray-100 inline-flex items-center justify-center"
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                Order Online
              </Link>
              <Link
                to="/book-table"
                className="btn btn-lg bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600 inline-flex items-center justify-center"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Book a Table
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary-100 text-primary-600 mb-4">
                <Award className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Premium Quality
              </h3>
              <p className="text-gray-600">
                100% fresh beef, locally sourced vegetables, and house-made sauces.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary-100 text-primary-600 mb-4">
                <Clock className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Fast Service
              </h3>
              <p className="text-gray-600">
                Quick preparation without compromising quality. Ready in 15 minutes!
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary-100 text-primary-600 mb-4">
                <Truck className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Easy Delivery
              </h3>
              <p className="text-gray-600">
                Free delivery on orders over $30. Hot and fresh to your doorstep.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Items Section */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              Customer Favorites
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our most loved burgers that keep customers coming back for more.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularItems.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/menu" className="btn-primary btn-lg">
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Review 1 */}
            <div className="card p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Best burgers I've ever had! The Classic Burger is absolutely perfect.
                Will definitely be coming back!"
              </p>
              <p className="font-semibold text-gray-900">- Sarah M.</p>
            </div>

            {/* Review 2 */}
            <div className="card p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Great atmosphere for dining in. The table booking was easy and the
                service was fantastic. Highly recommend!"
              </p>
              <p className="font-semibold text-gray-900">- Mike T.</p>
            </div>

            {/* Review 3 */}
            <div className="card p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "The online ordering is so convenient! My order arrived hot and
                exactly as expected. Love the Bacon BBQ Burger!"
              </p>
              <p className="font-semibold text-gray-900">- Emily R.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Ready to Order?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Whether you want to enjoy our delicious burgers at home or dine in with
            friends and family, we've got you covered!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/menu"
              className="btn btn-lg bg-white text-primary-600 hover:bg-gray-100"
            >
              Start Your Order
            </Link>
            <Link
              to="/book-table"
              className="btn btn-lg bg-transparent border-2 border-white hover:bg-white hover:text-primary-600"
            >
              Reserve a Table
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
