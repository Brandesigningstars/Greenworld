import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

// ✅ Correct local image imports from src/assets
import HeroImage1 from '../assets/Hero1.jpg';
import HeroImage2 from '../assets/Hero2.jpg';
import HeroImage3 from '../assets/Hero3.jpg';

interface HeroProps {
  onBookVisitClick: () => void;
}

export default function Hero({ onBookVisitClick }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  const slides = [
    {
      image: HeroImage1,
      title: 'Welcome to Green World Realtors',
      subtitle: 'Your Trusted Land Development Partner Since 2007',
      description: 'ISO 9001:2015 Certified | DTCP & RERA Approved Projects',
    },
    {
      image: HeroImage2,
      title: 'DTCP Approved Plots',
      subtitle: 'Build Your Dream Home',
      description: 'Prime locations near GST Road & Melmaruvathur',
    },
    {
      image: HeroImage3,
      title: '100% Legal Transparency',
      subtitle: 'Complete Documentation Support',
      description: 'Clear title | Patta & Chitta | EC provided',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          initial={{ x: direction > 0 ? '100%' : '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: direction < 0 ? '100%' : '-100%' }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50 z-10" />
          <ImageWithFallback
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-20 h-full flex items-center justify-center">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center text-white">
            <motion.div
              key={`content-${currentSlide}`}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.p
                className="text-lg md:text-xl mb-4 text-green-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {slides[currentSlide].description}
              </motion.p>
              <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {slides[currentSlide].title}
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl lg:text-3xl mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {slides[currentSlide].subtitle}
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Button
                  onClick={onBookVisitClick}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-6 text-lg shadow-2xl hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105"
                >
                  Book a Visit Now
                </Button>
                <Button
                  onClick={() => {
                    const element = document.querySelector('#projects');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-green-700 px-8 py-6 text-lg backdrop-blur-sm bg-white/10 transition-all duration-300 transform hover:scale-105"
                >
                  View Projects
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight size={28} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'w-8 bg-green-500' : 'w-2 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
