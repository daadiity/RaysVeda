import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const ServiceCard = ({ service }) => {
  return (
    <motion.div 
      className="card h-full flex flex-col"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={service.image} 
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-serif font-semibold text-gray-800 mb-2">
          {service.title}
        </h3>
        <p className="text-gray-600 mb-4 flex-grow">
          {service.description}
        </p>
        <Link 
          to={service.link}
          className="text-primary-600 hover:text-primary-800 font-medium inline-flex items-center mt-auto"
        >
          Learn more
          <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
          </svg>
        </Link>
      </div>
    </motion.div>
  )
}

export default ServiceCard