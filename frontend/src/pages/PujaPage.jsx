import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import BookPoojaForm from "../components/BookPoojaForm";
import GuestBookingForm from "../components/GuestBookingForm";
import { fetchActivePujas } from "../services/api";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const PujaPage = () => {
  const pujasRef = useRef(null);
  const pujasInView = useInView(pujasRef, { once: true, margin: "-100px" });

  const [pujas, setPujas] = useState([]);
  const [selectedPuja, setSelectedPuja] = useState(null);
  const [showBooking, setShowBooking] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    const loadPujas = async () => {
      try {
        const pujaList = await fetchActivePujas();
        setPujas(pujaList);
      } catch (err) {
        console.error("Failed to load pujas", err);
      }
    };

    loadPujas();
  }, []);

  const handlePujaBookNow = (puja) => {
    setSelectedPuja(puja);
    setShowBooking(true);
  };

  const handleBookPujaClick = () => {
    const firstPuja = pujas[0];
    if (firstPuja) {
      handlePujaBookNow(firstPuja);
    } else {
      alert("No pujas available to book.");
    }
  };

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
              Experience authentic and traditional pujas performed by
              experienced priests to invite divine blessings, prosperity, and
              peace into your life.
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
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" fill="#FFF7ED">
            <path
              fillOpacity="1"
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* What is a Puja Section */}
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="section-heading">What is a Puja?</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Puja is a sacred ritual in Hinduism performed to honor, worship,
              and show devotion to deities...
            </p>
            <p className="text-gray-700 leading-relaxed">
              Performing pujas regularly can bring divine blessings, remove
              obstacles, promote peace, prosperity, and spiritual growth...
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
              Choose from our wide range of traditional pujas to fulfill your
              spiritual needs
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pujas.map((puja) => (
                <motion.div
                  key={puja._id}
                  className="card h-full flex flex-col"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={puja.images?.[0] || "/default-pooja.jpg"}
                      alt={puja.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-serif font-semibold text-gray-800 mb-2">
                      {puja.name}
                    </h3>
                    <p className="text-gray-600 mb-4 flex-grow">
                      {puja.description}
                    </p>
                    <div className="flex justify-between items-center mt-auto">
                      <span className="text-accent-600 font-medium">
                        Starting from ₹{puja.price}
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

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">
            Ready to Experience Divine Blessings?
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Book a puja today and invite peace, prosperity, and divine grace
            into your life
          </p>
          <button
            className="btn bg-white text-primary-700 hover:bg-gray-100"
            onClick={handleBookPujaClick}
          >
            Book a Puja Now
          </button>
        </div>
      </section>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBooking && selectedPuja && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setShowBooking(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
                {user ? (
                  <BookPoojaForm
                    selectedPuja={selectedPuja}
                    onClose={() => setShowBooking(false)}
                  />
                ) : (
                  <GuestBookingForm
                    selectedPuja={selectedPuja}
                    onClose={() => setShowBooking(false)}
                  />
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default PujaPage;
