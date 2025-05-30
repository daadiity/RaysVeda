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
import Vedas from './pages/Vedas'
import RigVeda from './pages/RigVeda' // Ensure this import matches your file structure
import CharitablePrograms from './pages/CharitablePrograms' // Ensure this import matches your file structure
import CommunityService from './pages/CommunityService'
import DonatePage from './pages/DonatePage'

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
    <div className="min-h-screen bg-orange-50 flex flex-col">
      <Header scrolled={scrolled} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/puja" element={<PujaPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/vidya/vedas" element={<Vedas />} />
          <Route path="/veda/rig-veda" element={<RigVeda />} />
          <Route path="/seva/charitable-programs" element={<CharitablePrograms />} />
          <Route path="/seva/community-service" element={<CommunityService />} />
          <Route path="/seva/donate" element={<DonatePage />} />
          {/* Add more routes as needed */}

        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </div>
  )
}

export default App