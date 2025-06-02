import React from "react";
import { motion } from "framer-motion";

const RigVeda = () => {
  const features = [
    { number: "10,552", label: "Total Mantras" },
    { number: "1,028", label: "Suktas (Hymns)" },
    { number: "10", label: "Mandalas (Books)" },
    { number: "85", label: "Anuvakas" },
  ];

  const structure = [
    {
      title: "Divisions",
      items: [
        "8 Ashtakas (divisions)",
        "64 Adhyayas (chapters)",
        "2024 Vargas (sections)",
      ],
    },
    {
      title: "Content",
      items: [
        "85 Anuvakas (subsections)",
        "1028 Suktas (hymns)",
        "10,589 Mantras (verses)",
      ],
    },
  ];

  return (
    <div className="bg-orange-50">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://i.pinimg.com/736x/f0/4b/ee/f04beedc467a1e7c406e2323581dba3e.jpg"
            alt="Rigveda Background"
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
            <h1 className="text-5xl font-bold mb-6">Rigveda: The First Veda</h1>
            <p className="text-xl">
              The foundation of Vedic wisdom and the oldest of the four Vedas
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {feature.number}
                </div>
                <div className="text-gray-600">{feature.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-8 text-gray-800">
                Understanding Rigveda
              </h2>
              <div className="prose prose-lg">
                <p className="mb-6">
                  The Rigveda is a sacred text that praises all aspects of the universe. 
                  It reveals how the Divine has manifested the qualities of all elements. 
                  The term "Rigveda" is derived from Ṛc (verses describing the qualities 
                  of elements) and Veda (knowledge).
                </p>
                <p className="mb-6">
                  Scholars are encouraged to study the Rigveda first and, through its 
                  mantras, gain a true understanding of creation—from the Divine to the 
                  Earth—to contribute meaningfully to the world.
                </p>
                <div className="bg-orange-100 p-6 rounded-lg mb-8">
                  <p className="italic text-orange-800">
                    "The text begins with the mantra 'Agnimiḷe' and ends with 
                    'Yathavaḥsusahasati.'"
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Structure Section */}
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              {structure.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white p-6 rounded-lg shadow-lg"
                >
                  <h3 className="text-xl font-bold mb-4 text-gray-800">
                    {section.title}
                  </h3>
                  <ul className="space-y-2">
                    {section.items.map((item, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <span className="mr-2">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-100">
        <div className="container mx-auto px-4 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold 
                     hover:bg-orange-700 transition-colors duration-300"
          >
            Start Learning Rigveda
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default RigVeda;
