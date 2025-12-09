import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { X } from 'lucide-react';

export default function Gallery() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const galleryImages = [
    {
      url: '/gallery images/g1.jpg',
      title: 'Arjun Nagar Plot 1',
    },
    {
      url: '/gallery images/g2.jpg',
      title: 'Arjun Nagar Plot 2',
    },
    {
      url: '/gallery images/g3.jpg',
      title: 'Arjun Nagar Plot 3',
    },
    {
      url: '/gallery images/g4.jpg',
      title: 'Arjun Nagar Plot 4',
    },
    {
      url: '/gallery images/g6.jpg',
      title: 'Bharathi Highway City Plot 1',
    },
    {
      url: '/gallery images/g5.jpg',
      title: 'Bharathi Highway City Plot 2',
    },
    {
      url: '/gallery images/g7.jpg',
      title: 'Bharathi Highway City Plot 3',
    },
    {
      url: '/gallery images/g8.jpg',
      title: 'Bharathi Highway City Plot 4',
    },
  ];
  

  return (
    <>
      <section id="gallery" ref={sectionRef} className="py-20 bg-[#a5da93]">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-4 text-green-800">Gallery</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-green-400 mx-auto mb-6"></div>
            <p className="text-xl text-black max-w-3xl mx-auto">
              Explore our stunning portfolio of completed and ongoing projects
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer group aspect-square"
                onClick={() => setSelectedImage(image.url)}
              >
                <ImageWithFallback
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <p className="text-white p-4">{image.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-green-400 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X size={36} />
          </button>
          <motion.img
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            src={selectedImage}
            alt="Gallery image"
            className="max-w-full max-h-full object-contain"
          />
        </motion.div>
      )}
    </>
  );
}
