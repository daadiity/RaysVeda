import React from 'react';

const charitablePrograms = [
  {
    title: "Annadaan Seva",
    description: "Food distribution program serving nutritious meals to the needy",
    details: ["Daily meals served: 1000+", "Location: Multiple centers", "Volunteers: 50+"]
  },
  {
    title: "Vidya Seva",
    description: "Educational support for underprivileged children",
    details: ["Students supported: 500+", "Free books & supplies", "After-school tutoring"]
  },
  {
    title: "Arogya Seva",
    description: "Free medical camps and healthcare services",
    details: ["Monthly health camps", "Free medicines", "Expert doctors"]
  }
];

export default function CharitablePrograms() {
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full mb-10 lg:mb-0 rounded-lg overflow-hidden relative">
            <img
              alt="feature"
              className="img-fluid radius-image"
              src="https://example.com/seva-bhav.jpg"  // Replace with your image
            />
            <div className="absolute top-4 left-4 bg-white bg-opacity-80 px-4 py-2 rounded shadow-md">
              <h2 className="text-xl font-bold text-gray-900">
                Seva Bhav: Service to Humanity
              </h2>
            </div>
          </div>
          <div className="flex flex-col flex-wrap lg:py-6 -mb-10 lg:w-1/2 lg:pl-12 lg:text-left text-center">
            <div className="flex flex-col mb-10 lg:items-start items-center">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-8 text-gray-900">
                Our Charitable Programs
              </h1>
              <div className="w-full">
                <p className="leading-relaxed text-lg text-gray-700">
                  Through Seva Bhav, we aim to serve humanity with dedication and compassion. 
                  Our various charitable programs focus on addressing basic needs like food, 
                  education, and healthcare for the underprivileged sections of society.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {charitablePrograms.map((program) => (
              <div key={program.title} className="p-4 lg:w-1/3">
                <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden relative">
                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                    PROGRAM
                  </h2>
                  <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                    {program.title}
                  </h1>
                  <p className="leading-relaxed mb-3">{program.description}</p>
                  <ul className="list-none mt-4">
                    {program.details.map((detail, index) => (
                      <li key={index} className="text-gray-600 mb-2">• {detail}</li>
                    ))}
                  </ul>
                  <button className="text-yellow-500 inline-flex items-center mt-4">
                    Learn More
                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <button className="flex mx-auto mt-16 text-white bg-yellow-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg">
            Join Our Seva Programs
          </button>
        </div>
      </section>
    </>
  );
}