import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import ServiceCard from '../components/home/ServiceCard'
import PujaCard from '../components/home/PujaCard'

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
}

const HomePage = () => {
  const aboutRef = useRef(null)
  const servicesRef = useRef(null)
  const pujaRef = useRef(null)
  
  const aboutInView = useInView(aboutRef, { once: true, margin: "-100px" })
  const servicesInView = useInView(servicesRef, { once: true, margin: "-100px" })
  const pujaInView = useInView(pujaRef, { once: true, margin: "-100px" })

  const services = [
    {
      id: 1,
      title: "Pran Pratishtha",
      description: "Sacred ceremony to invoke divine energy into statues and images, bringing them to life.",
      image: "https://images.pexels.com/photos/7919635/pexels-photo-7919635.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      link: "/services/pran-pratishtha"
    },
    {
      id: 2,
      title: "Puja",
      description: "Traditional worship ritual to honor deities, seeking blessings and divine grace.",
      image: "https://https://media.gettyimages.com/id/1427967072/photo/woman-from-bihar-offers-prayers-to-the-sun-in-the-early-morning-hours-during-chhath-puja.jpg?s=612x612&w=gi&k=20&c=jFVXluKx8eGpwwQYA_4VxRApuKSSzmwO8qsR28b-L9s=.pexels.com/photos/12366057/pexels-photo-12366057.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gettyimages.com%2Fphotos%2Fchhath-puja&psig=AOvVaw3ViTmyrkUPCf65chfE-3EA&ust=1748494117083000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJDNwbiuxY0DFQAAAAAdAAAAABAL",
      link: "/services/puja"
    },
    {
      id: 3,
      title: "Hawan",
      description: "Ancient Vedic fire ritual for purification, offerings, and invoking divine blessings.",
      image: "https://www.angirarajasthan.in/cdn/shop/articles/banner.jpg?v=1725092073",
      link: "/services/hawan"
    },
    {
      id: 4,
      title: "Kundli",
      description: "Vedic astrology chart analysis to understand planetary influences and life predictions.",
      image: "https://images.pexels.com/photos/338936/pexels-photo-338936.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      link: "/services/kundli"
    },
    {
      id: 5,
      title: "Numerology",
      description: "Uncover insights into your personality, destiny, and life path through the power of numbers.",
      image: "https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      link: "/services/numerology"
    },
    {
      id: 6,
      title: "Vastu",
      description: "Harmonize your living and working spaces with ancient architectural principles for prosperity and well-being.",
      image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      link: "/services/vastu"
    },
  ]

  const pujas = [
    {
      id: 1,
      title: "Shri Narayan Puja",
      description: "This Pooja calms down your mind, sharpens your focus in life, helps in the overcoming of financial issues, delivers good fortune, avoids evil and helps to gain happiness!",
      image: "https://w0.peakpx.com/wallpaper/627/1008/HD-wallpaper-lord-vishnu-animated-lord-vishnu-animated-lord-narayana-preserver-god",
      price: "₹1,501",
      link: "/puja/shri-narayan"
    },
    {
      id: 2,
      title: "Shri Ganpati Puja",
      description: "Represents sweetness & auspicious beginnings & offers blessings for achieving goals, aspirations as well as remove obstacles & bring good fortune!",
      image: "https://images.pexels.com/photos/6150432/pexels-photo-6150432.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: "₹1,801",
      link: "/puja/shri-ganpati"
    },
    {
      id: 3,
      title: "Shri Shiv Puja",
      description: "For blessings of Lord Shiva for spiritual growth, inner peace, and removal of obstacles, ensuring prosperity and well-being.",
      image: "https://images.pexels.com/photos/7919833/pexels-photo-7919833.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: "₹2,101",
      link: "/puja/shri-shiv"
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-white text-center">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: `url('https://images.pexels.com/photos/220201/pexels-photo-220201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')` }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="relative z-10 px-4">
          <motion.h1 
            className="text-4xl md:text-6xl font-serif font-bold mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Your Journey to Inner Peace
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Experience authentic Vedic rituals and spiritual guidance from the comfort of your home
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link to="/puja/booking" className="btn-primary">
              Book a Puja Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 bg-orange-50" ref={aboutRef}>
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate={aboutInView ? "visible" : "hidden"}
          >
            <h2 className="section-heading">About RaysVeda</h2>
            <p className="section-subheading">
              Our mission is to bring ancient Vedic wisdom to the modern world, fostering spiritual growth and well-being.
            </p>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <img 
                  src="https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Vedic knowledge" 
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>
              <div className="md:w-1/2 text-gray-700 leading-relaxed">
                <p className="mb-4">
                  RaysVeda is a trusted platform dedicated to preserving and promoting authentic Vedic traditions. We connect individuals with experienced pandits and spiritual guides who conduct personalized pujas, rituals, and consultations online.
                </p>
                <p className="mb-4">
                  Our services are designed to help you navigate life's challenges, find inner peace, and attract positive energy, all from the comfort and convenience of your home. We believe in the transformative power of ancient wisdom to enrich modern lives.
                </p>
                <Link to="/about" className="text-primary-600 hover:text-primary-800 font-medium inline-flex items-center">
                  Learn more about us
                  <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-white" ref={servicesRef}>
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate={servicesInView ? "visible" : "hidden"}
          >
            <h2 className="section-heading">Our Services</h2>
            <p className="section-subheading">
              A wide range of spiritual services tailored to your needs
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link to="/services" className="btn-primary">
                Explore All Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Puja Section */}
      <section className="py-16 md:py-24 bg-orange-50" ref={pujaRef}>
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate={pujaInView ? "visible" : "hidden"}
          >
            <h2 className="section-heading">Explore Puja</h2>
            <p className="section-subheading">
              Discover various types of pujas for different purposes and deities
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pujas.map((puja) => (
                <PujaCard key={puja.id} puja={puja} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link to="/puja" className="btn-primary">
                Explore More Pujas
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary-600 to-accent-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">
            Begin Your Spiritual Journey Today
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Experience the divine blessings and inner peace through our authentic spiritual services
          </p>
          <Link to="/puja/booking" className="btn bg-white text-primary-700 hover:bg-gray-100">
            Book a Puja
          </Link>
        </div>
      </section>
    </>
  )
}

export default HomePage