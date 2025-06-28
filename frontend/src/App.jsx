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
import HawanPage from './pages/HawanPage'
import BlogPage from './pages/BlogPage' // <-- Add this import

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
          <Route path="/services/hawan" element={<HawanPage />} />
          <Route path="/blog" element={<BlogPage />} /> {/* <-- Blog route */}
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </div>
  )
}

export default App