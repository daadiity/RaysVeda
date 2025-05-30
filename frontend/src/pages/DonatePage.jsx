import React from "react";
import { motion } from "framer-motion";

const donationCategories = [
  {
    title: "Annadaan Seva",
    description: "Support our food distribution program",
    amounts: [501, 1100, 2100, 5100],
    icon: "🍱",
    impact: "One donation of ₹1100 feeds 50 people"
  },
  {
    title: "Education Support",
    description: "Help provide education to underprivileged children",
    amounts: [1001, 2100, 5100, 11000],
    icon: "📚",
    impact: "₹5100 supports one child's education for 6 months"
  },
  {
    title: "Medical Aid",
    description: "Contribute to healthcare for those in need",
    amounts: [1100, 2100, 5100, 11000],
    icon: "⚕️",
    impact: "₹2100 provides basic medical care for 5 people"
  }
];

const DonatePage = () => {
  return (
    <div className="bg-orange-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://example.com/donate-hero.jpg"
            alt="Donate Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white max-w-2xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Support Our Cause</h1>
            <p className="text-xl opacity-90">
              Your contribution makes a difference in someone's life
            </p>
          </motion.div>
        </div>
      </section>

      {/* Donation Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {donationCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {category.amounts.map((amount) => (
                      <button
                        key={amount}
                        className="bg-orange-100 hover:bg-orange-200 text-orange-800 py-2 px-4 rounded transition-colors"
                      >
                        ₹{amount}
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-4">{category.impact}</p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-4 bg-orange-600 text-white py-3 rounded-lg font-semibold 
                             hover:bg-orange-700 transition-colors"
                  >
                    Donate Now
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tax Benefits Section */}
      <section className="py-12 bg-orange-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Tax Benefits</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            All donations are eligible for tax deduction under Section 80G of the Income Tax Act.
            You will receive a tax-deductible receipt for your contribution.
          </p>
        </div>
      </section>
    </div>
  );
};

export default DonatePage;