/**
 * Home Page component
 * Landing page with hero section, featured items, and CTAs
 */

import { Link } from 'react-router-dom';
import { ArrowRight, Star, Clock, MapPin } from 'lucide-react';
import { getPopularItems } from '../data/menuItems';
import MenuItemCard from '../components/menu/MenuItemCard';

const HomePage: React.FC = () => {
  const popularItems = getPopularItems().slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-burger-brown to-amber-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 text-9xl">🍔</div>
          <div className="absolute bottom-10 right-10 text-8xl">🍟</div>
          <div className="absolute top-1/2 left-1/3 text-7xl">🥤</div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-2xl">
            <h1 className="font-display font-extrabold text-4xl md:text-6xl leading-tight mb-6">
              The Juiciest Burgers in Town
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8">
              Handcrafted with premium ingredients, served with love. Experience burger perfection at Burger Palace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/menu"
                className="inline-flex items-center justify-center space-x-2 bg-burger-orange hover:bg-burger-red text-white font-semibold py-4 px-8 rounded-lg transition-colors text-lg"
              >
                <span>Order Now</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/booking"
                className="inline-flex items-center justify-center space-x-2 bg-transparent border-2 border-white hover:bg-white hover:text-burger-brown text-white font-semibold py-4 px-8 rounded-lg transition-colors text-lg"
              >
                <span>Book a Table</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-burger-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-burger-brown" />
              </div>
              <h3 className="font-display font-semibold text-xl text-burger-brown mb-2">
                Premium Quality
              </h3>
              <p className="text-gray-600">
                100% fresh beef patties made from locally sourced, premium cuts
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-burger-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-burger-brown" />
              </div>
              <h3 className="font-display font-semibold text-xl text-burger-brown mb-2">
                Fast Service
              </h3>
              <p className="text-gray-600">
                Quick preparation without compromising on taste or quality
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-burger-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-burger-brown" />
              </div>
              <h3 className="font-display font-semibold text-xl text-burger-brown mb-2">
                Dine-In or Takeout
              </h3>
              <p className="text-gray-600">
                Enjoy in our cozy restaurant or take your favorites home
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Items Section */}
      <section className="py-16 bg-burger-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Customer Favorites</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover why these items keep our customers coming back for more
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularItems.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/menu"
              className="inline-flex items-center space-x-2 btn-primary"
            >
              <span>View Full Menu</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-burger-orange">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-6">
            Ready for a Burger Experience?
          </h2>
          <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
            Whether you're dining in or ordering online, we're here to serve you the best burgers in town.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/menu"
              className="inline-flex items-center justify-center bg-white text-burger-orange hover:bg-burger-cream font-semibold py-4 px-8 rounded-lg transition-colors text-lg"
            >
              Order Online
            </Link>
            <Link
              to="/booking"
              className="inline-flex items-center justify-center bg-burger-brown text-white hover:bg-amber-900 font-semibold py-4 px-8 rounded-lg transition-colors text-lg"
            >
              Reserve a Table
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">What Our Customers Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah M.',
                text: 'Best burgers I\'ve ever had! The bacon BBQ burger is absolutely incredible.',
                rating: 5,
              },
              {
                name: 'Mike T.',
                text: 'Great food, friendly staff, and quick service. My go-to burger spot!',
                rating: 5,
              },
              {
                name: 'Emily R.',
                text: 'Love their veggie burger! Finally a plant-based option that actually tastes amazing.',
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-burger-yellow text-burger-yellow" />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-4">"{testimonial.text}"</p>
                <p className="font-semibold text-burger-brown">— {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
