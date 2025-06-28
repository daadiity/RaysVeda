import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaHeart, FaUserFriends, FaGraduationCap, FaMedkit, FaHome, FaUtensils } from 'react-icons/fa'

const CharitableProgramPage = () => {
  const [activeTab, setActiveTab] = useState('food')
  const heroRef = useRef(null)
  const servicesRef = useRef(null)
  const impactRef = useRef(null)

  const heroInView = useInView(heroRef, { once: true })
  const servicesInView = useInView(servicesRef, { once: true })
  const impactInView = useInView(impactRef, { once: true })

  const services = {
    food: {
      title: 'Food Distribution',
      icon: <FaUtensils className="w-8 h-8" />,
      description: 'Providing nutritious meals to those in need across communities',
      programs: [
        { name: 'Daily Meal Programs', beneficiaries: '500+ daily', description: 'Free meals served to underprivileged communities' },
        { name: 'Festival Food Drives', beneficiaries: '2000+ per event', description: 'Special food distribution during festivals' },
        { name: 'Emergency Relief', beneficiaries: 'As needed', description: 'Food support during natural disasters and emergencies' }
      ],
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    education: {
      title: 'Education Support',
      icon: <FaGraduationCap className="w-8 h-8" />,
      description: 'Empowering communities through education and skill development',
      programs: [
        { name: 'Scholarship Programs', beneficiaries: '200+ students', description: 'Financial support for underprivileged students' },
        { name: 'Adult Literacy', beneficiaries: '150+ adults', description: 'Basic education for adults who missed schooling' },
        { name: 'Skill Development', beneficiaries: '300+ trainees', description: 'Vocational training for employment opportunities' }
      ],
      image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    healthcare: {
      title: 'Healthcare Assistance',
      icon: <FaMedkit className="w-8 h-8" />,
      description: 'Ensuring healthcare access for all community members',
      programs: [
        { name: 'Free Health Camps', beneficiaries: '1000+ per camp', description: 'Regular health checkups and basic treatment' },
        { name: 'Medicine Distribution', beneficiaries: '800+ monthly', description: 'Free medicines for chronic conditions' },
        { name: 'Emergency Medical Aid', beneficiaries: 'As needed', description: 'Financial support for critical medical procedures' }
      ],
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    }
  }

  const impactStats = [
    { number: '10,000+', label: 'Lives Touched', icon: <FaHeart /> },
    { number: '50+', label: 'Communities Served', icon: <FaHome /> },
    { number: '5+', label: 'Years of Service', icon: <FaUserFriends /> },
    { number: '25+', label: 'Active Programs', icon: <FaGraduationCap /> }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-25 to-amber-50">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative py-20 px-4 text-center"
        style={{
          backgroundImage: `linear-gradient(rgba(251, 146, 60, 0.8), rgba(251, 146, 60, 0.8)), url('https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-white"
        >
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
            Charitable <span className="text-amber-200">Programs</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 leading-relaxed">
            Extending compassion through service, touching lives with love and care
          </p>
          <div className="flex justify-center items-center space-x-4">
            <FaHeart className="text-amber-300 text-2xl animate-pulse" />
            <span className="text-lg font-medium">Seva Through Love</span>
            <FaHeart className="text-amber-300 text-2xl animate-pulse" />
          </div>
        </motion.div>
      </section>

      {/* Services Tabs Section */}
      <section ref={servicesRef} className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-serif font-bold text-gray-800 mb-4">
              Our Charitable Programs
            </h2>
            <p className="text-xl text-gray-600">
              Three pillars of our service to humanity
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-full p-2 shadow-lg border border-orange-100">
              {Object.entries(services).map(([key, service]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                    activeTab === key
                      ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                  }`}
                >
                  {service.icon}
                  <span className="font-medium">{service.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden border border-orange-100"
          >
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src={services[activeTab].image}
                  alt={services[activeTab].title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <h3 className="text-3xl font-serif font-bold text-gray-800 mb-4">
                  {services[activeTab].title}
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  {services[activeTab].description}
                </p>
                <div className="space-y-4">
                  {services[activeTab].programs.map((program, index) => (
                    <div key={index} className="border-l-4 border-orange-400 pl-4 bg-orange-50 p-3 rounded-r-lg">
                      <h4 className="font-semibold text-gray-800">{program.name}</h4>
                      <p className="text-sm text-orange-600 font-medium">{program.beneficiaries}</p>
                      <p className="text-gray-600">{program.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section ref={impactRef} className="py-16 px-4 bg-gradient-to-br from-orange-600 via-orange-500 to-amber-600 text-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={impactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-serif font-bold mb-4">Our Impact</h2>
            <p className="text-xl opacity-90">
              Measuring success through lives transformed
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={impactInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300"
              >
                <div className="text-4xl mb-2 flex justify-center text-amber-200">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 text-center bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-serif font-bold text-gray-800 mb-6">
            Join Our Mission of Service
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Together, we can create a more compassionate world through selfless service
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-lg hover:from-orange-700 hover:to-amber-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
              Volunteer With Us
            </button>
            <button className="px-8 py-4 border-2 border-orange-600 text-orange-600 rounded-lg hover:bg-orange-600 hover:text-white transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
              Make a Donation
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CharitableProgramPage