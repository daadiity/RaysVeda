import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { FaQuoteLeft } from 'react-icons/fa' // Added FaQuoteLeft import

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
}

const ServicesPage = () => {
  const servicesRef = useRef(null)
  const servicesInView = useInView(servicesRef, { once: true, margin: "-100px" })

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
      image: "https://images.pexels.com/photos/12366057/pexels-photo-12366057https://media.gettyimages.com/id/1427967072/photo/woman-from-bihar-offers-prayers-to-the-sun-in-the-early-morning-hours-during-chhath-puja.jpg?s=612x612&w=gi&k=20&c=jFVXluKx8eGpwwQYA_4VxRApuKSSzmwO8qsR28b-L9s=.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gettyimages.com%2Fphotos%2Fchhath-puja&psig=AOvVaw3ViTmyrkUPCf65chfE-3EA&ust=1748494117083000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJDNwbiuxY0DFQAAAAAdAAAAABAL",
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

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Devotee",
      content: "The services provided by RaysVeda are exceptional. I booked a Pran Pratishtha ceremony, and it was conducted with utmost devotion and authenticity. Truly a divine experience!",
      image: "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: 2,
      name: "Ravi Kumar",
      role: "Businessman",
      content: "I sought a Kundli consultation, and the insights provided were incredibly accurate and helpful for my business decisions. The remedies suggested have brought positive changes.",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: 3,
      name: "Anjali Verma",
      role: "Homemaker",
      content: "The Vastu consultation transformed our home environment completely. We've noticed improved harmony and positive energy flow. The consultants were professional and thorough.",
      image: "https://images.pexels.com/photos/8108063/pexels-photo-8108063.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center text-white text-center">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: `url('https://images.pexels.com/photos/7919635/pexels-photo-7919635.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')` }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="relative z-10 px-4">
          <motion.h1 
            className="text-4xl md:text-5xl font-serif font-bold mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Spiritual Services
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Experience the transformative power of authentic Vedic practices with our expert guidance
          </motion.p>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-16 md:py-24 bg-orange-50" ref={servicesRef}>
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate={servicesInView ? "visible" : "hidden"}
          >
            <h2 className="section-heading">Explore Our Offerings</h2>
            <p className="section-subheading">
              Choose from a diverse range of services designed to enhance your spiritual journey and well-being.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-heading">What Our Clients Say</h2>
          <p className="section-subheading">
            Hear from those who have experienced the positive impact of our services
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="card p-6 flex flex-col items-center text-center">
                <FaQuoteLeft className="text-primary-600 text-4xl mb-4" />
                <p className="text-gray-600 mb-6 flex-grow">"{testimonial.content}"</p>
                <div className="mt-auto">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-20 h-20 rounded-full object-cover mx-auto mb-3"
                  />
                  <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                  <p className="text-primary-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-primary-600 to-accent-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">
            Ready to Start Your Spiritual Journey?
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Experience the transformative power of authentic Vedic practices with our expert guidance
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/puja/booking" className="btn bg-white text-primary-700 hover:bg-gray-100">
              Book a Service
            </Link>
            <Link to="/contact" className="btn bg-transparent border-2 border-white text-white hover:bg-white/10">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default ServicesPage