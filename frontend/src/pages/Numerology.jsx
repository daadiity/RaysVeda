import React, { useState } from 'react';
import axios from 'axios';

const Numerology = () => {
  const [formVisible, setFormVisible] = useState(false); // State to toggle form visibility
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    email: '',
    serviceType: 'Life Path Analysis',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/numerology', formData);
      alert('Request submitted successfully!');
      setFormData({
        name: '',
        birthDate: '',
        email: '',
        serviceType: 'Life Path Analysis',
        message: '',
      });
      setFormVisible(false); // Hide the form after submission
    } catch (error) {
      console.error('Error submitting request:', error);
      alert('Failed to submit request.');
    }
  };

  return (
    <div className="bg-orange-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://i.pinimg.com/736x/ad/2d/90/ad2d9025aa9082d56ee9817273cdf2e1.jpg"
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
          <button
            onClick={() => setFormVisible(true)} // Show the form when clicked
            className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Book Now
          </button>
        </div>
      </section>

      {/* Form Section (Visible Only When Book Now is Clicked) */}
      {formVisible && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Request a Numerology Service
            </h2>
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-gray-100 p-6 rounded-lg shadow-lg">
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Birth Date</label>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className="w-full p-3 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Service Type</label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className="w-full p-3 border rounded"
                >
                  <option>Life Path Analysis</option>
                  <option>Name Numerology</option>
                  <option>Compatibility Check</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-3 border rounded"
                  rows="4"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-orange-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-700"
              >
                Submit
              </button>
            </form>
          </div>
        </section>
      )}
    </div>
  );
};

export default Numerology;