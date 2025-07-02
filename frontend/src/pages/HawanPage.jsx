import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const HawanPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const { user } = useAuth();

  // Handle scroll for animations
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden bg-gradient-to-r from-orange-500 to-amber-600 dark:from-orange-600 dark:to-amber-700"
        style={{
          background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
          clipPath: 'ellipse(100% 100% at 50% 0%)'
        }}
      >
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative container mx-auto px-4 py-20 text-center text-white">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-6"
          >
            <span className="text-8xl">🔥</span>
          </motion.div>
          
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold mb-6 text-shadow-lg"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Sacred Hawan Rituals
          </motion.h1>
          
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed opacity-90"
          >
            Experience the divine power of Vedic fire ceremonies for purification, 
            blessings, and spiritual transformation
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-8"
          >
            <button className="bg-white text-orange-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 shadow-xl">
              🙏 Book Hawan Ceremony
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* What is Hawan Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 py-16"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              🛕 What is Hawan?
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-amber-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-orange-100 dark:border-gray-700">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  Hawan is an ancient Vedic ritual involving fire offerings to the deities through 
                  the medium of Agni (fire). It is symbolic of purification, devotion, and transformation. 
                  The sacred fire is believed to act as a conduit between the earthly realm and the divine.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { emoji: '✨', text: 'Purification' },
                    { emoji: '🙏', text: 'Divine Connection' },
                    { emoji: '🔄', text: 'Transformation' },
                    { emoji: '☮️', text: 'Inner Peace' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-2 p-3 bg-orange-50 dark:bg-gray-700 rounded-xl">
                      <span className="text-2xl">{item.emoji}</span>
                      <span className="font-medium text-gray-700 dark:text-gray-300">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://sanity-admin.rudraksha-ratna.com/static/images/blogs/havan%2Bkund.jpg"
                alt="Sacred Havan Kund"
                className="w-full h-96 object-cover rounded-3xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Types of Hawan */}
      <section className="bg-gradient-to-r from-orange-100 to-amber-100 dark:from-gray-800 dark:to-gray-700 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              🙏 Types of Sacred Hawan
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Each type of Hawan serves a specific purpose and brings unique blessings
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {[
              {
                title: 'Griha Pravesh Havan',
                emoji: '🏠',
                description: 'Blessing new homes with positive energy and divine protection',
                color: 'from-blue-500 to-blue-600'
              },
              {
                title: 'Navagraha Havan',
                emoji: '🌟',
                description: 'Planetary alignment for peace and cosmic harmony',
                color: 'from-purple-500 to-purple-600'
              },
              {
                title: 'Rudra Havan',
                emoji: '🕉️',
                description: 'Appeasing Lord Shiva for strength and spiritual growth',
                color: 'from-green-500 to-green-600'
              },
              {
                title: 'Mahamrityunjaya',
                emoji: '💪',
                description: 'Health, protection, and victory over obstacles',
                color: 'from-red-500 to-red-600'
              }
            ].map((type, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, rotate: 1 }}
                className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer border border-orange-100 dark:border-gray-700"
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${type.color} flex items-center justify-center text-3xl mb-4 mx-auto`}>
                  {type.emoji}
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 text-center">
                  {type.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                  {type.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hawan Process */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            📖 Sacred Hawan Process
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Follow the divine steps of this ancient ritual
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {[
            { step: '1', title: 'Sankalp', desc: 'Setting the spiritual intention and purpose', icon: '🎯' },
            { step: '2', title: 'Ganesh Pujan', desc: 'Removing obstacles and seeking blessings', icon: '🐘' },
            { step: '3', title: 'Agni Sthapan', desc: 'Igniting the sacred fire with mantras', icon: '🔥' },
            { step: '4', title: 'Ahuti', desc: 'Offering samagri while chanting sacred mantras', icon: '🌿' },
            { step: '5', title: 'Purnahuti', desc: 'Final offering symbolizing completion', icon: '🙏' },
            { step: '6', title: 'Aarti & Prasad', desc: 'Seeking blessings and sharing sanctified offerings', icon: '🪔' }
          ].map((process, index) => (
            <motion.div
              key={index}
              initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className={`flex items-center mb-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
            >
              <div className="flex-1">
                <div className={`bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl ${index % 2 === 0 ? 'mr-8' : 'ml-8'}`}>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                      {process.step}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white">{process.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{process.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-6xl">{process.icon}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gradient-to-r from-orange-500 to-amber-600 py-16 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">🌟 Benefits of Hawan</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Experience profound transformation through this sacred practice
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { icon: '🌬️', title: 'Air Purification', desc: 'Detoxifies air through herbal smoke' },
              { icon: '🧘', title: 'Mental Clarity', desc: 'Enhances focus and positive vibrations' },
              { icon: '🙏', title: 'Divine Blessings', desc: 'Invokes peace, prosperity, and health' },
              { icon: '⚡', title: 'Energy Elevation', desc: 'Raises the energy of home and people' }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 text-center hover:bg-white/20 transition-all duration-300"
              >
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="opacity-90">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-orange-100 to-amber-100 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-12 text-center max-w-4xl mx-auto"
        >
          <div className="text-6xl mb-6">🔥</div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            Ready to Experience Sacred Hawan?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Book your personalized Hawan ceremony with our experienced priests and 
            invite divine blessings into your life
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-orange-500 to-amber-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              🙏 Book Hawan Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-orange-500 text-orange-600 dark:text-orange-400 px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange-50 dark:hover:bg-gray-700 transition-all duration-300"
            >
              📞 Consult Priest
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Floating Elements */}
      <div className="fixed bottom-8 right-8 z-50">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-gradient-to-r from-orange-500 to-amber-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300"
          title="Quick Book Hawan"
        >
          <span className="text-2xl">🔥</span>
        </motion.button>
      </div>
    </div>
  );
};

export default HawanPage;