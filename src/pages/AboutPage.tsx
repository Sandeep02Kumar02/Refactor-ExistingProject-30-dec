/**
 * About Page component
 * Information about the restaurant
 */

import { Link } from 'react-router-dom';
import { Award, Heart, Users, Leaf } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-burger-brown text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display font-bold text-4xl md:text-5xl mb-6">
            Our Story
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            From a small food truck to a beloved local restaurant, our passion
            for creating the perfect burger has never wavered.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-burger-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display font-bold text-3xl text-burger-brown mb-6">
                The Beginning
              </h2>
              <p className="text-gray-600 mb-4">
                Burger Palace started in 2024 with a simple mission: to serve the
                most delicious, handcrafted burgers using only the freshest, locally
                sourced ingredients.
              </p>
              <p className="text-gray-600 mb-4">
                What began as a passion project has grown into a beloved community
                gathering place where families and friends come together to enjoy
                great food and even better company.
              </p>
              <p className="text-gray-600">
                Every burger we serve is made with love, care, and an unwavering
                commitment to quality that our customers have come to expect.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600"
                alt="Restaurant interior"
                className="rounded-xl shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 bg-burger-orange text-white p-4 rounded-lg shadow-lg">
                <p className="font-display font-bold text-2xl">Since</p>
                <p className="font-display font-bold text-4xl">2024</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-burger-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-burger-brown" />
              </div>
              <h3 className="font-display font-semibold text-xl text-burger-brown mb-2">
                Quality First
              </h3>
              <p className="text-gray-600">
                We never compromise on the quality of our ingredients or the care we put into every dish.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-burger-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-burger-brown" />
              </div>
              <h3 className="font-display font-semibold text-xl text-burger-brown mb-2">
                Fresh & Local
              </h3>
              <p className="text-gray-600">
                We source our ingredients from local farms and suppliers to ensure maximum freshness.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-burger-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-burger-brown" />
              </div>
              <h3 className="font-display font-semibold text-xl text-burger-brown mb-2">
                Made with Love
              </h3>
              <p className="text-gray-600">
                Every burger is handcrafted with passion and attention to detail.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-burger-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-burger-brown" />
              </div>
              <h3 className="font-display font-semibold text-xl text-burger-brown mb-2">
                Community Focus
              </h3>
              <p className="text-gray-600">
                We're more than a restaurant – we're a gathering place for our community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-burger-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: 'Chef Michael',
                role: 'Head Chef',
                image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=300',
              },
              {
                name: 'Sarah Johnson',
                role: 'General Manager',
                image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300',
              },
              {
                name: 'David Chen',
                role: 'Executive Chef',
                image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=300',
              },
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="font-display font-semibold text-lg text-burger-brown">
                    {member.name}
                  </h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-burger-orange">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-3xl text-white mb-6">
            Come Visit Us!
          </h2>
          <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
            Experience the Burger Palace difference for yourself. We can't wait to serve you!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/menu"
              className="inline-flex items-center justify-center bg-white text-burger-orange hover:bg-burger-cream font-semibold py-4 px-8 rounded-lg transition-colors text-lg"
            >
              View Our Menu
            </Link>
            <Link
              to="/booking"
              className="inline-flex items-center justify-center bg-burger-brown text-white hover:bg-amber-900 font-semibold py-4 px-8 rounded-lg transition-colors text-lg"
            >
              Book a Table
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
