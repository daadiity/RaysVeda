import React from "react";

export default function PranPratishtha() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-gray-900">
        <img
          src="https://images.pexels.com/photos/7919635/pexels-photo-7919635.jpeg"
          alt="Pran Pratishtha"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Sacred Pran Pratishtha Ritual
            </h1>
            <p className="text-xl text-orange-200 max-w-3xl mx-auto">
              Transform your sacred space with ancient Vedic consecration rituals
            </p>
          </div>
        </div>
      </div>

      {/* Key Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-orange-100 rounded-full mb-4 flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Vedic Authenticity</h3>
            <p className="text-gray-600">Conducted by experienced pandits following Agama Shastra guidelines[19]</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-orange-100 rounded-full mb-4 flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Complete Ritual Package</h3>
            <p className="text-gray-600">Includes purification, invocation, and offering ceremonies[1][10]</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-orange-100 rounded-full mb-4 flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Spiritual Certification</h3>
            <p className="text-gray-600">Receive vedic certification for your consecrated deity</p>
          </div>
        </div>

        {/* Ritual Process Timeline */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Sacred Consecration Process</h2>
          <div className="relative border-l-2 border-orange-200 pl-8 space-y-12">
            <div className="relative">
              <div className="absolute w-4 h-4 bg-orange-500 rounded-full -left-[21px] top-4" />
              <h3 className="text-xl font-semibold mb-2">1. Shuddhi Kriya (Purification)</h3>
              <p className="text-gray-600">Sacred cleansing with panchamrit (five nectars) and Vedic mantras[19]</p>
            </div>

            <div className="relative">
              <div className="absolute w-4 h-4 bg-orange-500 rounded-full -left-[21px] top-4" />
              <h3 className="text-xl font-semibold mb-2">2. Prana Pratishtha (Life Infusion)</h3>
              <p className="text-gray-600">48-minute muhurta chanting to awaken divine consciousness[15][20]</p>
            </div>

            <div className="relative">
              <div className="absolute w-4 h-4 bg-orange-500 rounded-full -left-[21px] top-4" />
              <h3 className="text-xl font-semibold mb-2">3. Shodashopachara (16 Offerings)</h3>
              <p className="text-gray-600">Traditional offerings including flowers, fruits, and sacred fires[10]</p>
            </div>
          </div>
        </div>

        {/* Detailed Content Section */}
        <div className="prose max-w-none mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Understanding Sacred Consecration</h2>
          <p className="text-lg leading-relaxed">
            Pran Pratishtha (Sanskrit: प्राण प्रतिष्ठा) is the Vedic science of infusing divine consciousness into physical forms. 
            This ancient ritual transforms ordinary objects into living embodiments of cosmic energy through precise 
            mantra chanting and ceremonial procedures[1][10].
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">Key Spiritual Benefits</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-orange-50 p-6 rounded-lg">
              <h4 className="font-semibold mb-2">✓ Enhanced Spiritual Connectivity</h4>
              <p className="text-gray-600">Creates direct channel for divine blessings[2][19]</p>
            </div>
            <div className="bg-orange-50 p-6 rounded-lg">
              <h4 className="font-semibold mb-2">✓ Positive Energy Matrix</h4>
              <p className="text-gray-600">Establishes cosmic energy field in sacred space[20]</p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold mt-8 mb-4">FAQs</h3>
          <div className="space-y-4">
            <div className="border-l-4 border-orange-500 pl-4">
              <h4 className="font-semibold">What is the ideal muhurta for consecration?</h4>
              <p className="text-gray-600">Our pandits calculate based on your jyotish chart and panchang alignment[15]</p>
            </div>
            <div className="border-l-4 border-orange-500 pl-4">
              <h4 className="font-semibold">Can we perform home consecration?</h4>
              <p className="text-gray-600">Yes, we conduct both temple and home shrine installations[2][19]</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-orange-600 text-white rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Begin Your Sacred Journey</h2>
          <p className="text-xl mb-6">Schedule consultation with our Vedic experts</p>
          <button className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-orange-50 transition-colors">
            Book Now
          </button>
        </div>
      </section>
    </div>
  );
}
