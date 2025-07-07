// // import { useState, useEffect, useRef } from 'react'
// // import { Link, NavLink, useNavigate } from 'react-router-dom'
// // import { motion } from 'framer-motion'
// // import { FaChevronDown } from 'react-icons/fa'
// // import Logo from '../common/Logo'
// // import { useAuth } from '../../context/AuthContext'
// // import { useTheme } from '../../context/ThemeContext'
// // import { useLanguage } from '../../context/LanguageContext'

// // const Header = ({ scrolled }) => {
// //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
// //   const [dropdowns, setDropdowns] = useState({

// //     Services: false,
// //     Vidya: false,
// //     Seva: false,
// //     Login: false,
// //   });

// //   const navRef = useRef(null);
// //   const navigate = useNavigate();
// //   const { user, logout } = useAuth();
// //   const { theme, toggleTheme } = useTheme();
// //   const { lang, setLanguage, t } = useLanguage();

// //   // Close dropdown when clicking outside
// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (navRef.current && !navRef.current.contains(event.target)) {
// //         setDropdowns({

// //           Services: false,
// //           Vidya: false,
// //           Seva: false,
// //           Login: false,
// //         });

// //       }
// //     }
// //     document.addEventListener('mousedown', handleClickOutside)
// //     return () => document.removeEventListener('mousedown', handleClickOutside)
// //   }, [])

// //   const toggleDropdown = (name) => {

// //     setDropdowns((prev) => ({
// //       ...prev, // Keep existing state
// //       Services: name === "Services" ? !prev.Services : false,
// //       Vidya: name === "Vidya" ? !prev.Vidya : false,
// //       Seva: name === "Seva" ? !prev.Seva : false,
// //       Login: name === "Login" ? !prev.Login : false,
// //     }));
// //   };

// //   const navLinkClass = ({ isActive }) =>

// //     isActive ? "nav-link-active" : "nav-link";



// //   const handleLogout = () => {
// //     logout();
// //     setMobileMenuOpen(false);
// //     navigate('/login');
// //   };

// //   return (
// //     <header
// //       className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2 dark:bg-gray-900' : 'bg-orange-50 py-4 dark:bg-gray-900'
// //         }`}
// //     >
// //       <div className="container mx-auto flex justify-between items-center" ref={navRef}>
// //         <div className="flex items-center">
// //           <Link to="/" className="flex items-center">
// //             <Logo />
// //             <span className="ml-2 text-xl font-serif font-bold text-gray-800">
// //               Rays<span className="text-primary-600">Veda</span>
// //             </span>
// //           </Link>
// //         </div>

// //         {/* Theme & Language Toggles */}
// //         <div className="flex items-center gap-3 mr-4">
// //           {/* Theme Toggle */}
// //           <button
// //             onClick={toggleTheme}
// //             className="p-2 rounded-full border border-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
// //             aria-label="Toggle dark mode"
// //             title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
// //           >
// //             {theme === "dark" ? "🌙" : "☀️"}
// //           </button>
// //           {/* Language Toggle */}
// //           <button
// //             onClick={() => setLanguage(lang === "en" ? "hi" : "en")}
// //             className="p-2 rounded-full border border-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
// //             aria-label="Toggle language"
// //             title={lang === "en" ? "Switch to Hindi" : "Switch to English"}
// //           >
// //             {lang === "en" ? "EN" : "हिं"}
// //           </button>
// //         </div>

// //         {/* Desktop Navigation */}
// //         <nav className="hidden lg:flex items-center">


// //           <NavLink to="/" className={navLinkClass} end>{t("home") || "Home"}</NavLink>
// //           <NavLink to="/puja" className={navLinkClass}>{t("puja") || "Puja"}</NavLink>

