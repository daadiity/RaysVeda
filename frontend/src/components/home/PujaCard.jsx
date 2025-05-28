import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const PujaCard = ({ puja }) => {
  return (
    <motion.div 
      className="card h-full flex flex-col"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={puja.image} 
          alt={puja.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-serif font-semibold text-gray-800 mb-2">
          {puja.title}
        </h3>
        <p className="text-gray-600 mb-4 flex-grow">
          {puja.description}
        </p>
        <div className="mt-auto">
          <Link 
            to={puja.link}
            className="block text-center w-full py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md transition-all duration-300"
          >
            Book Puja
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default PujaCard