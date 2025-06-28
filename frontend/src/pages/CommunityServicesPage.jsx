import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaUsers, FaHandsHelping, FaLeaf, FaTools, FaCalendarAlt, FaMapMarkerAlt, FaHeart } from 'react-icons/fa'

const CommunityServicesPage = () => {
  const [selectedProgram, setSelectedProgram] = useState(null)
  const heroRef = useRef(null)
  const programsRef = useRef(null)
  const eventsRef = useRef(null)

  const heroInView = useInView(heroRef, { once: true })
  const programsInView = useInView(programsRef, { once: true })
  const eventsInView = useInView(eventsRef, { once: true })

  const programs = [
    {
      id: 1,
      title: 'Community Clean-Up Drives',
      icon: <FaLeaf className="w-8 h-8" />,
      description: 'Regular community cleaning initiatives to maintain cleanliness and environmental awareness',
      frequency: 'Every Sunday',
      participants: '100+ volunteers',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      activities: [
        'Street cleaning and waste segregation',
        'Tree plantation drives',
        'Awareness campaigns on environmental protection',
        'Community garden maintenance'
      ],
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 2,
      title: 'Skill Development Workshops',
      icon: <FaTools className="w-8 h-8" />,
      description: 'Free workshops to develop practical skills for better employment opportunities',
      frequency: 'Monthly',
      participants: '50+ per session',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      activities: [
        'Computer literacy training',
        'Handicraft and artisan skills',
        'Financial literacy workshops',
        'Entrepreneurship guidance'
      ],
      color: 'from-amber-500 to-orange-600'
    },
    {
      id: 3,
      title: 'Elder Care Programs',
      icon: <FaHandsHelping className="w-8 h-8" />,
      description: 'Supporting elderly community members with care, companionship, and assistance',
      frequency: 'Daily visits',
      participants: '30+ volunteers',
      image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      activities: [
        'Home visits and companionship',
        'Medical assistance and check-ups',
        'Grocery shopping and errands',
        'Technology assistance'
      ],
      color: 'from-rose-500 to-pink-600'
    }
  ]

  const upcomingEvents = [
    {
      date: 'Mar 15, 2024',
      title: 'Community Health Camp',
      location: 'Local Community Center',
      description: 'Free health checkups and medical consultations',
      icon: <FaHeart className="w-6 h-6" />
    },
    {
      date: 'Mar 22, 2024',
      title: 'Plantation Drive',
      location: 'City Park',
      description: 'Plant 500 saplings for a greener community',
      icon: <FaLeaf className="w-6 h-6" />
    },
    {
      date: 'Apr 5, 2024',
      title: 'Digital Literacy Workshop',
      location: 'Community Hall',
      description: 'Teaching basic computer skills to seniors',
      icon: <FaTools className="w-6 h-6" />
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-25 to-orange-100">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative py-20 px-4 text-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(251, 146, 60, 0.85), rgba(245, 101, 101, 0.85)), url('https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
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
          className="max-w-4xl mx-auto text-white relative z-10"
        >
          <motion.span 
            initial={{ scale: 0 }}
            animate={heroInView ? { scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl mb-6 block"
          >
            🤝
          </motion.span>
          
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
            Community <span className="text-amber-200">Services</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 leading-relaxed">
            Building stronger communities through collective action and shared responsibility
          </p>
          
          <div className="flex justify-center items-center space-x-4">
            <FaUsers className="text-amber-300 text-2xl animate-pulse" />
            <span className="text-lg font-medium">United We Serve</span>
            <FaUsers className="text-amber-300 text-2xl animate-pulse" />
          </div>
        </motion.div>

        {/* Decorative Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" fill="#FFF7ED">
            <path fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Programs Section */}
      <section ref={programsRef} className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={programsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-4xl mb-4 block">🌟</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4">
              Our Community Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Empowering communities through organized service initiatives that create lasting positive impact
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 30 }}
                animate={programsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
                onClick={() => setSelectedProgram(program)}
              >
                {/* Image with Overlay */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  {/* Icon Badge */}
                  <div className={`absolute top-4 right-4 w-12 h-12 bg-gradient-to-r ${program.color} rounded-full flex items-center justify-center text-white shadow-lg`}>
                    {program.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="text-orange-600 mr-3 group-hover:scale-110 transition-transform">
                      {program.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
                      {program.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {program.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm">
                      <div className="text-orange-600 font-semibold">{program.frequency}</div>
                      <div className="text-gray-500">{program.participants}</div>
                    </div>
                    <div className="bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-sm font-medium">
                      Learn More →
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section ref={eventsRef} className="py-16 px-4 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={eventsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-4xl mb-4 block">📅</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4">
              Upcoming Events
            </h2>
            <p className="text-xl text-gray-600">
              Join us in making a difference in our community
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={eventsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100 group hover:-translate-y-1"
              >
                {/* Date Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <FaCalendarAlt className="text-orange-600 text-xl mr-3" />
                    <span className="text-orange-600 font-semibold">{event.date}</span>
                  </div>
                  <div className="text-orange-500 group-hover:scale-110 transition-transform">
                    {event.icon}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-orange-600 transition-colors">
                  {event.title}
                </h3>
                
                <div className="flex items-center mb-3">
                  <FaMapMarkerAlt className="text-gray-400 mr-2 text-sm" />
                  <span className="text-gray-600 text-sm">{event.location}</span>
                </div>
                
                <p className="text-gray-600 mb-4">{event.description}</p>
                
                <button className="w-full py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-lg hover:from-orange-700 hover:to-amber-700 transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:scale-105">
                  Register Now
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Detail Modal */}
      {selectedProgram && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl border border-orange-100"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                {selectedProgram.title}
              </h3>
              <button
                onClick={() => setSelectedProgram(null)}
                className="text-gray-400 hover:text-gray-600 text-3xl font-light transition-colors hover:rotate-90 transform duration-300"
              >
                ×
              </button>
            </div>
            
            <div className="relative mb-6 rounded-lg overflow-hidden">
              <img
                src={selectedProgram.image}
                alt={selectedProgram.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4 w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white shadow-lg">
                {selectedProgram.icon}
              </div>
            </div>
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              {selectedProgram.description}
            </p>
            
            <h4 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
              <span className="mr-2">✨</span>
              Program Activities:
            </h4>
            
            <ul className="space-y-3 mb-6">
              {selectedProgram.activities.map((activity, index) => (
                <li key={index} className="flex items-center text-gray-600 bg-orange-50 p-3 rounded-lg">
                  <div className="w-3 h-3 bg-orange-600 rounded-full mr-3 flex-shrink-0"></div>
                  {activity}
                </li>
              ))}
            </ul>
            
            <div className="flex justify-between items-center bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-lg">
              <div className="text-sm">
                <div className="text-orange-600 font-semibold text-lg">{selectedProgram.frequency}</div>
                <div className="text-gray-600">{selectedProgram.participants}</div>
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-lg hover:from-orange-700 hover:to-amber-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
                Join This Program
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-br from-orange-600 via-orange-500 to-amber-600 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-5xl mb-6 block">💪</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
              Be the Change You Want to See
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              Every small act of service creates ripples of positive change in our community. Join us in building a better tomorrow.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-orange-600 rounded-full hover:bg-orange-50 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
              >
                🙋‍♂️ Become a Volunteer
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-white text-white rounded-full hover:bg-white hover:text-orange-600 transition-all duration-300 font-semibold"
              >
                🚀 Start a Program
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default CommunityServicesPage