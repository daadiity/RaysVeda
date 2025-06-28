import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom' // Add useNavigate
import { motion, useInView, AnimatePresence } from 'framer-motion' // Add AnimatePresence
import { useAuth } from '../context/AuthContext'
import BookPoojaForm from '../components/BookPoojaForm'

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
}

const PujaPage = () => {
  const navigate = useNavigate() // Add navigate hook
  const pujasRef = useRef(null)
  const pujasInView = useInView(pujasRef, { once: true, margin: "-100px" })
  const [showBooking, setShowBooking] = useState(false)
  const [selectedPuja, setSelectedPuja] = useState(null)
  const [showLoginMsg, setShowLoginMsg] = useState(false)
  const { user } = useAuth()

  const pujas = [
    {
      id: 1,
      title: "Shri Narayan Puja",
      description: "This Pooja calms down your mind, sharpens your focus in life, helps in the overcoming of financial issues, delivers good fortune, avoids evil and helps to gain happiness!",
      image: "https://i.pinimg.com/736x/47/a2/37/47a23755394a44cd1b8e543472160e13.jpg",
      price: "₹1,501",
      amount: 1501,
      link: "/puja/shri-narayan"
    },
    {
      id: 2,
      title: "Shri Ganpati Puja",
      description: "Represents sweetness & auspicious beginnings & offers blessings for achieving goals, aspirations as well as remove obstacles & bring good fortune!",
      image: "https://i.pinimg.com/736x/2e/6d/6f/2e6d6f7119a936f6caabce62b5018d4b.jpg",
      price: "₹1,101",
      amount: 1101,
      link: "/puja/shri-ganpati"
    },
    {
      id: 3,
      title: "Maa Lakshmi Puja",
      description: "The blessings of the goddess come in the form of prosperity, she keeps the chanter in her good graces, health, wealth & prosperity into home!",
      image: "https://i.pinimg.com/736x/50/b0/dc/50b0dc13deb8d141838f77c216549560.jpg",
      price: "₹2,101",
      amount: 2101,
      link: "/puja/maa-lakshmi"
    },
    {
      id: 4,
      title: "Shri Shiva Puja",
      description: "Lord Shiva destroys negative energies and brings positive transformation. This puja helps overcome obstacles, provides protection, and grants inner peace.",
      image: "https://i.pinimg.com/736x/c6/da/a2/c6daa23adb2fce39cc1c7c9d45e745b1.jpg",
      price: "₹1,501",
      amount: 1501,
      link: "/puja/shri-shiva"
    },
    {
      id: 5,
      title: "Durga Puja",
      description: "Worship of the divine mother for strength, courage, and protection. Helps overcome enemies, removes obstacles, and provides divine protection.",
      image: "https://i.pinimg.com/736x/74/c3/7c/74c37ccfb43ecb7ff135e16514d26d50.jpg",
      price: "₹2,501",
      amount: 2501,
      link: "/puja/durga"
    },
    {
      id: 6,
      title: "Satyanarayan Puja",
      description: "A ritual worship of Lord Vishnu that brings prosperity, peace, happiness, and spiritual growth to the devotees and their families.",
      image: "https://i.pinimg.com/736x/37/b4/b8/37b4b827e49fe360d930bdfc39081caa.jpg",
      price: "₹3,101",
      amount: 3101,
      link: "/puja/satyanarayan"
    }
  ]

  // Handler for Book a Puja Now button (used in both hero and CTA)
  const handleBookPujaClick = () => {
    if (!user) {
      setShowLoginMsg(true)
      // Remove auto-hide for better UX
      return
    }
    setSelectedPuja(null)
    setShowBooking(true)
  }

  // Handler for individual puja Book Now buttons
  const handlePujaBookNow = (puja) => {
    if (!user) {
      setShowLoginMsg(true)
      // Remove auto-hide for better UX
      return
    }
    setSelectedPuja(puja)
    setShowBooking(true)
  }

  // Close login modal
  const closeLoginModal = () => {
    setShowLoginMsg(false)
  }

  // Navigate to login
  const handleLoginRedirect = () => {
    setShowLoginMsg(false)
    navigate('/login')
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-r from-primary-500 to-accent-500 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-serif font-bold mb-6"
            >
              Sacred Pujas for Divine Blessings
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl mb-8"
            >
              Experience authentic and traditional pujas performed by experienced priests to invite divine blessings, prosperity, and peace into your life.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <button
                className="btn bg-white text-primary-700 hover:bg-gray-100"
                onClick={handleBookPujaClick}
              >
                Book a Puja Now
              </button>
              {/* REMOVED: Inline login message - will use modal instead */}
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" fill="#FFF7ED">
            <path fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* What is a Puja Section */}
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="section-heading">What is a Puja?</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Puja is a sacred ritual in Hinduism performed to honor, worship, and show devotion to deities. It's a spiritual practice that connects the devotee with the divine through offerings, mantras, and various ritual elements.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Each puja has specific procedures, mantras, and offerings tailored to the deity being worshipped. The ritual typically includes elements like incense, flowers, fruits, sweets, and sacred items, all offered with devotion and specific prayers.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Performing pujas regularly can bring divine blessings, remove obstacles, promote peace, prosperity, and spiritual growth. Our experienced priests ensure that each ritual is performed with authentic procedures and sincere devotion.
            </p>
          </div>
        </div>
      </section>

      {/* Explore Our Pujas Section */}
      <section ref={pujasRef} className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate={pujasInView ? "visible" : "hidden"}
          >
            <h2 className="section-heading">Explore Our Pujas</h2>
            <p className="section-subheading">
              Choose from our wide range of traditional pujas to fulfill your spiritual needs
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pujas.map((puja) => (
                <motion.div 
                  key={puja.id}
                  className="card h-full flex flex-col"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={puja.image} 
                      alt={puja.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-serif font-semibold text-gray-800 mb-2">
                      {puja.title}
                    </h3>
                    <p className="text-gray-600 mb-4 flex-grow">
                      {puja.description}
                    </p>
                    <div className="flex justify-between items-center mt-auto">
                      <span className="text-accent-600 font-medium">
                        Starting from {puja.price}
                      </span>
                      <button 
                        onClick={() => handlePujaBookNow(puja)}
                        className="btn-primary"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-orange-50">
        <div className="container mx-auto px-4">
          <h2 className="section-heading">How It Works</h2>
          <p className="section-subheading">
            Our simple process to bring divine blessings into your life
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary-500 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Choose Your Puja</h3>
              <p className="text-gray-600">
                Select from our wide range of authentic pujas based on your spiritual needs
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary-500 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Book a Date</h3>
              <p className="text-gray-600">
                Schedule your puja on an auspicious date convenient for you
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary-500 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Puja Performance</h3>
              <p className="text-gray-600">
                Our experienced priests perform the puja with authentic rituals and mantras
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary-500 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
              <h3 className="text-xl font-semibold mb-2">Receive Blessings</h3>
              <p className="text-gray-600">
                Get sacred prasad delivered to your home along with the priest's blessings
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-heading">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="bg-orange-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Can I attend the puja virtually?</h3>
                <p className="text-gray-700">
                  Yes, we offer virtual attendance options for most of our pujas. You can join via video call and participate in the ritual from anywhere in the world.
                </p>
              </div>
              <div className="bg-orange-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">What items are included in the prasad package?</h3>
                <p className="text-gray-700">
                  The prasad package typically includes sacred items like kumkum, vibhuti (sacred ash), blessed sweets, and a small deity idol or yantra depending on the type of puja performed.
                </p>
              </div>
              <div className="bg-orange-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">How do I prepare for the puja?</h3>
                <p className="text-gray-700">
                  Once you book a puja, we will provide you with specific guidelines for preparation, which may include fasting, cleansing, and setting up a sacred space. Our team will guide you through the entire process.
                </p>
              </div>
              <div className="bg-orange-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Can I request a specific priest for my puja?</h3>
                <p className="text-gray-700">
                  Yes, you can request a specific priest based on availability. Our priests are well-versed in various Vedic traditions and can perform rituals according to different regional customs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">
            Ready to Experience Divine Blessings?
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Book a puja today and invite peace, prosperity, and divine grace into your life
          </p>
          <button
            className="btn bg-white text-primary-700 hover:bg-gray-100"
            onClick={handleBookPujaClick}
          >
            Book a Puja Now
          </button>
          {/* REMOVED: Inline login message - will use modal instead */}
        </div>
      </section>

      {/* Login Modal - Consistent with HomePage */}
      <AnimatePresence>
        {showLoginMsg && (
          <>
            {/* Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={closeLoginModal}
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-red-400 px-8 py-6 rounded-2xl shadow-2xl z-50 max-w-md w-full mx-4"
            >
              <div className="text-center">
                <div className="text-4xl mb-4">🔐</div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Login Required</h3>
                <p className="text-sm mb-6 text-gray-600">Please log in or sign up to book a puja and access all features.</p>
                <div className="flex gap-3 justify-center">
                  <button 
                    onClick={closeLoginModal}
                    className="bg-gray-600 text-white px-6 py-2 rounded-full text-sm hover:bg-gray-700 transition-colors"
                  >
                    Close
                  </button>
                  <button 
                    onClick={handleLoginRedirect}
                    className="bg-orange-600 text-white px-6 py-2 rounded-full text-sm hover:bg-orange-700 transition-colors"
                  >
                    Login Now
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Booking Form Modal */}
      <AnimatePresence>
        {showBooking && (
          <BookPoojaForm 
            selectedPuja={selectedPuja} 
            onClose={() => setShowBooking(false)} 
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default PujaPage