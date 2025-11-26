import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Client } from '../types/client';
import { Award, CheckCircle2, Shield, Building } from 'lucide-react';

import client1 from '../assets/client1.png';
import client2 from '../assets/client2.png';
import client3 from '../assets/client3.png';
import client4 from '../assets/client4.png';
import client5 from '../assets/client5.png';

interface OurClientsProps {
  clients?: Client[];
}

export default function OurClients({ clients: propClients }: OurClientsProps) {
  const [isVisible, setIsVisible] = useState(false);
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

  // Default clients - will be managed by admin later
  const defaultClients: Client[] = [
    { id: '5', name: 'Sun News', logo: client1, category: 'Media' },
    { id: '6', name: '99acres', logo: client2, category: 'Property Portal' },
    { id: '7', name: 'MagicBricks', logo: client3, category: 'Property Portal' },
    { id: '8', name: 'Delogy', logo: client4, category: 'Media Partner' },
    { id: '9', name: 'The Hindu', logo: client5, category: 'Media Partner' },
  ];

  const clients = propClients || defaultClients;

  // Calculate animation duration based on number of clients - slower speed
  const animationDuration = Math.max(30, clients.length * 5);

  return (
    <section
  ref={sectionRef}
  className="py-20"
  style={{ backgroundColor: '#073e04ff' }}
>

      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 text-white">Our Certifications & Partners</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-green-400 mx-auto mb-6"></div>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Trusted certifications and partnerships for your peace of mind
          </p>
        </motion.div>

        {/* Scrolling Carousel */}
        <div className="relative overflow-hidden mb-16">
          <motion.div
            animate={{
              x: [0, -320 * clients.length],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: animationDuration,
                ease: 'linear',
              },
            }}
            className="flex gap-6 items-center"
          >
            {/* Triple the clients for seamless loop */}
            {[...clients, ...clients, ...clients].map((client, index) => (
              <div
                key={`${client.id}-${index}`}
                className="flex-shrink-0 w-72 h-32 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center p-6 border border-gray-200"
              >
                <img 
                  src={client.logo} 
                  alt={client.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-green-600" />
            <p className="text-sm text-gray-700">DTCP Approved</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <Shield className="w-12 h-12 mx-auto mb-3 text-blue-600" />
            <p className="text-sm text-gray-700">RERA Registered</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <Award className="w-12 h-12 mx-auto mb-3 text-purple-600" />
            <p className="text-sm text-gray-700">ISO 9001:2015</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <Building className="w-12 h-12 mx-auto mb-3 text-yellow-600" />
            <p className="text-sm text-gray-700">100% Legal</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}