// //           {/* Dropdowns: Services, Vidya Zone, Seva Bhav */}
// //           {["Services", "Vidya", "Seva"].map((key) => (
// //             <div key={key} className="relative group">
// //               <button className="nav-link flex items-center gap-1" onClick={() => toggleDropdown(key)}>
// //                 {t(key) || key.charAt(0).toUpperCase() + key.slice(1)}
// //                 <FaChevronDown size={12} className={`transition-transform ${dropdowns[key] ? "rotate-180" : ""}`} />
// //               </button>

// //               {dropdowns[key] && (
// //                 <motion.div
// //                   initial={{ opacity: 0, y: 10 }}
// //                   animate={{ opacity: 1, y: 0 }}
// //                   exit={{ opacity: 0, y: 10 }}
// //                   className="absolute mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10"
// //                 >
// //                   {key === "Services" && (
// //                     <>
// //                       <Link to="/Services/pran-pratishtha" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-orange-100 dark:hover:bg-gray-700" onClick={() => toggleDropdown("Services")}>{t("pranPratishtha") || "Pran Pratishtha"}</Link>
// //                       <Link to="/Services/hawan" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-orange-100 dark:hover:bg-gray-700" onClick={() => toggleDropdown("Services")}>{t("hawan") || "Hawan"}</Link>
// //                       <Link to="/Services/kundli" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-orange-100 dark:hover:bg-gray-700" onClick={() => toggleDropdown("Services")}>{t("kundli") || "Kundli"}</Link>
// //                       <Link to="/Services/numerology" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-orange-100 dark:hover:bg-gray-700" onClick={() => toggleDropdown("Services")}>{t("numerology") || "Numerology"}</Link>
// //                       <Link to="/Services/vastu" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-orange-100 dark:hover:bg-gray-700" onClick={() => toggleDropdown("Services")}>{t("vastu") || "Vastu"}</Link>
// //                     </>
// //                   )}
// //                   {key === "Vidya" && (
// //                     <>
// //                       <Link to="/Vidya/vedas" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-orange-100 dark:hover:bg-gray-700" onClick={() => toggleDropdown("Vidya")}>{t("vedas") || "Vedas"}</Link>
// //                       <Link to="/Vidya/mantras" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-orange-100 dark:hover:bg-gray-700" onClick={() => toggleDropdown("Vidya")}>{t("sacredMantras") || "Sacred Mantras"}</Link>
// //                       <Link to="/Vidya/meditation" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-orange-100 dark:hover:bg-gray-700" onClick={() => toggleDropdown("Vidya")}>{t("meditation") || "Meditation"}</Link>
// //                     </>
// //                   )}
// //                   {key === "Seva" && (
// //                     <>
// //                       <Link to="/Seva/charitable-programs" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-orange-100 dark:hover:bg-gray-700" onClick={() => toggleDropdown("Seva")}>{t("charitablePrograms") || "Charitable Programs"}</Link>
// //                       <Link to="/Seva/community-service" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-orange-100 dark:hover:bg-gray-700" onClick={() => toggleDropdown("Seva")}>{t("communityService") || "Community Service"}</Link>
// //                       <Link to="/Seva/donate" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-orange-100 dark:hover:bg-gray-700" onClick={() => toggleDropdown("Seva")}>{t("donate") || "Donate"}</Link>
// //                     </>
// //                   )}
// //                 </motion.div>
// //               )}
// //             </div>
// //           ))}

// //           <NavLink to="/about" className={navLinkClass}>{t("aboutUs") || "About Us"}</NavLink>
// //           <NavLink to="/contact" className={navLinkClass}>{t("contact") || "Contact"}</NavLink>

// //           {/* Auth Links */}
// //           {!user ? (


// //             <>
// //               <Link to="/signup" className="btn-primary ml-4 dark:bg-primary-700 dark:text-white">
// //                 {t("signUp") || "Sign Up"}
// //               </Link>

