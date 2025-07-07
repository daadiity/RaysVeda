import React, { useState } from 'react';
import axios from 'axios';

const Numerology = () => {



  const [formVisible, setFormVisible] = useState(false);
  const [formType, setFormType] = useState('');


  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    email: '',
    serviceType: 'Life Path Analysis',
    message: '',
  });

  const [geminiResponse, setGeminiResponse] = useState('');
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setGeminiResponse('');
    try {
      const response = await axios.post('http://localhost:3000/api/numerology', formData);
      setGeminiResponse(response.data.data);
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
      alert('Failed to generate numerology reading.');
    } finally {
      setLoading(false);

    }
  };

  return (
    <div className="bg-orange-50 min-h-screen">

      {/* Hero */}

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

      {/* About */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">What is Numerology?</h2>
          <p className="text-gray-600 text-lg leading-relaxed text-center max-w-3xl mx-auto">
            Numerology is the ancient study of numbers and their influence on our lives. By analyzing
            your birth date and name, numerology can reveal insights about your personality, life path,
            and future opportunities.

            It is a powerful tool for self-discovery and personal growth, helping you understand your strengths,

          </p>
        </div>
      </section>


      {/* Services */}

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


      {/* CTA */}

      <section className="py-16 bg-orange-600 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Book Your Numerology Session Today</h2>
          <p className="text-lg mb-8">
            Unlock the secrets of your destiny with our expert numerologists.
          </p>


          <div className="flex justify-center gap-4 flex-wrap">
            <button
              onClick={() => {
                setFormVisible(true);
                setFormType('book');
              }}
              className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Book Now
            </button>
            <button
              onClick={() => {
                setFormVisible(true);
                setFormType('free');
              }}
              className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Free Numerology
            </button>
          </div>
        </div>
      </section>

      {/* Popup */}
      {formVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-2">
          <div className="bg-white w-full max-w-md p-4 md:p-5 rounded-lg shadow-xl relative">
            <button
              className="absolute top-2 right-3 text-gray-500 text-xl font-bold hover:text-gray-700"
              onClick={() => {
                setFormVisible(false);
                setGeminiResponse('');
              }}
            >
              ×
            </button>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 text-center">
              {formType === 'free'
                ? 'Get Your Free Numerology Reading'
                : 'Request a Numerology Service'}
            </h2>

            {!geminiResponse ? (
              <form onSubmit={handleSubmit}>
                {['name', 'birthDate', 'email'].map((field) => (
                  <div className="mb-3" key={field}>
                    <label className="block text-gray-700 font-semibold mb-1 capitalize">{field}</label>
                    <input
                      type={field === 'birthDate' ? 'date' : field === 'email' ? 'email' : 'text'}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                ))}
                <div className="mb-3">
                  <label className="block text-gray-700 font-semibold mb-1">Service Type</label>
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option>Life Path Analysis</option>
                    <option>Name Numerology</option>
                    <option>Compatibility Check</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-1">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="3"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  ></textarea>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-orange-600 text-white px-4 py-2 rounded-md font-bold hover:bg-orange-700 transition"
                    disabled={loading}
                  >
                    {loading ? 'Generating...' : 'Submit'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="mt-6">
                <h3 className="text-xl font-bold text-orange-600 mb-2">Your Numerology Reading</h3>
                <div className="max-h-64 overflow-y-auto bg-white border border-orange-300 rounded-md shadow-inner p-4 space-y-3">
                  {geminiResponse
                    .split(/\n\s*\n/)
                    .map((para, idx) => (
                      <p key={idx} className="text-gray-800 leading-relaxed">{para.trim()}</p>
                    ))}
                </div>
              </div>

            )}
          </div>
        </div>

      )}
    </div>
  );
};

export default Numerology;