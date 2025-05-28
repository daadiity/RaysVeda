import { FaWhatsapp } from 'react-icons/fa'
import { motion } from 'framer-motion'

const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/919876543210" 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-3 rounded-full shadow-lg z-50"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <FaWhatsapp size={24} />
    </motion.a>
  )
}

export default WhatsAppButton