import { motion } from 'framer-motion'

const Logo = ({ colorClass = 'text-primary-600' }) => {
  return (
    <motion.div 
      className={`h-10 w-10 flex items-center justify-center ${colorClass}`}
      whileHover={{ rotate: 10, scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity="0.4"/>
        <path d="M12,6a1,1,0,0,0-1,1v5a1,1,0,0,0,.5.87l4,2.5a1,1,0,0,0,1.37-.37,1,1,0,0,0-.37-1.37l-3.5-2.18V7A1,1,0,0,0,12,6Z"/>
        <path d="M17.74,9.13a6,6,0,0,0-5.17-3.08h0a6,6,0,0,0-5.14,2.91,1,1,0,0,0,.25,1.39,1,1,0,0,0,1.39-.25,4,4,0,0,1,3.5-2h0a4,4,0,0,1,3.53,2.08,1,1,0,0,0,1.37.38A1,1,0,0,0,17.74,9.13Z"/>
      </svg>
    </motion.div>
  )
}

export default Logo