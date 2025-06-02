import React from "react";

const Numerology = () => {
  return (
    <div className="bg-orange-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://i.pinimg.com/736x/ad/2d/90/ad2d9025aa9082d56ee9817273cdf2e1.jpg" // Replace with your image URL
            alt="Numerology"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-5xl font-bold mb-6">Numerology Services</h1>
            <p className="text-xl">
              Discover the power of numbers and unlock the secrets of your destiny.
            </p>
          </div>
        </div>
      </section>

      {/* About Numerology */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            What is Numerology?
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed text-center max-w-3xl mx-auto">
            Numerology is the ancient study of numbers and their influence on our lives.
            By analyzing your birth date and name, numerology can reveal insights about
            your personality, life path, and future opportunities.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-orange-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Our Numerology Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Life Path Analysis</h3>
              <p className="text-gray-600">
                Understand your life's purpose and the challenges you may face.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Name Numerology</h3>
              <p className="text-gray-600">
                Discover the hidden meaning behind your name and its impact on your life.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Compatibility Check</h3>
              <p className="text-gray-600">
                Find out how compatible you are with your partner, friends, or colleagues.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-orange-600 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Book Your Numerology Session Today</h2>
          <p className="text-lg mb-8">
            Unlock the secrets of your destiny with our expert numerologists.
          </p>
          <button className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Book Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Numerology;