// //               <div className="relative ml-2">
// //                 <button className="btn-secondary dark:bg-gray-800 dark:text-white flex items-center gap-1" onClick={() => toggleDropdown("Login")}>
// //                   {t("login") || "Login"} <FaChevronDown size={12} />
// //                 </button>
// //                 {dropdowns.Login && (
// //                   <motion.div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
// //                     <Link to="/login/" className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-orange-100 dark:hover:bg-gray-700" onClick={() => toggleDropdown("Login")}>Login as User</Link>
// //                     <Link to="/admin/login" className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-orange-100 dark:hover:bg-gray-700" onClick={() => toggleDropdown("Login")}>Login as Admin</Link>
// //                   </motion.div>
// //                 )}
// //               </div>

// //             </>
// //           )}
// //           {user && (
// //             <>
// //               <Link to="/dashboard" className="btn-primary ml-4 dark:bg-primary-700 dark:text-white">
// //                 {t("dashboard") || "Dashboard"}
// //               </Link>
// //               <button
// //                 onClick={handleLogout}
// //                 className="btn-secondary ml-2 dark:bg-gray-800 dark:text-white"
// //               >
// //                 {t("logout") || "Logout"}
// //               </button>
// //             </>
// //           )}
// //         </nav>

// //         {/* Mobile Menu Button */}
// //         <button
// //           className="lg:hidden flex items-center p-2"
// //           onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
// //         >
// //           <span className="sr-only">Open main menu</span>
// //           <div className="flex flex-col space-y-1.5">
// //             <span className={`block w-6 h-0.5 bg-gray-800 dark:bg-white transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
// //             <span className={`block w-6 h-0.5 bg-gray-800 dark:bg-white transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
// //             <span className={`block w-6 h-0.5 bg-gray-800 dark:bg-white transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
// //           </div>
// //         </button>
// //       </div>


// //       {/* Mobile Navigation */}
// //       {
// //         mobileMenuOpen && (
// //           <motion.div
// //             className="lg:hidden fixed inset-0 z-40 bg-white"
// //             initial={{ opacity: 0, x: -20 }}
// //             animate={{ opacity: 1, x: 0 }}
// //             transition={{ duration: 0.2 }}
// //           >
// //             <div className="flex justify-between items-center p-4 border-b">
// //               <Logo />
// //               <span className="ml-2 text-xl font-serif font-bold text-gray-800">
// //                 Rays<span className="text-primary-600">Veda</span>
// //               </span>
// //               <button
// //                 className="text-gray-500 hover:text-gray-800"
// //                 onClick={() => setMobileMenuOpen(false)}
// //               >
// //                 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
// //                 </svg>
// //               </button>
// //             </div>
// //             <nav className="px-4 pt-4 pb-8 space-y-2">
// //               <NavLink
// //                 to="/"
// //                 className="block py-2 text-lg"
// //                 onClick={() => setMobileMenuOpen(false)}
// //               >
// //                 {t("home") || "Home"}
// //               </NavLink>
// //               <NavLink
// //                 to="/puja"
// //                 className="block py-2 text-lg"
// //                 onClick={() => setMobileMenuOpen(false)}
// //               >
// //                 {t("puja") || "Puja"}
// //               </NavLink>
// //               <div className="border-t border-gray-200 my-2 pt-2">
// //                 <p className="text-sm font-semibold text-gray-500 mb-2">Services</p>
// //                 <NavLink

// //                 to="/Services/pran-pratishtha"

// //                   className="block py-1.5 pl-4 text-gray-600"
// //                   onClick={() => setMobileMenuOpen(false)}
// //                 >
// //                   Pran Pratishtha
// //                 </NavLink>
// //                 <NavLink

// //                 to="/Services/hawan"

// //                   className="block py-1.5 pl-4 text-gray-600"
// //                   onClick={() => setMobileMenuOpen(false)}
// //                 >
// //                   Hawan
// //                 </NavLink>
// //                 <NavLink

// //                 to="/Services/kundli"

