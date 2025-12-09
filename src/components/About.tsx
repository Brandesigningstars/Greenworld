import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Award, Target, Users } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    { icon: Award, title: 'ISO 9001:2015 Certified', description: 'Quality management certified company' },
    { icon: Target, title: 'Since 2007', description: '18 years of excellence in real estate' },
    { icon: Users, title: 'Customer First', description: 'Your trust is our foundation' },
  ];

  const highlights = [
    'Premium quality construction',
    'Prime locations',
    'Timely delivery',
    'Transparent dealings',
    'Legal documentation',
    'Customer support',
  ];

  return (
   <section id="about" ref={sectionRef} className="py-20 overflow-x-hidden" style={{ backgroundColor: '#073e04ff' }}>
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 text-white">About Green World Realtors</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-green-400 mx-auto mb-6"></div>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Land Promotors | Since 2007
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <ImageWithFallback
              src="/about.jpg"
              alt="Green World Realtors Building"
              className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h3 className="text-3xl mb-6" style={{ color: '#ffdd45ff' }}>
Your Trusted Land Development Partner</h3>
            <p className="text-white mb-6 leading-relaxed">
              Green World Realtors is an ISO 9001:2015 certified company that has been serving Tamil Nadu's real estate sector since 2007. 
              We specialize in DTCP & RERA-approved plotted developments, farmland projects, and residential layouts with complete 
              transparency and customer satisfaction at our core.
            </p>
            <p className="text-white mb-6 leading-relaxed">
              With over 18 years of experience, we have successfully delivered numerous projects in Chennai, Kanchipuram, and surrounding areas. 
              Our focus on prime locations near GST Road, Melmaruvathur, and major infrastructure has made us a trusted name for land buyers 
              looking to build their dream homes or make smart investments.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle2 style={{ color: '#ffdd45ff' }} className="flex-shrink-0" size={20} />
                  <span className="text-white">{highlight}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.15 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"

            >
              <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <feature.icon size={32} />
              </div>
              <h4 className="text-xl mb-3 text-center text-gray-800">{feature.title}</h4>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
