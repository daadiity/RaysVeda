import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import PujaPage from './pages/PujaPage'
import ServicesPage from './pages/ServicesPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import WhatsAppButton from './components/common/WhatsAppButton'
import ScrollToTop from './components/common/ScrollToTop'
import KundliIntroPage from './pages/KundliIntroPage'
import KundliFormPage from './pages/KundliFormPage'
import KundliResultPage from './pages/KundliResultPage'
import Vedas from './pages/Vedas'
import SacredMantras from './pages/SacredMantras'
import Meditation from './pages/Meditation';
import Numerology from './pages/Numerology';
import PranPratishtha from "./pages/PranPratishtha";
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import UserDashboard from './pages/UserDashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';
import BookingHistory from "./pages/BookingHistory";

function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (

    <div className="min-vh-100 bg-light d-flex flex-column">
   
      <Header scrolled={scrolled} />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/puja" element={<PujaPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/services/kundli" element={<KundliIntroPage />} />
          <Route path="/services/kundli/form" element={<KundliFormPage />} />
          <Route path="/services/kundli/result" element={<KundliResultPage />} />
          <Route path="/vidya/vedas" element={<Vedas />} />
          <Route path="/vidya/mantras" element={<SacredMantras />} />
          <Route path="/vidya/meditation" element={<Meditation />} />
          <Route path="/services/numerology" element={<Numerology />} />
          <Route path="/services/pran-pratishtha" element={<PranPratishtha />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />   
          <Route path="/dashboard" element={
               <ProtectedRoute>
               <UserDashboard />
              </ProtectedRoute>
            } />
           <Route path="/booking-history/:id" element={
               <ProtectedRoute>
               <BookingHistory />
              </ProtectedRoute>
            } />  

        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </div>
  )
}

export default App