import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, Clock, Award } from 'lucide-react';
import { getPopularItems, getNewItems } from '../data/menuData';
import MenuItemCard from '../components/MenuItemCard';

function HomePage() {
  const popularItems = getPopularItems().slice(0, 4);
  const newItems = getNewItems().slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1550547660-d9450f859349?w=1920&h=1080&fit=crop"
            alt="Burger background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container-custom relative py-20 md:py-32">
          <div className="max-w-2xl">
            <span className="inline-block bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
              🎉 Free Delivery on Orders Over $30
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
              Bite Into
              <span className="text-primary-400"> Bliss</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Handcrafted burgers made with premium ingredients, bold flavors, and love.
              Order online or reserve your table for an unforgettable dining experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/order" className="btn-primary text-center flex items-center justify-center gap-2">
                Order Now
                <ArrowRight size={20} />
              </Link>
              <Link to="/booking" className="btn-secondary bg-transparent border-white text-white hover:bg-white hover:text-gray-900 text-center">
                Book a Table
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white border-b">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4">
              <div className="bg-primary-100 p-4 rounded-full">
                <Truck className="text-primary-600" size={28} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Fast Delivery</h3>
                <p className="text-gray-600 text-sm">30-45 minutes or less</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-primary-100 p-4 rounded-full">
                <Clock className="text-primary-600" size={28} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Fresh & Hot</h3>
                <p className="text-gray-600 text-sm">Made fresh when you order</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-primary-100 p-4 rounded-full">
                <Award className="text-primary-600" size={28} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Premium Quality</h3>
                <p className="text-gray-600 text-sm">100% Angus beef patties</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Items Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">
              <span className="flex items-center justify-center gap-2">
                <Star className="text-primary-500" fill="currentColor" />
                Most Popular
              </span>
            </h2>
            <p className="section-subtitle">
              Our customers' all-time favorites. Can't decide? Start here!
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularItems.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/menu" className="btn-outline inline-flex items-center gap-2">
              View Full Menu
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* New Items Section */}
      {newItems.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <span className="badge badge-success mb-4">Just Added</span>
              <h2 className="section-title">Try Something New</h2>
              <p className="section-subtitle">
                Fresh additions to our menu. Be the first to try these delicious creations!
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {newItems.map((item) => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Ready to Experience Burger Bliss?
          </h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            Whether you're ordering for delivery, pickup, or dining in with us,
            we promise an unforgettable burger experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/order"
              className="bg-white text-primary-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
            >
              Order Online
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/booking"
              className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-primary-600 transition-colors"
            >
              Reserve a Table
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">What Our Customers Say</h2>
            <p className="section-subtitle">
              Don't just take our word for it. Here's what burger lovers are saying!
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah M.',
                rating: 5,
                text: "Best burgers in town! The Double Stack Deluxe is absolutely incredible. Fresh ingredients and amazing flavors.",
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
              },
              {
                name: 'Michael R.',
                rating: 5,
                text: "Finally found my go-to burger place! The online ordering is super convenient and delivery is always fast and hot.",
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
              },
              {
                name: 'Emily L.',
                rating: 5,
                text: "Perfect for family dinners! We booked a table for 6 and had the best time. Kids loved the milkshakes!",
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
              },
            ].map((testimonial, index) => (
              <div key={index} className="card p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <div className="flex">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className="text-yellow-400"
                          fill="currentColor"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
