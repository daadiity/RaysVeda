import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🕉️</span>
              <span className="text-xl font-bold text-orange-400">RaysVeda</span>
            </div>
            <p className="text-gray-300 mb-4">
              Bringing ancient Vedic wisdom and spiritual services to the modern world. 
              Experience authentic pujas and spiritual guidance from the comfort of your home.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-orange-400 transition-colors">Home</Link></li>
              <li><Link to="/pooja" className="text-gray-300 hover:text-orange-400 transition-colors">Book Pooja</Link></li>
              <li><Link to="/login" className="text-gray-300 hover:text-orange-400 transition-colors">Login</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-gray-300">
              <p>📧 support@raysveda.com</p>
              <p>📞 +91 12345 67890</p>
              <p>🕐 24/7 Support</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 RaysVeda. All rights reserved. | Ancient Wisdom, Modern Convenience
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;