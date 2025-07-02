import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useInView, useAnimation } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import BookPoojaForm from '../components/BookPoojaForm';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
}

const scaleUp = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5 }
  }
}

const HomePage = () => {
  const heroRef = useRef(null)
  const featuresRef = useRef(null)
  const servicesRef = useRef(null)
  const pujasRef = useRef(null)
  const testimonialsRef = useRef(null)
  const navigate = useNavigate()

  const heroInView = useInView(heroRef, { once: true })
  const featuresInView = useInView(featuresRef, { once: true, margin: "-100px" })
  const servicesInView = useInView(servicesRef, { once: true, margin: "-100px" })
  const pujasInView = useInView(pujasRef, { once: true, margin: "-100px" })
  const testimonialsInView = useInView(testimonialsRef, { once: true, margin: "-100px" })

  const { user } = useAuth()

  // Add these state variables for booking functionality
  const [showBooking, setShowBooking] = useState(false)
  const [selectedPuja, setSelectedPuja] = useState(null)
  const [showLoginMsg, setShowLoginMsg] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  // Enhanced services data with images
  const services = [
    {
      id: 1,
      title: "Puja Services",
      description: "Sacred rituals and ceremonies for various occasions and spiritual needs.",
      image: "https://i.pinimg.com/736x/47/fa/21/47fa2113b986016e9e4427b48415edda.jpg",
      icon: "🕉️",
      link: "/puja",
      features: ["Traditional Rituals", "Expert Priests", "Customized Ceremonies"]
    },
    {
      id: 2,
      title: "Astrology",
      description: "Personalized astrological consultations and guidance for life decisions.",
      image: "https://i.pinimg.com/736x/e7/b0/55/e7b05536587efbcfb2dc52fe7147d4c7.jpg",
      icon: "🔮",
      link: "/services/kundli",
      features: ["Birth Chart Analysis", "Future Predictions", "Remedial Solutions"]
    },
    {
      id: 3,
      title: "Meditation",
      description: "Guided meditation sessions for inner peace and spiritual growth.",
      image: "https://i.pinimg.com/736x/e7/d6/e7/e7d6e7d0fead9db0b91a16a86e2a35b1.jpg",
      icon: "🧘‍♂️",
      link: "/vidya/meditation",
      features: ["Guided Sessions", "Breathing Techniques", "Mindfulness Training"]
    },
    {
      id: 4,
      title: "Community",
      description: "Join our spiritual community for support and shared experiences.",
      image: "https://i.pinimg.com/736x/0c/ee/65/0cee65871ca0195397d91131ad9c3e7e.jpg",
      icon: "👥",
      link: "/about",
      features: ["Spiritual Groups", "Events & Workshops", "Online Forums"]
    }
  ]

  // Enhanced testimonials with images
  const testimonials = [
    {
      id: 1,
      name: "Rajesh Kumar",
      location: "Delhi, India",
      image: "https://i.pinimg.com/736x/e5/5d/d7/e55dd7dea6905491b6dcd4ce40ceaec1.jpg",
      text: "RaysVeda has transformed my spiritual journey. The personalized guidance and authentic rituals have brought peace and clarity to my life.",
      rating: 5,
      service: "Puja Services"
    },
    {
      id: 2,
      name: "Priya Sharma",
      location: "Mumbai, India",
      image: "https://i.pinimg.com/736x/1d/07/b3/1d07b3449037083feae0ebc40a8bfe1e.jpg",
      text: "The convenience of booking online combined with traditional practices makes RaysVeda unique. Highly recommended!",
      rating: 5,
      service: "Online Booking"
    },
    {
      id: 3,
      name: "Ankit Patel",
      location: "Ahmedabad, India",
      image: "https://i.pinimg.com/736x/3c/4d/5e/3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f.jpg",
      text: "The astrology consultation was incredibly accurate and insightful. It helped me make important life decisions with confidence.",
      rating: 5,
      service: "Astrology"
    },
    {
      id: 4,
      name: "Meera Gupta",
      location: "Bangalore, India",
      image: "https://i.pinimg.com/736x/47/01/77/470177c3c1d29dd0e95d9079bac12a19.jpg",
      text: "The meditation sessions have brought incredible peace to my daily life. The instructors are knowledgeable and caring.",
      rating: 5,
      service: "Meditation"
    }
  ]

  // Enhanced pujas data with better images
  const featuredPujas = [
    {
      id: 1,
      title: "Shri Ganpati Puja",
      description: "Remove obstacles and bring good fortune to your life with this powerful ritual.",
      image: "https://i.pinimg.com/736x/2e/6d/6f/2e6d6f7119a936f6caabce62b5018d4b.jpg",
      price: "₹1,101",
      amount: 1101,
      duration: "2-3 Hours",
      benefits: ["Removes Obstacles", "Brings Good Fortune", "Success in New Ventures"],
      link: "/puja/shri-ganpati"
    },
    {
      id: 2,
      title: "Maa Lakshmi Puja",
      description: "Invite prosperity, wealth, and abundance into your home with divine blessings.",
      image: "https://i.pinimg.com/736x/50/b0/dc/50b0dc13deb8d141838f77c216549560.jpg",
      price: "₹2,101",
      amount: 2101,
      duration: "3-4 Hours",
      benefits: ["Attracts Wealth", "Business Success", "Financial Stability"],
      link: "/puja/maa-lakshmi"
    },
    {
      id: 3,
      title: "Shri Narayan Puja",
      description: "Seek protection, peace, and spiritual growth through this sacred ritual.",
      image: "https://i.pinimg.com/736x/47/a2/37/47a23755394a44cd1b8e543472160e13.jpg",
      price: "₹1,501",
      amount: 1501,
      duration: "2-3 Hours",
      benefits: ["Divine Protection", "Inner Peace", "Spiritual Growth"],
      link: "/puja/shri-narayan"
    }
  ]

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000) // Change every 5 seconds

    return () => clearInterval(interval)
  }, [testimonials.length])

  // Handler functions
  const handleBookPujaClick = () => {
    if (!user) {
      setShowLoginMsg(true)
      setTimeout(() => setShowLoginMsg(false), 3000)
      return
    }
    setSelectedPuja(null)
    setShowBooking(true)
  }

  const handlePujaBookNow = (puja) => {
    if (!user) {
      setShowLoginMsg(true)
      setTimeout(() => setShowLoginMsg(false), 3000)
      return
    }
    // CHANGED: Instead of navigating, set selected puja and show booking form
    setSelectedPuja(puja)
    setShowBooking(true)
  }

  return (
    <>
      {/* Enhanced Hero Section with Parallax Effect */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-600 via-orange-500 to-amber-500 text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-white/10 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-white/10 rounded-full animate-pulse delay-500"></div>
          <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-white/10 rounded-full animate-bounce delay-1500"></div>
        </div>
        
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={heroInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <span className="text-6xl mb-4 block">🕉️</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight"
            >
              Welcome to{' '}
              <span className="bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
                RaysVeda
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl mb-8 font-light"
            >
              Your journey to spiritual enlightenment begins here
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-orange-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-orange-50 transition-all duration-300 shadow-lg"
                onClick={handleBookPujaClick}
              >
                🎯 Book a Puja Now
              </motion.button>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/about" 
                  className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-orange-600 transition-all duration-300 inline-block"
                >
                  ✨ Learn More
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Animated Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" fill="#FFF7ED">
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 1 }}
              fillOpacity="1" 
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            />
          </svg>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section ref={featuresRef} className="py-20 bg-orange-50">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
          >
            <motion.div variants={fadeIn} className="text-center mb-16">
              <span className="text-4xl mb-4 block">⭐</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4">
                Why Choose RaysVeda?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Experience the perfect blend of ancient wisdom and modern convenience
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: "🔱",
                  title: "Authentic Rituals",
                  description: "Traditional ceremonies performed by experienced priests following ancient Vedic traditions.",
                  color: "from-orange-400 to-red-500"
                },
                {
                  icon: "⏰",
                  title: "Convenient Scheduling",
                  description: "Book your spiritual sessions at your preferred time and date with easy online scheduling.",
                  color: "from-orange-400 to-amber-500"
                },
                {
                  icon: "💝",
                  title: "Personalized Experience",
                  description: "Customized spiritual guidance and rituals tailored to your specific needs and beliefs.",
                  color: "from-amber-400 to-orange-500"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={scaleUp}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-center group"
                >
                  <div className={`w-20 h-20 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-3xl">{feature.icon}</span>
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Services Section with Images */}
      <section ref={servicesRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={servicesInView ? "visible" : "hidden"}
          >
            <motion.div variants={fadeIn} className="text-center mb-16">
              <span className="text-4xl mb-4 block">🛕</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4">
                Our Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive spiritual services to guide you on your sacred journey
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  variants={scaleUp}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group"
                >
                  <Link to={service.link} className="block">
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
                      {/* Service Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={service.image} 
                          alt={service.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                          <span className="text-2xl">{service.icon}</span>
                        </div>
                      </div>
                      
                      {/* Service Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-orange-600 transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 mb-4 text-sm">{service.description}</p>
                        
                        {/* Service Features */}
                        <ul className="space-y-1 mb-4">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="text-xs text-gray-500 flex items-center">
                              <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2"></span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-orange-600 font-semibold text-sm">Explore Now</span>
                          <svg className="w-4 h-4 text-orange-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Explore Pujas Section */}
      <section ref={pujasRef} className="py-20 bg-gradient-to-br from-orange-50 to-amber-50 relative">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={pujasInView ? "visible" : "hidden"}
          >
            <motion.div variants={fadeIn} className="text-center mb-16">
              <span className="text-4xl mb-4 block">🪔</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4">
                Explore Our Pujas
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover our most popular sacred rituals and ceremonies, each designed to bring specific blessings into your life
              </p>
            </motion.div>
            
            {/* SINGLE LOGIN MESSAGE - CENTERED MODAL STYLE */}
            {showLoginMsg && (
              <>
                {/* Overlay */}
                <div 
                  className="fixed inset-0 bg-black/50 z-40"
                  onClick={() => setShowLoginMsg(false)}
                />
                
                {/* Modal */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-red-400 text-red-700 px-8 py-6 rounded-2xl shadow-2xl z-50 max-w-md w-full mx-4"
                >
                  <div className="text-center">
                    <div className="text-4xl mb-4">🔐</div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">Login Required</h3>
                    <p className="text-sm mb-6 text-gray-600">Please log in or sign up to book a puja.</p>
                    <div className="flex gap-3 justify-center">
                      <button 
                        onClick={() => setShowLoginMsg(false)}
                        className="bg-gray-600 text-white px-6 py-2 rounded-full text-sm hover:bg-gray-700 transition-colors"
                      >
                        Close
                      </button>
                      <button 
                        onClick={() => {
                          setShowLoginMsg(false)
                          navigate('/login')
                        }}
                        className="bg-orange-600 text-white px-6 py-2 rounded-full text-sm hover:bg-orange-700 transition-colors"
                      >
                        Login Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredPujas.map((puja, index) => (
                <motion.div 
                  key={puja.id}
                  variants={scaleUp}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={puja.image} 
                      alt={puja.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-serif font-semibold text-gray-800 mb-2">
                      {puja.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {puja.description}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-orange-600 font-medium">
                        Starting from {puja.price}
                      </span>
                      <button 
                        onClick={() => handlePujaBookNow(puja)}
                        className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-2 px-4 rounded-full font-semibold hover:from-orange-700 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl text-sm"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div variants={fadeIn} className="text-center mt-12">
              <Link 
                to="/puja" 
                className="inline-flex items-center bg-white text-orange-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-orange-50 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                🔍 View All Pujas
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Interactive Testimonials Section */}
      <section ref={testimonialsRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={testimonialsInView ? "visible" : "hidden"}
          >
            <motion.div variants={fadeIn} className="text-center mb-16">
              <span className="text-4xl mb-4 block">💬</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4">
                What Our Community Says
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Hear from thousands of satisfied devotees who have experienced divine blessings through RaysVeda
              </p>
            </motion.div>
            
            {/* Featured Testimonial */}
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="max-w-4xl mx-auto mb-12"
            >
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-3xl p-8 md:p-12 shadow-xl">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="relative">
                    <img 
                      src={testimonials[currentTestimonial].image} 
                      alt={testimonials[currentTestimonial].name}
                      className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover shadow-lg"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
                      <span className="text-xs">✓</span>
                    </div>
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex justify-center md:justify-start mb-4">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, idx) => (
                        <span key={idx} className="text-yellow-400 text-xl">⭐</span>
                      ))}
                    </div>
                    
                    <blockquote className="text-lg md:text-xl text-gray-700 mb-4 italic leading-relaxed">
                      "{testimonials[currentTestimonial].text}"
                    </blockquote>
                    
                    <div>
                      <h4 className="font-semibold text-gray-800 text-lg">
                        {testimonials[currentTestimonial].name}
                      </h4>
                      <p className="text-gray-600">{testimonials[currentTestimonial].location}</p>
                      <p className="text-orange-600 text-sm font-medium mt-1">
                        {testimonials[currentTestimonial].service}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Testimonial Navigation */}
            <div className="flex justify-center space-x-2 mb-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-orange-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
            
            {/* All Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.slice(0, 3).map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  variants={scaleUp}
                  whileHover={{ y: -5 }}
                  className="bg-white border border-gray-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, idx) => (
                      <span key={idx} className="text-yellow-400">⭐</span>
                    ))}
                  </div>
                  
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {testimonial.text}
                  </p>
                  
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <span className="text-xs text-orange-600 font-medium">
                      {testimonial.service}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced CTA Section - CHANGED TO MATCH THEME */}
      <section className="py-20 bg-gradient-to-br from-orange-100 via-orange-50 to-amber-50 text-gray-800 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-5xl mb-6 block">🙏</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 text-gray-800">
              Ready to Begin Your Spiritual Journey?
            </h2>
            <p className="text-xl max-w-3xl mx-auto mb-8 text-gray-600">
              Join thousands of devotees who have found peace, prosperity, and divine blessings through RaysVeda
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:from-orange-700 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={handleBookPujaClick}
              >
                🎯 Book a Puja Today
              </motion.button>
              
              <div className="flex items-center text-gray-600">
                <span className="text-sm">Or call us at</span>
                <a href="tel:+919161110130" className="ml-2 text-orange-600 font-semibold hover:text-orange-700 transition-colors">
                  📞 +91-9161-110-130
                </a>
              </div>
            </div>
            
            
          </motion.div>
        </div>
      </section>

      {/* Booking Form Modal */}
      {showBooking && (
        <BookPoojaForm 
          selectedPuja={selectedPuja} 
          onClose={() => setShowBooking(false)} 
        />
      )}
    </>
  )
}

export default HomePage