// //                   className="block py-1.5 pl-4 text-gray-600"
// //                   onClick={() => setMobileMenuOpen(false)}
// //                 >
// //                   Kundli
// //                 </NavLink>
// //                 <NavLink

// //                 to="/Services/numerology"

// //                   className="block py-1.5 pl-4 text-gray-600"
// //                   onClick={() => setMobileMenuOpen(false)}
// //                 >
// //                   Numerology
// //                 </NavLink>
// //                 <NavLink

// //                 to="/Services/vastu"

// //                   className="block py-1.5 pl-4 text-gray-600"
// //                   onClick={() => setMobileMenuOpen(false)}
// //                 >
// //                   Vastu
// //                 </NavLink>
// //               </div>
// //               <div className="border-t border-gray-200 my-2 pt-2">
// //                 <p className="text-sm font-semibold text-gray-500 mb-2">Vidya Zone</p>
// //                 <NavLink

// //                 to="/Vidya/vedas"

// //                   className="block py-1.5 pl-4 text-gray-600"
// //                   onClick={() => setMobileMenuOpen(false)}
// //                 >
// //                   Vedas
// //                 </NavLink>
// //                 <NavLink

// //                 to="/Vidya/mantras"

// //                   className="block py-1.5 pl-4 text-gray-600"
// //                   onClick={() => setMobileMenuOpen(false)}
// //                 >
// //                   Sacred Mantras
// //                 </NavLink>
// //                 <NavLink

// //                 to="/Vidya/meditation"

// //                   className="block py-1.5 pl-4 text-gray-600"
// //                   onClick={() => setMobileMenuOpen(false)}
// //                 >
// //                   Meditation
// //                 </NavLink>
// //               </div>
// //               <div className="border-t border-gray-200 my-2 pt-2">
// //                 <NavLink

// //                 to="/Seva/charitable-programs"

// //                   className="block py-1.5 pl-4 text-gray-600"
// //                   onClick={() => setMobileMenuOpen(false)}
// //                 >
// //                   Charitable Programs
// //                 </NavLink>
// //                 <NavLink

// //                 to="/Seva/community-service"

// //                   className="block py-1.5 pl-4 text-gray-600"
// //                   onClick={() => setMobileMenuOpen(false)}
// //                 >
// //                   Community Service
// //                 </NavLink>
// //                 <NavLink
// //                   to="/Seva/donate"
// //                   className="block py-1.5 pl-4 text-gray-600"
// //                   onClick={() => setMobileMenuOpen(false)}
// //                 >
// //                   Donate
// //                 </NavLink>
// //               </div>
// //               {/* Blog Link - placed between Seva Bhav and About Us */}
// //               <NavLink
// //                 to="/blog"
// //                 className="block py-2 text-lg"
// //                 onClick={() => setMobileMenuOpen(false)}
// //               >
// //                 Blog
// //               </NavLink>
// //               <NavLink
// //                 to="/about"
// //                 className="block py-2 text-lg"
// //                 onClick={() => setMobileMenuOpen(false)}
// //               >
// //                 About Us
// //               </NavLink>
// //               <NavLink
// //                 to="/contact"
// //                 className="block py-2 text-lg"
// //                 onClick={() => setMobileMenuOpen(false)}
// //               >
// //                 Contact
// //               </NavLink>
// //               <div className="pt-4">
// //                 <Link
// //                   to="/puja/booking"
// //                   className="block w-full text-center btn-primary"
// //                   onClick={() => setMobileMenuOpen(false)}
// //                 >
// //                   {t("bookPuja") || "Book Puja"}
// //                 </Link>
// //                 {!user && (
// //                   <>
// //                     <Link
// //                       to="/signup"
// //                       className="block w-full text-center btn-primary dark:bg-primary-700 dark:text-white"
// //                       onClick={() => setMobileMenuOpen(false)}
// //                     >
// //                       {t("signUp") || "Sign Up"}
// //                     </Link>
// //                     <Link
// //                       to="/login"
// //                       className="block w-full text-center btn-secondary dark:bg-gray-800 dark:text-white"
// //                       onClick={() => setMobileMenuOpen(false)}
// //                     >
// //                       {t("login") || "Login"}
// //                     </Link>
// //                   </>
// //                 )}
// //                 {user && (
// //                   <>
// //                     <Link
// //                       to="/dashboard"
// //                       className="block w-full text-center btn-primary dark:bg-primary-700 dark:text-white"
// //                       onClick={() => setMobileMenuOpen(false)}
// //                     >
// //                       {t("dashboard") || "Dashboard"}
// //                     </Link>
// //                     <button
// //                       onClick={handleLogout}
// //                       className="block w-full text-center btn-secondary mt-2 dark:bg-gray-800 dark:text-white"
// //                     >
// //                       {t("logout") || "Logout"}
// //                     </button>
// //                   </>
// //                 )}
// //               </div>
// //             </nav>
// //           </motion.div>
// //         )
// //       }

