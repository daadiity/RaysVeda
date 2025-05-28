import { Link } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import Logo from '../common/Logo'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-800 text-white pt-12 pb-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <Logo colorClass="text-white" />
              <span className="ml-2 text-xl font-serif font-bold">Rays<span className="text-primary-400">Veda</span></span>
            </div>
            <p className="text-gray-300 mb-4">
              A leading platform transforming spirituality through guided practices, community engagement, and personalized experiences for holistic well-being.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-serif font-semibold mb-4 text-primary-200">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-primary-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-primary-400 transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/puja" className="text-gray-300 hover:text-primary-400 transition-colors">Pujas</Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-primary-400 transition-colors">Blog</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-primary-400 transition-colors">FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-serif font-semibold mb-4 text-primary-200">Our Services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/services/pran-pratishtha" className="text-gray-300 hover:text-primary-400 transition-colors">Pran Pratishtha</Link>
              </li>
              <li>
                <Link to="/services/puja" className="text-gray-300 hover:text-primary-400 transition-colors">Puja</Link>
              </li>
              <li>
                <Link to="/services/hawan" className="text-gray-300 hover:text-primary-400 transition-colors">Hawan</Link>
              </li>
              <li>
                <Link to="/services/kundli" className="text-gray-300 hover:text-primary-400 transition-colors">Kundli</Link>
              </li>
              <li>
                <Link to="/services/numerology" className="text-gray-300 hover:text-primary-400 transition-colors">Numerology</Link>
              </li>
              <li>
                <Link to="/services/vastu" className="text-gray-300 hover:text-primary-400 transition-colors">Vastu</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-serif font-semibold mb-4 text-primary-200">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <FaMapMarkerAlt className="text-primary-400 mr-3" />
                <span className="text-gray-300">11/13/4C, Tashkand Marg, Civil Lines, Allahabad,
Uttar Pradesh, India - 211001</span>
              </li>
              <li className="flex items-center">
                <FaPhoneAlt className="text-primary-400 mr-3" />
                <span className="text-gray-300">+91-9161-110-130</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-primary-400 mr-3" />
                <span className="text-gray-300">support@raysveda.com</span>
              </li>
            </ul>
            <div className="mt-4">
              <Link to="/contact" className="btn inline-block px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">
                Send Message
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} RaysVeda. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy-policy" className="text-gray-400 hover:text-primary-300 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-gray-400 hover:text-primary-300 text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/sitemap" className="text-gray-400 hover:text-primary-300 text-sm transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer