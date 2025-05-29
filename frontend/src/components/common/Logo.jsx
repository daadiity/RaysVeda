import { motion } from 'framer-motion'


const Logo = ({ className = '' }) => {
  return (
    <motion.div 
      className={`h-10 w-10 flex items-center justify-center ${className}`}
      whileHover={{ rotate: 10, scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <img src="https://res.cloudinary.com/dufvitqpb/image/upload/v1748500107/WhatsApp_Image_2025-05-29_at_11.57.15_AM_lbl7q7.jpg" alt="RaysVeda Logo" className="h-10 w-10 object-contain" />
    </motion.div>
  )
}

export default Logo