// //     </header >
// //   );
// // }

// // export default Header



// import { useState, useEffect, useRef } from 'react'
// import { Link, NavLink, useNavigate } from 'react-router-dom'
// import { motion } from 'framer-motion'
// import { FaChevronDown } from 'react-icons/fa'
// import Logo from '../common/Logo'
// import { useAuth } from '../../context/AuthContext'
// import { useTheme } from '../../context/ThemeContext'
// import { useLanguage } from '../../context/LanguageContext'

// const Header = ({ scrolled }) => {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
//   const [dropdowns, setDropdowns] = useState({
//     Services: false,
//     Vidya: false,
//     Seva: false,
//     Login: false,
//   })

//   const navRef = useRef(null)
//   const navigate = useNavigate()
//   const { user, logout } = useAuth()
//   const { theme, toggleTheme } = useTheme()
//   const { lang, setLanguage, t } = useLanguage()

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (navRef.current && !navRef.current.contains(event.target)) {
//         setDropdowns({
//           Services: false,
//           Vidya: false,
//           Seva: false,
//           Login: false,
//         })
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside)
//     return () => document.removeEventListener('mousedown', handleClickOutside)
//   }, [])

//   const toggleDropdown = (name) => {
//     setDropdowns((prev) => ({
//       Services: name === 'Services' ? !prev.Services : false,
//       Vidya: name === 'Vidya' ? !prev.Vidya : false,
//       Seva: name === 'Seva' ? !prev.Seva : false,
//       Login: name === 'Login' ? !prev.Login : false,
//     }))
//   }

//   const navLinkClass = ({ isActive }) =>
//     isActive ? 'nav-link-active' : 'nav-link'

//   const handleLogout = () => {
//     logout()
//     setMobileMenuOpen(false)
//     navigate('/login')
//   }

//   return (
//     <header
//       className={`sticky top-0 z-50 transition-all duration-300 ${
//         scrolled
//           ? 'bg-white shadow-md py-2 dark:bg-gray-900'
//           : 'bg-orange-50 py-4 dark:bg-gray-900'
//       }`}
//     >
//       <div className="container mx-auto flex justify-between items-center" ref={navRef}>
//         <div className="flex items-center">
//           <Link to="/" className="flex items-center">
//             <Logo />
//             <span className="ml-2 text-xl font-serif font-bold text-gray-800">
//               Rays<span className="text-primary-600">Veda</span>
//             </span>
//           </Link>
//         </div>

//         {/* Theme & Language Toggles */}
//         <div className="flex items-center gap-3 mr-4">
//           <button
//             onClick={toggleTheme}
//             className="p-2 rounded-full border border-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
//             aria-label="Toggle dark mode"
//             title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
//           >
//             {theme === 'dark' ? '🌙' : '☀️'}
//           </button>
//           <button
//             onClick={() => setLanguage(lang === 'en' ? 'hi' : 'en')}
//             className="p-2 rounded-full border border-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
//             aria-label="Toggle language"
//             title={lang === 'en' ? 'Switch to Hindi' : 'Switch to English'}
//           >
//             {lang === 'en' ? 'EN' : 'हिं'}
//           </button>
//         </div>

