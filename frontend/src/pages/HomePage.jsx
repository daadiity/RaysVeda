import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const services = [
    {
      title: "Ganesh Pooja",
      description: "Remove obstacles and bring prosperity",
      image: "🐘",
      price: "₹501"
    },
    {
      title: "Lakshmi Pooja",
      description: "Attract wealth and abundance",
      image: "🪷",
      price: "₹751"
    },
    {
      title: "Saraswati Pooja",
      description: "Enhance knowledge and wisdom",
      image: "📚",
      price: "₹601"
    },
    {
      title: "Shiva Pooja",
      description: "Spiritual purification and peace",
      image: "🔱",
      price: "₹801"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-50 to-yellow-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Welcome to <span className="text-orange-600">RaysVeda</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Experience authentic Vedic rituals and spiritual guidance from certified pandits. 
            Book your pooja online and receive divine blessings at home.
          </p>
          <div className="space-x-4">
            <Link to="/pooja" className="btn-primary text-lg px-8 py-3">
              Book Pooja Now
            </Link>
            <Link to="/pooja" className="btn bg-white text-orange-600 border-2 border-orange-600 hover:bg-orange-50 text-lg px-8 py-3">
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-heading">Why Choose RaysVeda?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-xl font-semibold mb-3">Home Comfort</h3>
              <p className="text-gray-600">Experience authentic pujas from the comfort of your home with our certified pandits.</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-3">Easy Booking</h3>
              <p className="text-gray-600">Simple online booking process with instant confirmation and email notifications.</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🕉️</div>
              <h3 className="text-xl font-semibold mb-3">Authentic Rituals</h3>
              <p className="text-gray-600">Traditional Vedic rituals performed by experienced and knowledgeable pandits.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="section-heading">Popular Pooja Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div key={index} className="card p-6 text-center hover:shadow-xl transition-all duration-300">
                <div className="text-4xl mb-4">{service.image}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="text-lg font-bold text-orange-600 mb-4">{service.price}</div>
                <Link 
                  to="/pooja" 
                  className="btn-primary w-full"
                >
                  Book Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Begin Your Spiritual Journey?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of devotees who have experienced the divine blessings through our authentic Vedic rituals.
          </p>
          <Link 
            to="/pooja" 
            className="btn bg-white text-orange-600 hover:bg-gray-100 text-lg px-8 py-3 font-semibold"
          >
            Book Your Pooja Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;