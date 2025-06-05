import React from "react";
import { motion } from "framer-motion";

const CommunityService = () => {
  const services = [
    {
      title: "Annadaan Seva",
      description: "Feeding the hungry through our community kitchen program",
      stats: { meals: "10,000+", volunteers: "100+", centers: "5" },
      image: "https://example.com/annadaan.jpg"
    },
    {
      title: "Education Support",
      description: "Providing free education and supplies to underprivileged children",
      stats: { students: "500+", teachers: "50+", schools: "3" },
      image: "https://example.com/education.jpg"
    },
    {
      title: "Healthcare Camps",
      description: "Free medical services and health awareness programs",
      stats: { patients: "1,000+", doctors: "25+", camps: "12" },
      image: "https://example.com/healthcare.jpg"
    }
  ];

  return (
    <div className="bg-orange-50">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://example.com/seva-hero.jpg"
            alt="Community Service"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white max-w-2xl"
          >
            <h1 className="text-5xl font-bold mb-6">Seva Bhav</h1>
            <p className="text-xl">
              Serving humanity with love and compassion
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Community Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Through dedicated service and compassionate action, we strive to make a positive impact 
              in our community and touch lives meaningfully.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    {Object.entries(service.stats).map(([key, value]) => (
                      <div key={key}>
                        <div className="text-orange-600 font-bold">{value}</div>
                        <div className="text-sm text-gray-500 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-16 bg-orange-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Join Our Service Programs</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold 
                     hover:bg-orange-700 transition-colors duration-300"
          >
            Volunteer With Us
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default CommunityService;