import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Devotee",
    content: "I was seeking spiritual guidance during a difficult time, and the Lakshmi Puja performed by RaysVeda brought peace and prosperity into my life. The priest was knowledgeable and the experience was truly divine.",
    image: "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 2,
    name: "Rahul Patel",
    role: "Regular Client",
    content: "The online Kundli reading service was incredibly accurate and provided deep insights into my life path. The remedies suggested have been tremendously helpful in overcoming obstacles. Highly recommended!",
    image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 3,
    name: "Ananya Verma",
    role: "Spiritual Seeker",
    content: "I participated in a Hawan ceremony organized by RaysVeda, and the energy was transformative. The ritual was conducted with precision and devotion.",
    image: "https://images.pexels.com/photos/8108063/pexels-photo-8108063.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  }
];

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % testimonials.length
    )
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex - 1 + testimonials.length) % testimonials.length
    )
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto py-12">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-xl p-8 md:p-12 text-center"
        >
          <FaQuoteLeft className="text-primary-600 text-5xl mx-auto mb-6" />
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
            {testimonials[currentIndex].content}
          </p>
          <div className="flex flex-col items-center">
            <img 
              src={testimonials[currentIndex].image} 
              alt={testimonials[currentIndex].name}
              className="w-24 h-24 rounded-full object-cover mb-4 shadow-md"
            />
            <div>
              <h4 className="text-lg font-semibold text-gray-800">
                {testimonials[currentIndex].name}
              </h4>
              <p className="text-primary-600">
                {testimonials[currentIndex].role}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center mt-8 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-200 ${
              index === currentIndex ? 'bg-primary-600' : 'bg-gray-300'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>

      <button
        onClick={prevTestimonial}
        className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md text-primary-600 hover:text-primary-800 focus:outline-none"
        aria-label="Previous testimonial"
      >
        <FaChevronLeft size={20} />
      </button>
      <button
        onClick={nextTestimonial}
        className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md text-primary-600 hover:text-primary-800 focus:outline-none"
        aria-label="Next testimonial"
      >
        <FaChevronRight size={20} />
      </button>
    </div>
  )
}

export default TestimonialSlider