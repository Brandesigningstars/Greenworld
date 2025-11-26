import { motion } from 'motion/react';
const whatsappIcon = 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg';

export default function WhatsAppFloat() {
  const handleWhatsAppClick = () => {
    const phoneNumber = '919600077816';
    const message = 'Hello! I would like to know more about your properties.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      whileHover={{ scale: 1.15, rotate: 5 }}
      whileTap={{ scale: 0.85 }}
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-40 bg-white p-2 rounded-full shadow-2xl hover:shadow-green-400/60 transition-all duration-300 group"
      aria-label="Chat on WhatsApp"
    >
      <img src={whatsappIcon} alt="WhatsApp" className="w-12 h-12 group-hover:scale-110 transition-transform relative z-10" />
      
      {/* Pulsing rings */}
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: 'loop',
        }}
        className="absolute inset-0 bg-green-400 rounded-full -z-10"
      />
      <motion.div
        animate={{
          scale: [1, 1.6, 1],
          opacity: [0.3, 0, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: 'loop',
          delay: 0.5,
        }}
        className="absolute inset-0 bg-green-500 rounded-full -z-10"
      />
    </motion.button>
  );
}
