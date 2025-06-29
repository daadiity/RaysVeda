import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaHeart, FaShieldAlt, FaUsers, FaGift, FaCreditCard, FaUniversity, FaMobile, FaQrcode, FaHome, FaLeaf, FaHandsHelping, FaPray } from 'react-icons/fa'

const DonatePage = () => {
  const [donationAmount, setDonationAmount] = useState(1000)
  const [customAmount, setCustomAmount] = useState('')
  const [donationType, setDonationType] = useState('one-time')
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [selectedCause, setSelectedCause] = useState(null)
  
  const heroRef = useRef(null)
  const causesRef = useRef(null)
  const donateRef = useRef(null)
  const ritualRef = useRef(null)
  const impactRef = useRef(null)

  const heroInView = useInView(heroRef, { once: true })
  const causesInView = useInView(causesRef, { once: true })
  const donateInView = useInView(donateRef, { once: true })
  const ritualInView = useInView(ritualRef, { once: true })
  const impactInView = useInView(impactRef, { once: true })

  const presetAmounts = [501, 1001, 2501, 5001, 11000]

  const causes = [
    {
      id: 'food',
      title: 'Food for the Hungry',
      description: 'Provide nutritious meals to underprivileged families and children through Annadaan seva',
      impact: '₹501 can feed a family of 4 for a week',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      raised: 75,
      goal: 500000,
      icon: '🍽️',
      category: 'community',
      color: 'from-green-400 to-emerald-500'
    },
    {
      id: 'education',
      title: 'Education Support',
      description: 'Sponsor education for children who cannot afford schooling and spiritual learning',
      impact: '₹2001 can sponsor a child\'s education for a month',
      image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      raised: 60,
      goal: 1000000,
      icon: '📚',
      category: 'community',
      color: 'from-blue-400 to-indigo-500'
    },
    {
      id: 'healthcare',
      title: 'Healthcare Assistance',
      description: 'Medical support for those who cannot afford treatment and Ayurvedic care',
      impact: '₹1001 can provide basic medical care for 5 people',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      raised: 45,
      goal: 750000,
      icon: '⚕️',
      category: 'community',
      color: 'from-red-400 to-pink-500'
    },
    {
      id: 'cow-food',
      title: 'Gau Mata Food Donation',
      description: 'Provide nutritious fodder and food to sacred cows in need across various gaushalas',
      impact: '₹501 can feed 10 cows for a day',
      image: 'https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      raised: 80,
      goal: 800000,
      icon: '🐄', // Using emoji instead of FaCow
      category: 'gau-seva',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      id: 'cow-shelter',
      title: 'Cow Shelter & Protection',
      description: 'Support shelter construction and maintenance for abandoned and injured cows',
      impact: '₹5001 can shelter and care for a cow for a month',
      image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      raised: 55,
      goal: 1200000,
      icon: '🏠',
      category: 'gau-seva',
      color: 'from-amber-400 to-orange-500'
    },
    {
      id: 'cow-medical',
      title: 'Cow Medical Treatment',
      description: 'Emergency medical care and treatment for sick and injured sacred cows',
      impact: '₹2001 can provide medical treatment for 3 cows',
      image: 'https://images.unsplash.com/photo-1605627079748-36be8f8e8dc1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      raised: 40,
      goal: 600000,
      icon: '💊',
      category: 'gau-seva',
      color: 'from-emerald-400 to-teal-500'
    }
  ]

  const ritualDonations = [
    {
      id: 'daily-aarti',
      title: 'Daily Temple Aarti',
      description: 'Sponsor daily aarti and prayers at our sacred temple for divine blessings',
      amount: 1001,
      image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      benefits: ['Daily prayers in your name', 'Spiritual blessings', 'Divine protection'],
      icon: '🪔'
    },
    {
      id: 'food-offering',
      title: 'Prasadam Distribution',
      description: 'Sponsor prasadam distribution to devotees and community members',
      amount: 2501,
      image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      benefits: ['Blessed prasadam distribution', 'Community service', 'Spiritual merit'],
      icon: '🍯'
    },
    {
      id: 'special-puja',
      title: 'Special Puja Sponsorship',
      description: 'Sponsor special pujas and ceremonies for specific intentions and blessings',
      amount: 5001,
      image: 'https://images.unsplash.com/photo-1596785419491-1c9cd1aa2b86?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      benefits: ['Customized puja ritual', 'Personalized prayers', 'Sacred offerings'],
      icon: '🕉️'
    },
    {
      id: 'anna-daan',
      title: 'Annadaan Seva',
      description: 'Sponsor free meals for pilgrims, saints, and needy people at the temple',
      amount: 11000,
      image: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      benefits: ['Feed 100+ people', 'Highest spiritual merit', 'Divine abundance blessings'],
      icon: '🙏'
    }
  ]

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: <FaCreditCard /> },
    { id: 'upi', name: 'UPI', icon: <FaMobile /> },
    { id: 'netbanking', name: 'Net Banking', icon: <FaUniversity /> },
    { id: 'qr', name: 'QR Code', icon: <FaQrcode /> }
  ]

  const handleAmountSelect = (amount) => {
    setDonationAmount(amount)
    setCustomAmount('')
  }

  const handleCustomAmount = (value) => {
    setCustomAmount(value)
    setDonationAmount(parseInt(value) || 0)
  }

  const handleCauseSelect = (cause) => {
    setSelectedCause(cause)
    setDonationAmount(cause.impact.match(/₹(\d+)/)[1] || 1001)
    setCustomAmount('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-25 to-orange-100">
      {/* Enhanced Hero Section */}
      <section 
        ref={heroRef}
        className="relative py-24 px-4 text-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(251, 146, 60, 0.9), rgba(245, 101, 101, 0.9)), url('https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
        }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-white/10 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-white/10 rounded-full animate-pulse delay-500"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-white relative z-10"
        >
          <motion.span 
            initial={{ scale: 0, rotate: -180 }}
            animate={heroInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-7xl mb-6 block"
          >
            🙏
          </motion.span>
          
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
            Divine <span className="text-amber-200 bg-gradient-to-r from-amber-200 to-yellow-200 bg-clip-text text-transparent">Donation</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 leading-relaxed max-w-4xl mx-auto">
            Your sacred offering creates divine blessings and transforms lives through selfless service
          </p>
          
          <div className="flex justify-center items-center space-x-6 mb-8">
            <div className="flex items-center space-x-2">
              <FaHeart className="text-amber-300 text-2xl animate-pulse" />
              <span className="text-lg font-medium">Sacred Giving</span>
            </div>
            <div className="w-2 h-2 bg-amber-300 rounded-full"></div>
            <div className="flex items-center space-x-2">
              <span className="text-amber-300 text-2xl animate-pulse">🐄</span>
              <span className="text-lg font-medium">Gau Seva</span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-orange-600 px-8 py-4 rounded-full text-lg font-bold hover:bg-orange-50 transition-all duration-300 shadow-xl hover:shadow-2xl"
          >
            🎯 Start Your Divine Journey
          </motion.button>
        </motion.div>

        {/* Decorative Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" fill="#FFF7ED">
            <path fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Enhanced Causes Section */}
      <section ref={causesRef} className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={causesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-5xl mb-6 block">💝</span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-gray-800 mb-6">
              Sacred <span className="text-orange-600">Causes</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Choose the divine path of service that resonates with your heart and soul
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {causes.map((cause, index) => (
              <motion.div
                key={cause.id}
                initial={{ opacity: 0, y: 30 }}
                animate={causesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 border border-orange-100"
                onClick={() => handleCauseSelect(cause)}
              >
                {/* Enhanced Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={cause.image}
                    alt={cause.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  {/* Icon Badge */}
                  <div className={`absolute top-4 right-4 w-12 h-12 bg-gradient-to-r ${cause.color} rounded-full flex items-center justify-center text-white shadow-lg text-xl group-hover:scale-110 transition-transform`}>
                    {cause.icon}
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-semibold capitalize">
                    {cause.category.replace('-', ' ')}
                  </div>
                </div>

                {/* Enhanced Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-orange-600 transition-colors">
                    {cause.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed line-clamp-2">
                    {cause.description}
                  </p>
                  
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Progress</span>
                      <span className="text-orange-600 font-semibold">{cause.raised}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`bg-gradient-to-r ${cause.color} h-3 rounded-full transition-all duration-500`}
                        style={{ width: `${cause.raised}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Goal: ₹{cause.goal.toLocaleString()}
                    </p>
                  </div>
                  
                  <p className="text-sm text-orange-600 font-semibold mb-4 bg-orange-50 p-2 rounded-lg">
                    {cause.impact}
                  </p>
                  
                  <button className="w-full px-4 py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl hover:from-orange-700 hover:to-amber-700 transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:scale-105">
                    🎯 Donate Now
                  </button>

                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Ritual Donations Section */}
      <section ref={ritualRef} className="py-20 px-4 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ritualInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-5xl mb-6 block">🕉️</span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-gray-800 mb-6">
              Ritual <span className="text-orange-600">Sponsorship</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Sponsor sacred rituals and ceremonies to receive divine blessings and spiritual merit
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ritualDonations.map((ritual, index) => (
              <motion.div
                key={ritual.id}
                initial={{ opacity: 0, y: 30 }}
                animate={ritualInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-orange-100 group"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={ritual.image}
                    alt={ritual.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-3 right-3 bg-orange-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg">
                    {ritual.icon}
                  </div>
                </div>
                
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{ritual.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{ritual.description}</p>
                  
                  <div className="mb-4">
                    <div className="text-2xl font-bold text-orange-600 mb-2">₹{ritual.amount.toLocaleString()}</div>
                    <ul className="space-y-1">
                      {ritual.benefits.map((benefit, idx) => (
                        <li key={idx} className="text-xs text-gray-600 flex items-center">
                          <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2"></span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <button 
                    onClick={() => handleAmountSelect(ritual.amount)}
                    className="w-full py-2 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-lg hover:from-orange-700 hover:to-amber-700 transition-all duration-300 font-semibold text-sm shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    Sponsor Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Donation Form Section */}
      <section ref={donateRef} className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={donateInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-5xl mb-6 block">💰</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4">
              Complete Your <span className="text-orange-600">Sacred Offering</span>
            </h2>
            <p className="text-xl text-gray-600">
              Simple, secure, and blessed donation process
            </p>
          </motion.div>

          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-8 shadow-xl border-2 border-orange-100">
            {/* Selected Cause Display */}
            {selectedCause && (
              <div className="mb-8 p-4 bg-white rounded-2xl border border-orange-200">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <span className="mr-2 text-xl">{selectedCause.icon}</span>
                  Selected Cause: {selectedCause.title}
                </h4>
                <p className="text-sm text-gray-600">{selectedCause.description}</p>
              </div>
            )}

            {/* Donation Type */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                🔄 Donation Type
              </h3>
              <div className="flex gap-4">
                <button
                  onClick={() => setDonationType('one-time')}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                    donationType === 'one-time'
                      ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg'
                      : 'bg-white text-gray-600 border-2 border-orange-200 hover:border-orange-400'
                  }`}
                >
                  One-time Blessing
                </button>
                <button
                  onClick={() => setDonationType('monthly')}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                    donationType === 'monthly'
                      ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg'
                      : 'bg-white text-gray-600 border-2 border-orange-200 hover:border-orange-400'
                  }`}
                >
                  Monthly Seva
                </button>
              </div>
            </div>

            {/* Enhanced Amount Selection */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                💰 Select Sacred Amount
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
                {presetAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handleAmountSelect(amount)}
                    className={`py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                      donationAmount === amount && !customAmount
                        ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg transform scale-105'
                        : 'bg-white text-gray-600 border-2 border-orange-200 hover:border-orange-400 hover:scale-105'
                    }`}
                  >
                    ₹{amount}
                  </button>
                ))}
              </div>
              <input
                type="number"
                placeholder="Enter your blessed amount"
                value={customAmount}
                onChange={(e) => handleCustomAmount(e.target.value)}
                className="w-full py-4 px-4 rounded-xl border-2 border-orange-200 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-lg"
              />
            </div>

            {/* Enhanced Payment Method */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                💳 Payment Method
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`flex flex-col items-center justify-center py-4 px-4 rounded-xl font-medium transition-all duration-300 ${
                      paymentMethod === method.id
                        ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg transform scale-105'
                        : 'bg-white text-gray-600 border-2 border-orange-200 hover:border-orange-400 hover:scale-105'
                    }`}
                  >
                    <span className="mb-2 text-2xl">{method.icon}</span>
                    <span className="text-sm">{method.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Enhanced Donation Summary */}
            <div className="bg-white rounded-2xl p-6 mb-8 border-2 border-orange-200 shadow-lg">
              <h4 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                <span className="mr-2">📋</span>
                Donation Summary
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Sacred Amount:</span>
                  <span className="font-bold text-gray-800 text-lg">
                    ₹{donationAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-semibold text-gray-800 capitalize">
                    {donationType === 'one-time' ? 'One-time Blessing' : 'Monthly Seva'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Processing Fee:</span>
                  <span className="font-semibold text-green-600">₹0 (Free)</span>
                </div>
                <div className="border-t-2 border-orange-100 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-800">Total Offering:</span>
                    <span className="text-2xl font-bold text-orange-600">
                      ₹{donationAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Security Features */}
            <div className="flex flex-wrap items-center justify-center gap-6 mb-8 text-sm text-gray-600">
              <div className="flex items-center bg-white p-3 rounded-lg border border-orange-100">
                <FaShieldAlt className="text-green-500 mr-2 text-lg" />
                <span className="font-medium">100% Secure</span>
              </div>
              <div className="flex items-center bg-white p-3 rounded-lg border border-orange-100">
                <FaUsers className="text-blue-500 mr-2 text-lg" />
                <span className="font-medium">Tax Deductible</span>
              </div>
              <div className="flex items-center bg-white p-3 rounded-lg border border-orange-100">
                <FaGift className="text-purple-500 mr-2 text-lg" />
                <span className="font-medium">Transparent Use</span>
              </div>
            </div>

            {/* Enhanced Donate Button */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-5 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 text-white rounded-2xl font-bold text-xl hover:from-orange-700 hover:via-amber-700 hover:to-orange-700 transition-all duration-300 shadow-xl hover:shadow-2xl border-2 border-orange-400"
            >
              🙏 Complete Sacred Donation - ₹{donationAmount.toLocaleString()}
            </motion.button>
          </div>
        </div>
      </section>

      {/* Enhanced Impact Section */}
      <section ref={impactRef} className="py-20 px-4 bg-gradient-to-br from-orange-600 via-orange-500 to-amber-600 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='40' cy='40' r='3'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={impactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-6xl mb-8 block">🌟</span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-12 leading-tight">
              Divine Impact Through <span className="text-amber-200">Your Blessings</span>
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {/*
                Uncomment and modify the stats as per your requirements
                { [
                  { number: '50,000+', label: 'Sacred Meals Served', icon: '🍽️' },
                  { number: '2,500+', label: 'Children Educated', icon: '📚' },
                  { number: '1,200+', label: 'Cows Protected', icon: '🐄' },
                  { number: '15,000+', label: 'Medical Treatments', icon: '⚕️' }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={impactInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300"
                  >
                    <div className="text-4xl mb-3">{stat.icon}</div>
                    <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                    <div className="text-lg opacity-90">{stat.label}</div>
                  </motion.div>
                ))}
              */}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default DonatePage

