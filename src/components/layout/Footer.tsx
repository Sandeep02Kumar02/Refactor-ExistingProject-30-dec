/**
 * Footer component
 * Displays site footer with links, contact info, and social media
 */

import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-burger-brown text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <span className="text-3xl">🍔</span>
              <span className="font-display font-bold text-xl">Burger Palace</span>
            </Link>
            <p className="text-gray-300 text-sm mb-4">
              Serving the juiciest burgers in town since 2024. Made with love and
              the freshest ingredients.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-300 hover:text-burger-yellow transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-burger-yellow transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-burger-yellow transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/menu"
                  className="text-gray-300 hover:text-burger-yellow transition-colors"
                >
                  Our Menu
                </Link>
              </li>
              <li>
                <Link
                  to="/booking"
                  className="text-gray-300 hover:text-burger-yellow transition-colors"
                >
                  Book a Table
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-burger-yellow transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="text-gray-300 hover:text-burger-yellow transition-colors"
                >
                  Order Online
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-burger-yellow flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">
                  123 Burger Street<br />
                  Foodville, FL 12345
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-burger-yellow flex-shrink-0" />
                <span className="text-gray-300 text-sm">(555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-burger-yellow flex-shrink-0" />
                <span className="text-gray-300 text-sm">info@burgerpalace.com</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Opening Hours</h3>
            <ul className="space-y-2">
              <li className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-burger-yellow flex-shrink-0 mt-0.5" />
                <div className="text-gray-300 text-sm">
                  <p className="font-medium text-white">Mon - Thu</p>
                  <p>11:00 AM - 10:00 PM</p>
                </div>
              </li>
              <li className="flex items-start space-x-3 ml-8">
                <div className="text-gray-300 text-sm">
                  <p className="font-medium text-white">Fri - Sat</p>
                  <p>11:00 AM - 11:00 PM</p>
                </div>
              </li>
              <li className="flex items-start space-x-3 ml-8">
                <div className="text-gray-300 text-sm">
                  <p className="font-medium text-white">Sunday</p>
                  <p>12:00 PM - 9:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© {currentYear} Burger Palace. All rights reserved.</p>
          <p className="mt-2">
            Made with ❤️ and the finest ingredients
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