//         {/* Desktop Navigation */}
//         <nav className="hidden lg:flex items-center">
//           <NavLink to="/" className={navLinkClass} end>
//             {t('home') || 'Home'}
//           </NavLink>
//           <NavLink to="/puja" className={navLinkClass}>
//             {t('puja') || 'Puja'}
//           </NavLink>

//           {['Services', 'Vidya', 'Seva'].map((key) => (
//             <div key={key} className="relative group">
//               <button
//                 className="nav-link flex items-center gap-1"
//                 onClick={() => toggleDropdown(key)}
//               >
//                 {t(key) || key}
//                 <FaChevronDown size={12} className={`transition-transform ${dropdowns[key] ? 'rotate-180' : ''}`} />
//               </button>

//               {dropdowns[key] && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: 10 }}
//                   className="absolute mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10"
//                 >
//                   {key === 'Services' && (
//                     <>
//                       <Link to="/Services/pran-pratishtha" className="dropdown-link" onClick={() => toggleDropdown('Services')}>{t('pranPratishtha') || 'Pran Pratishtha'}</Link>
//                       <Link to="/Services/hawan" className="dropdown-link" onClick={() => toggleDropdown('Services')}>{t('hawan') || 'Hawan'}</Link>
//                       <Link to="/Services/kundli" className="dropdown-link" onClick={() => toggleDropdown('Services')}>{t('kundli') || 'Kundli'}</Link>
//                       <Link to="/Services/numerology" className="dropdown-link" onClick={() => toggleDropdown('Services')}>{t('numerology') || 'Numerology'}</Link>
//                       <Link to="/Services/vastu" className="dropdown-link" onClick={() => toggleDropdown('Services')}>{t('vastu') || 'Vastu'}</Link>
//                     </>
//                   )}
//                   {key === 'Vidya' && (
//                     <>
//                       <Link to="/Vidya/vedas" className="dropdown-link" onClick={() => toggleDropdown('Vidya')}>{t('vedas') || 'Vedas'}</Link>
//                       <Link to="/Vidya/mantras" className="dropdown-link" onClick={() => toggleDropdown('Vidya')}>{t('sacredMantras') || 'Sacred Mantras'}</Link>
//                       <Link to="/Vidya/meditation" className="dropdown-link" onClick={() => toggleDropdown('Vidya')}>{t('meditation') || 'Meditation'}</Link>
//                     </>
//                   )}
//                   {key === 'Seva' && (
//                     <>
//                       <Link to="/Seva/charitable-programs" className="dropdown-link" onClick={() => toggleDropdown('Seva')}>{t('charitablePrograms') || 'Charitable Programs'}</Link>
//                       <Link to="/Seva/community-service" className="dropdown-link" onClick={() => toggleDropdown('Seva')}>{t('communityService') || 'Community Service'}</Link>
//                       <Link to="/Seva/donate" className="dropdown-link" onClick={() => toggleDropdown('Seva')}>{t('donate') || 'Donate'}</Link>
//                     </>
//                   )}
//                 </motion.div>
//               )}
//             </div>
//           ))}

//           <NavLink to="/about" className={navLinkClass}>
//             {t('aboutUs') || 'About Us'}
//           </NavLink>
//           <NavLink to="/contact" className={navLinkClass}>
//             {t('contact') || 'Contact'}
//           </NavLink>

