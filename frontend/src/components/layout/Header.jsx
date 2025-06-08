import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaChevronDown } from 'react-icons/fa'
import Logo from '../common/Logo'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { useLanguage } from '../../context/LanguageContext'

const Header = ({ scrolled }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdowns, setDropdowns] = useState({
    services: false,
    vidya: false,
    seva: false
  })
  const navRef = useRef(null)
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { lang, setLanguage, t } = useLanguage();

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

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/login');
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2 dark:bg-gray-900' : 'bg-orange-50 py-4 dark:bg-gray-900'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center" ref={navRef}>
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <Logo />
            <span className="ml-2 text-xl font-serif font-bold text-gray-800 dark:text-white">
              Rays<span className="text-primary-600">Veda</span>
            </span>
          </Link>
        </div>

        {/* Theme & Language Toggles */}
        <div className="flex items-center gap-3 mr-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
            aria-label="Toggle dark mode"
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </button>
          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(lang === "en" ? "hi" : "en")}
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
            aria-label="Toggle language"
            title={lang === "en" ? "Switch to Hindi" : "Switch to English"}
          >
            {lang === "en" ? "EN" : "हिं"}
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center">
          <NavLink to="/" className={navLinkClass} end>
            {t("home") || "Home"}
          </NavLink>
          <NavLink to="/puja" className={navLinkClass}>
            {t("puja") || "Puja"}
          </NavLink>
          <div className="relative group">
            <button 
              className="nav-link flex items-center gap-1"
              onClick={() => toggleDropdown('services')}
            >
              {t("ourServices") || "Our Services"}
              <FaChevronDown size={12} className={`transition-transform ${dropdowns.services ? 'rotate-180' : ''}`} />
            </button>
            {dropdowns.services && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10"
              >
                <Link to="/services/pran-pratishtha" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-orange-100 dark:hover:bg-gray-700">{t("pranPratishtha") || "Pran Pratishtha"}</Link>
                <Link to="/services/hawan" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-orange-100 dark:hover:bg-gray-700">{t("hawan") || "Hawan"}</Link>
                <Link to="/services/kundli" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-orange-100 dark:hover:bg-gray-700">{t("kundli") || "Kundli"}</Link>
                <Link to="/services/numerology" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-orange-100 dark:hover:bg-gray-700">{t("numerology") || "Numerology"}</Link>
                <Link to="/services/vastu" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-orange-100 dark:hover:bg-gray-700">{t("vastu") || "Vastu"}</Link>
              </motion.div>
            )}
          </div>
          <div className="relative group">
            <button 
              className="nav-link flex items-center gap-1"
              onClick={() => toggleDropdown('vidya')}
            >
              {t("vidyaZone") || "Vidya Zone"}
              <FaChevronDown size={12} className={`transition-transform ${dropdowns.vidya ? 'rotate-180' : ''}`} />
            </button>
            {dropdowns.vidya && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10"
              >
                <Link to="/vidya/vedas" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-orange-100 dark:hover:bg-gray-700">{t("vedas") || "Vedas"}</Link>
                <Link to="/vidya/mantras" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-orange-100 dark:hover:bg-gray-700">{t("sacredMantras") || "Sacred Mantras"}</Link>
                <Link to="/vidya/meditation" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-orange-100 dark:hover:bg-gray-700">{t("meditation") || "Meditation"}</Link>
              </motion.div>
            )}
          </div>
          <div className="relative group">
            <button 
              className="nav-link flex items-center gap-1"
              onClick={() => toggleDropdown('seva')}
            >
              {t("sevaBhav") || "Seva Bhav"}
              <FaChevronDown size={12} className={`transition-transform ${dropdowns.seva ? 'rotate-180' : ''}`} />
            </button>
            {dropdowns.seva && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10"
              >
                <Link to="/seva/charitable-programs" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-orange-100 dark:hover:bg-gray-700">{t("charitablePrograms") || "Charitable Programs"}</Link>
                <Link to="/seva/community-service" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-orange-100 dark:hover:bg-gray-700">{t("communityService") || "Community Service"}</Link>
                <Link to="/seva/donate" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-orange-100 dark:hover:bg-gray-700">{t("donate") || "Donate"}</Link>
              </motion.div>
            )}
          </div>
          <NavLink to="/about" className={navLinkClass}>
            {t("aboutUs") || "About Us"}
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            {t("contact") || "Contact"}
          </NavLink>
          {/* Auth Buttons */}
          {!user && (
            <>
              <Link to="/signup" className="btn-primary ml-4 dark:bg-primary-700 dark:text-white">
                {t("signUp") || "Sign Up"}
              </Link>
              <Link to="/login" className="btn-secondary ml-2 dark:bg-gray-800 dark:text-white">
                {t("login") || "Login"}
              </Link>
            </>
          )}
          {user && (
            <>
              <Link to="/dashboard" className="btn-primary ml-4 dark:bg-primary-700 dark:text-white">
                {t("dashboard") || "Dashboard"}
              </Link>
              <button
                onClick={handleLogout}
                className="btn-secondary ml-2 dark:bg-gray-800 dark:text-white"
              >
                {t("logout") || "Logout"}
              </button>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden flex items-center p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="sr-only">Open main menu</span>
          <div className="flex flex-col space-y-1.5">
            <span className={`block w-6 h-0.5 bg-gray-800 dark:bg-white transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-gray-800 dark:bg-white transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-gray-800 dark:bg-white transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <motion.div 
          className="lg:hidden fixed inset-0 z-40 bg-white dark:bg-gray-900"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
            <span className="ml-2 text-xl font-serif font-bold text-gray-800 dark:text-white">
              Rays<span className="text-primary-600">Veda</span>
            </span>
            <button 
              className="text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
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
              className="block py-2 text-lg dark:text-white" 
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("home") || "Home"}
            </NavLink>
            <NavLink 
              to="/puja" 
              className="block py-2 text-lg dark:text-white" 
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("puja") || "Puja"}
            </NavLink>
            {/* ...other nav links... */}
            <div className="pt-4 flex flex-col gap-2">
              <Link 
                to="/puja/booking" 
                className="block w-full text-center btn-primary dark:bg-primary-700 dark:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("bookPuja") || "Book Puja"}
              </Link>
              {!user && (
                <>
                  <Link 
                    to="/signup" 
                    className="block w-full text-center btn-primary dark:bg-primary-700 dark:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t("signUp") || "Sign Up"}
                  </Link>
                  <Link 
                    to="/login" 
                    className="block w-full text-center btn-secondary dark:bg-gray-800 dark:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t("login") || "Login"}
                  </Link>
                </>
              )}
              {user && (
                <>
                  <Link 
                    to="/dashboard" 
                    className="block w-full text-center btn-primary dark:bg-primary-700 dark:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t("dashboard") || "Dashboard"}
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-center btn-secondary mt-2 dark:bg-gray-800 dark:text-white"
                  >
                    {t("logout") || "Logout"}
                  </button>
                </>
              )}
            </div>
          </nav>
        </motion.div>
      )}
    </header>
  )
}

export default Header