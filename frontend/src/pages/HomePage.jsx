import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import ServiceCard from '../components/home/ServiceCard'
import PujaCard from '../components/home/PujaCard'
import axios from 'axios'

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
}

// Booking form component with Razorpay integration
function BookPoojaForm({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    gotra: "",
    address: "",
    phone: "",
    poojaType: "",
    email: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/book-pooja", form);
      const { orderId, amount, currency, key, name, email, poojaType } = res.data;

      const options = {
        key,
        amount,
        currency,
        name: "RaysVeda",
        description: `Booking for ${poojaType}`,
        order_id: orderId,
        handler: function (response) {
          window.location.href = "/success";
        },
        prefill: {
          name,
          email,
          contact: form.phone,
        },
        notes: {
          poojaType,
          gotra: form.gotra,
          address: form.address,
        },
        theme: {
          color: "#F59E42"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      setLoading(false);
    } catch (err) {
      alert("Booking failed. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
        <button type="button" onClick={onClose} className="absolute top-2 right-4 text-xl font-bold">&times;</button>
        <h2 className="text-2xl font-semibold mb-4 text-center">Book a Puja</h2>
        <div className="mb-3">
          <input name="name" value={form.name} onChange={handleChange} required placeholder="Name" className="input w-full" />
        </div>
        <div className="mb-3">
          <input name="gotra" value={form.gotra} onChange={handleChange} placeholder="Gotra" className="input w-full" />
        </div>
        <div className="mb-3">
          <input name="address" value={form.address} onChange={handleChange} required placeholder="Address" className="input w-full" />
        </div>
        <div className="mb-3">
          <input name="phone" value={form.phone} onChange={handleChange} required placeholder="Phone" className="input w-full" />
        </div>
        <div className="mb-3">
          <input name="email" value={form.email} onChange={handleChange} required placeholder="Email" className="input w-full" />
        </div>
        <div className="mb-4">
          <select name="poojaType" value={form.poojaType} onChange={handleChange} required className="input w-full">
            <option value="">Select Pooja</option>
            <option value="Rudraabhishek">Rudraabhishek</option>
            <option value="Laxmi Puja">Laxmi Puja</option>
            <option value="Kalsarpadosh Puja">Kalsarpadosh Puja</option>
          </select>
        </div>
        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? "Processing..." : "Proceed to Payment"}
        </button>
      </form>
    </div>
  );
}

const HomePage = () => {
  const aboutRef = useRef(null)
  const servicesRef = useRef(null)
  const pujaRef = useRef(null)
  const [showBooking, setShowBooking] = useState(false)

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
      image: "https://t4.ftcdn.net/jpg/12/33/33/13/240_F_1233331310_4Qx5hQxoAKNDSAVUz7xNog81BTb4Yv5W.jpg",
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
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl4KAaNMhL3H1BGTJbDXVCDw1E_ZIGg2UVbg&s",
      link: "/services/kundli"
    },
    {
      id: 5,
      title: "Numerology",
      description: "Uncover insights into your personality, destiny, and life path through the power of numbers.",
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoY2LtP4XwWW5girdLUuxajspdx0j0FfaYZg&s",
      link: "/services/numerology"
    },
    {
      id: 6,
      title: "Vastu",
      description: "Harmonize your living and working spaces with ancient architectural principles for prosperity and well-being.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE9-X11LFgzYr1rByGQwk8XCr3Q5iEzXaE_A&s",
      link: "/services/vastu"
    },
  ]

  const pujas = [
    {
      id: 1,
      title: "Shri Narayan Puja",
      description: "This Pooja calms down your mind, sharpens your focus in life, helps in the overcoming of financial issues, delivers good fortune, avoids evil and helps to gain happiness!",
      image: "https://i.pinimg.com/736x/47/a2/37/47a23755394a44cd1b8e543472160e13.jpg",
      price: "₹1,501",
      link: "/puja/shri-narayan"
    },
    {
      id: 2,
      title: "Shri Ganpati Puja",
      description: "Represents sweetness & auspicious beginnings & offers blessings for achieving goals, aspirations as well as remove obstacles & bring good fortune!",
      image: "https://i.pinimg.com/736x/2e/6d/6f/2e6d6f7119a936f6caabce62b5018d4b.jpg",
      price: "₹1,801",
      link: "/puja/shri-ganpati"
    },
    {
      id: 3,
      title: "Shri Shiv Puja",
      description: "For blessings of Lord Shiva for spiritual growth, inner peace, and removal of obstacles, ensuring prosperity and well-being.",
      image: "https://i.pinimg.com/736x/c6/da/a2/c6daa23adb2fce39cc1c7c9d45e745b1.jpg",
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
          style={{ backgroundImage: `url('https://res.cloudinary.com/dufvitqpb/image/upload/v1748418174/generated-image_7_z71loi.png')` }}
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
            <button className="btn-primary" onClick={() => setShowBooking(true)}>
              Book a Puja Now
            </button>
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
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrWnv5izXi1T-EGQLFHW2MyQ39J-aXc08jyg&s" 
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
          <button className="btn bg-white text-primary-700 hover:bg-gray-100" onClick={() => setShowBooking(true)}>
            Book a Puja
          </button>
        </div>
      </section>

      {showBooking && <BookPoojaForm onClose={() => setShowBooking(false)} />}
    </>
  )
}

export default HomePage