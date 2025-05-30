import { useState, useEffect, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaChevronDown } from 'react-icons/fa'
import Logo from '../common/Logo'
import Vedas from '../../pages/Vedas'

const Header = ({ scrolled }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdowns, setDropdowns] = useState({
    services: false,
    vidya: false,
    seva: false
  })
  const navRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setDropdowns({
          services: false,
          vidya: false,
          seva: false
        })
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleDropdown = (name) => {
    setDropdowns(prev => ({
      services: name === 'services' ? !prev.services : false,
      vidya: name === 'vidya' ? !prev.vidya : false,
      seva: name === 'seva' ? !prev.seva : false
    }))
  }

  const navLinkClass = ({ isActive }) => 
    isActive ? 'nav-link-active' : 'nav-link'

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-orange-50 py-4'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center" ref={navRef}>
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <Logo />
            {/* Changed from Divine Harmony to Rays Veda */}
            <span className="ml-2 text-xl font-serif font-bold text-gray-800">Rays<span className="text-primary-600">Veda</span></span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center">
          <NavLink to="/" className={navLinkClass} end>
            Home
          </NavLink>
          <NavLink to="/puja" className={navLinkClass}>
            Puja
          </NavLink>
          <div className="relative group">
            <button 
              className="nav-link flex items-center gap-1"
              onClick={() => toggleDropdown('services')}
            >
              Our Services
              <FaChevronDown size={12} className={`transition-transform ${dropdowns.services ? 'rotate-180' : ''}`} />
            </button>
            {dropdowns.services && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
              >
                <Link to="/services/pran-pratishtha" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-100">Pran Pratishtha</Link>
                <Link to="/services/hawan" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-100">Hawan</Link>
                <Link to="/services/kundli" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-100">Kundli</Link>
                <Link to="/services/numerology" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-100">Numerology</Link>
                <Link to="/services/vastu" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-100">Vastu</Link>
              </motion.div>
            )}
          </div>
          <div className="relative group">
            <button 
              className="nav-link flex items-center gap-1"
              onClick={() => toggleDropdown('vidya')}
            >
              Vidya Zone
              <FaChevronDown size={12} className={`transition-transform ${dropdowns.vidya ? 'rotate-180' : ''}`} />
            </button>
            {dropdowns.vidya && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
              >
                <Link to="/vidya/vedas" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-100">Vedas</Link>
                <Link to="/vidya/mantras" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-100">Sacred Mantras</Link>
                <Link to="/vidya/meditation" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-100">Meditation</Link>
              </motion.div>
            )}
          </div>
          <div className="relative group">
            <button 
              className="nav-link flex items-center gap-1"
              onClick={() => toggleDropdown('seva')}
            >
              Seva Bhav
              <FaChevronDown size={12} className={`transition-transform ${dropdowns.seva ? 'rotate-180' : ''}`} />
            </button>
            {dropdowns.seva && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
              >
                <Link to="/seva/charitable-programs" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-100">Charitable Programs</Link>
                <Link to="/seva/community-service" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-100">Community Service</Link>
                <Link to="/seva/donate" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-100">Donate</Link>
              </motion.div>
            )}
          </div>
          <NavLink to="/about" className={navLinkClass}>
            About Us
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
        </nav>

        {/* Book Puja Button */}
        <Link to="/puja/booking" className="hidden md:block btn-primary">
          Book Puja
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden flex items-center p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="sr-only">Open main menu</span>
          <div className="flex flex-col space-y-1.5">
            <span className={`block w-6 h-0.5 bg-gray-800 transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-gray-800 transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-gray-800 transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <motion.div 
          className="lg:hidden fixed inset-0 z-40 bg-white"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex justify-between items-center p-4 border-b">
            {/* The Logo component is just an icon now */}
            {/* Also change the text for mobile menu here if desired, otherwise it will display Divine Harmony */}
            <span className="ml-2 text-xl font-serif font-bold text-gray-800">Rays<span className="text-primary-600">Veda</span></span>
            <button 
              className="text-gray-500 hover:text-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="px-4 pt-4 pb-8 space-y-2">
            <NavLink 
              to="/" 
              className="block py-2 text-lg" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink 
              to="/puja" 
              className="block py-2 text-lg" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Puja
            </NavLink>
            <div className="border-t border-gray-200 my-2 pt-2">
              <p className="text-sm font-semibold text-gray-500 mb-2">Services</p>
              <NavLink 
                to="/services/pran-pratishtha" 
                className="block py-1.5 pl-4 text-gray-600" 
                onClick={() => setMobileMenuOpen(false)}
              >
                Pran Pratishtha
              </NavLink>
              <NavLink 
                to="/services/hawan" 
                className="block py-1.5 pl-4 text-gray-600" 
                onClick={() => setMobileMenuOpen(false)}
              >
                Hawan
              </NavLink>
              <NavLink 
                to="/services/kundli" 
                className="block py-1.5 pl-4 text-gray-600" 
                onClick={() => setMobileMenuOpen(false)}
              >
                Kundli
              </NavLink>
              <NavLink 
                to="/services/numerology" 
                className="block py-1.5 pl-4 text-gray-600" 
                onClick={() => setMobileMenuOpen(false)}
              >
                Numerology
              </NavLink>
              <NavLink 
                to="/services/vastu" 
                className="block py-1.5 pl-4 text-gray-600" 
                onClick={() => setMobileMenuOpen(false)}
              >
                Vastu
              </NavLink>
            </div>
            <div className="border-t border-gray-200 my-2 pt-2">
              <p className="text-sm font-semibold text-gray-500 mb-2">Vidya Zone</p>
              <NavLink 
                to="/vidya/vedic-scriptures" 
                className="block py-1.5 pl-4 text-gray-600" 
                onClick={() => setMobileMenuOpen(false)}
              >
                Vedic Scriptures
              </NavLink>
              <NavLink 
                to="/vidya/mantras" 
                className="block py-1.5 pl-4 text-gray-600" 
                onClick={() => setMobileMenuOpen(false)}
              >
                Sacred Mantras
              </NavLink>
              <NavLink 
                to="/vidya/meditation" 
                className="block py-1.5 pl-4 text-gray-600" 
                onClick={() => setMobileMenuOpen(false)}
              >
                Meditation
              </NavLink>
            </div>
            <NavLink 
              to="/about" 
              className="block py-2 text-lg" 
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </NavLink>
            <NavLink 
              to="/contact" 
              className="block py-2 text-lg" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </NavLink>
            <div className="pt-4">
              <Link 
                to="/puja/booking" 
                className="block w-full text-center btn-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Book Puja
              </Link>
            </div>
          </nav>
        </motion.div>
      )}
    </header>
  )
}

export default Header