//           {/* ✅ Fixed Ternary Auth Section */}
//           {!user ? (
//             <>
//               <Link to="/signup" className="btn-primary ml-4 dark:bg-primary-700 dark:text-white">
//                 {t('signUp') || 'Sign Up'}
//               </Link>
//               <div className="relative ml-2">
//                 <button
//                   className="btn-secondary dark:bg-gray-800 dark:text-white flex items-center gap-1"
//                   onClick={() => toggleDropdown('Login')}
//                 >
//                   {t('login') || 'Login'} <FaChevronDown size={12} />
//                 </button>
//                 {dropdowns.Login && (
//                   <motion.div
//                     className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50"
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                   >
//                     <Link to="/login" className="dropdown-link" onClick={() => toggleDropdown('Login')}>
//                       Login as User
//                     </Link>
//                     <Link to="/admin/login" className="dropdown-link" onClick={() => toggleDropdown('Login')}>
//                       Login as Admin
//                     </Link>
//                   </motion.div>
//                 )}
//               </div>
//             </>
//           ) : (
//             <>
//               <Link to="/dashboard" className="btn-primary ml-4 dark:bg-primary-700 dark:text-white">
//                 {t('dashboard') || 'Dashboard'}
//               </Link>
//               <button onClick={handleLogout} className="btn-secondary ml-2 dark:bg-gray-800 dark:text-white">
//                 {t('logout') || 'Logout'}
//               </button>
//             </>
//           )}
//         </nav>

//         {/* Mobile Menu Button (remains unchanged) */}
//         <button
//           className="lg:hidden flex items-center p-2"
//           onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//         >
//           <span className="sr-only">Open main menu</span>
//           <div className="flex flex-col space-y-1.5">
//             <span className={`block w-6 h-0.5 bg-gray-800 dark:bg-white transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
//             <span className={`block w-6 h-0.5 bg-gray-800 dark:bg-white transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
//             <span className={`block w-6 h-0.5 bg-gray-800 dark:bg-white transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
//           </div>
//         </button>
//       </div>
//     </header>
//   )
// }

// export default Header



import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import Logo from "../common/Logo";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";

