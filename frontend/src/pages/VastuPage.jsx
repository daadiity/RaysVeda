import React from "react";

export default function VastuPage() {
  return (
    <div className="bg-orange-50 min-h-screen">
      {/* Top Gradient Banner */}
      <section className="relative h-72 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-700 via-yellow-500 to-orange-400"></div>
        <div className="relative z-10 text-white text-center w-full px-4">
          <h1 className="text-5xl font-bold mb-3 drop-shadow-lg">Vastu Shastra</h1>
          <p className="text-xl max-w-2xl mx-auto drop-shadow">
            Harmonize your home and workspace with the ancient science of architecture and energy.
          </p>
        </div>
      </section>

      {/* What is Vastu with Side Image */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-orange-700 mb-8 text-center">What is Vastu Shastra?</h2>
        <div className="flex flex-col md:flex-row items-center max-w-4xl mx-auto mb-10 gap-8">
          <div className="md:w-1/2 order-2 md:order-1 text-center md:text-left">
            <p className="text-lg text-gray-700 mb-4">
              Vastu Shastra is an ancient Indian science of architecture and design that emphasizes harmony between nature and human habitation.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              It encompasses principles for site selection, layout, and design of buildings, aiming to enhance health, happiness, and prosperity.
            </p>
            <p className="text-lg text-gray-700">
              By aligning with natural forces and energies, Vastu seeks to create a balanced and positive living environment.
            </p>
          </div>
          <div className="md:w-1/2 order-1 md:order-2 flex justify-center">
            <img
              src="https://i.pinimg.com/736x/c4/81/47/c48147ce18f2777c2e9649e9dfc1ea32.jpg"
              alt="Vastu Shastra"
              className="rounded-xl shadow-lg w-full max-w-xs object-cover border-4 border-orange-200"
            />
          </div>
        </div>

        {/* Rays Veda Introduction */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12 max-w-4xl mx-auto">
          <p className="text-lg text-gray-800 mb-4">
            <span className="font-semibold text-orange-700">At Rays Veda,</span> we provide specialized Vastu consultations aimed at aligning your home, workplace, or sacred space with the natural cosmic energies. Rooted in the timeless wisdom of Vastu Shastra, our services are crafted to promote well-being, prosperity, and inner peace through spatial balance and energetic flow.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-orange-100 rounded-xl shadow p-6 flex flex-col justify-between hover:scale-105 transition-transform">
            <h3 className="text-xl font-bold text-orange-700 mb-2">Property Evaluation & Layout Analysis</h3>
            <p className="text-gray-700 mb-2">
              Detailed review of existing or proposed spaces—homes, offices, spiritual centers—to detect Vastu flaws and energy disturbances.
            </p>
          </div>
          <div className="bg-orange-100 rounded-xl shadow p-6 flex flex-col justify-between hover:scale-105 transition-transform">
            <h3 className="text-xl font-bold text-orange-700 mb-2">Vastu-Astro Integration</h3>
            <p className="text-gray-700 mb-2">
              We combine Vastu principles with astrological charts (Kundali) to provide insight into how your space influences life events—such as health, wealth, relationships, and career progress.
            </p>
          </div>
          <div className="bg-orange-100 rounded-xl shadow p-6 flex flex-col justify-between hover:scale-105 transition-transform">
            <h3 className="text-xl font-bold text-orange-700 mb-2">Corrective Measures Without Major Alteration</h3>
            <p className="text-gray-700 mb-2">
              Effective solutions using directional changes, sacred geometry tools (crystals, mirrors, yantras), and spiritual remedies to balance the space.
            </p>
          </div>
          <div className="bg-orange-100 rounded-xl shadow p-6 flex flex-col justify-between hover:scale-105 transition-transform">
            <h3 className="text-xl font-bold text-orange-700 mb-2">Energy Cleansing & Activation</h3>
            <p className="text-gray-700 mb-2">
              Rituals and spiritual practices to cleanse stagnant energies and reinvigorate your surroundings for prosperity, mental clarity, and spiritual upliftment.
            </p>
          </div>
          <div className="bg-orange-100 rounded-xl shadow p-6 flex flex-col justify-between hover:scale-105 transition-transform md:col-span-2">
            <h3 className="text-xl font-bold text-orange-700 mb-2">Vastu-Aligned Architecture Planning</h3>
            <p className="text-gray-700 mb-2">
              Custom Vastu design services for new constructions—ensuring that every corner of your future home or workplace aligns with universal energies from the ground up.
            </p>
          </div>
        </div>

        {/* Why Choose Rays Veda */}
        <div className="bg-gradient-to-r from-orange-200 to-yellow-100 rounded-xl shadow-lg p-8 mb-12 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-orange-700 mb-3 text-center">Why Choose Rays Veda for Vastu?</h3>
          <p className="text-lg text-gray-800 mb-2 text-center">
            We blend classical Vastu wisdom with spiritual awareness and intuitive guidance. Our holistic approach integrates Vastu, astrology, and energy analysis to provide not just structural solutions, but direction and clarity for your life.
          </p>
        </div>

        {/* Interactive CTA */}
  
      </section>
    </div>
  );
}