const Header = ({ scrolled }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdowns, setDropdowns] = useState({
    services: false,
    vidya: false,
    seva: false,
    login: false,
  });

  const navRef = useRef(null);
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
          seva: false,
          login: false,
        });
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (name) => {
    setDropdowns((prev) => ({
      services: name === "services" ? !prev.services : false,
      vidya: name === "vidya" ? !prev.vidya : false,
      seva: name === "seva" ? !prev.seva : false,
      login: name === "login" ? !prev.login : false,
    }));
  };

  const navLinkClass = ({ isActive }) =>
    isActive ? "nav-link-active" : "nav-link";

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate("/login");
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-md py-2 dark:bg-gray-900"
          : "bg-orange-50 py-4 dark:bg-gray-900"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center" ref={navRef}>
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <Logo />
            <span className="ml-2 text-xl font-serif font-bold text-gray-800 dark:text-white">
              Rays<span className="text-primary-600">Veda</span>
            </span>
          </Link>
        </div>

        {/* Theme & Language Toggle */}
        <div className="flex items-center gap-3 mr-4">
          <button onClick={toggleTheme} className="p-2 rounded-full border border-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition bg-white dark:bg-gray-800 text-gray-800 dark:text-white">
            {theme === "dark" ? "🌙" : "☀️"}
          </button>
          <button onClick={() => setLanguage(lang === "en" ? "hi" : "en")} className="p-2 rounded-full border border-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition bg-white dark:bg-gray-800 text-gray-800 dark:text-white">
            {lang === "en" ? "EN" : "हिं"}
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center">
          <NavLink to="/" className={navLinkClass} end>{t("home") || "Home"}</NavLink>
          <NavLink to="/puja" className={navLinkClass}>{t("puja") || "Puja"}</NavLink>

          {/* Dropdowns: Services, Vidya Zone, Seva Bhav */}
          {["services", "vidya", "seva"].map((key) => (
            <div key={key} className="relative group">
              <button className="nav-link flex items-center gap-1" onClick={() => toggleDropdown(key)}>
                {t(key) || key.charAt(0).toUpperCase() + key.slice(1)}
                <FaChevronDown size={12} className={`transition-transform ${dropdowns[key] ? "rotate-180" : ""}`} />
              </button>

              {dropdowns[key] && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10"
                >
                  {key === "services" && (
                    <>
                      <Link to="/services/pran-pratishtha" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-orange-100 dark:hover:bg-gray-700">{t("pranPratishtha") || "Pran Pratishtha"}</Link>
                      <Link to="/services/hawan" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-orange-100 dark:hover:bg-gray-700">{t("hawan") || "Hawan"}</Link>
                      <Link to="/services/kundli" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-orange-100 dark:hover:bg-gray-700">{t("kundli") || "Kundli"}</Link>
                      <Link to="/services/numerology" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-orange-100 dark:hover:bg-gray-700">{t("numerology") || "Numerology"}</Link>
                      <Link to="/services/vastu" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-orange-100 dark:hover:bg-gray-700">{t("vastu") || "Vastu"}</Link>
                    </>
                  )}
                  {key === "vidya" && (
                    <>
                      <Link to="/vidya/vedas" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-orange-100 dark:hover:bg-gray-700">{t("vedas") || "Vedas"}</Link>
                      <Link to="/vidya/mantras" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-orange-100 dark:hover:bg-gray-700">{t("sacredMantras") || "Sacred Mantras"}</Link>
                      <Link to="/vidya/meditation" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-orange-100 dark:hover:bg-gray-700">{t("meditation") || "Meditation"}</Link>
                    </>
                  )}
                  {key === "seva" && (
                    <>
                      <Link to="/seva/charitable-programs" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-orange-100 dark:hover:bg-gray-700">{t("charitablePrograms") || "Charitable Programs"}</Link>
                      <Link to="/seva/community-service" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-orange-100 dark:hover:bg-gray-700">{t("communityService") || "Community Service"}</Link>
                      <Link to="/seva/donate" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-orange-100 dark:hover:bg-gray-700">{t("donate") || "Donate"}</Link>
                    </>
                  )}
                </motion.div>
              )}
            </div>
          ))}

          <NavLink to="/about" className={navLinkClass}>{t("aboutUs") || "About Us"}</NavLink>
          <NavLink to="/contact" className={navLinkClass}>{t("contact") || "Contact"}</NavLink>

          {/* Auth Links */}
          {!user ? (
            <>
              <Link to="/signup" className="btn-primary ml-4 dark:bg-primary-700 dark:text-white">
                {t("signUp") || "Sign Up"}
              </Link>
              <div className="relative ml-2">
                <button className="btn-secondary dark:bg-gray-800 dark:text-white flex items-center gap-1" onClick={() => toggleDropdown("login")}>
                  {t("login") || "Login"} <FaChevronDown size={12} />
                </button>
                {dropdowns.login && (
                  <motion.div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <Link to="/login/" className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-orange-100 dark:hover:bg-gray-700" onClick={() => toggleDropdown("login")}>Login as User</Link>
                    <Link to="/admin/login" className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-orange-100 dark:hover:bg-gray-700" onClick={() => toggleDropdown("login")}>Login as Admin</Link>
                  </motion.div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="btn-primary ml-4 dark:bg-primary-700 dark:text-white">
                {t("dashboard") || "Dashboard"}
              </Link>
              <button onClick={handleLogout} className="btn-secondary ml-2 dark:bg-gray-800 dark:text-white">
                {t("logout") || "Logout"}
              </button>
            </>
          )}
        </nav>

        {/* Mobile Hamburger Icon (no change) */}
        <button className="lg:hidden flex items-center p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <div className="flex flex-col space-y-1.5">
            <span className={`block w-6 h-0.5 bg-gray-800 dark:bg-white transition-transform ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-gray-800 dark:bg-white transition-opacity ${mobileMenuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-gray-800 dark:bg-white transition-transform ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu logic remains same */}
    </header>
  );
};

export default Header;