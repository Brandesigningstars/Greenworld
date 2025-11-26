import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Target, Eye, Award } from 'lucide-react';

export default function MissionVision() {
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

  const sections = [
    {
      icon: Target,
      title: 'Our Mission',
      description:
        'To simplify land ownership by offering legally approved plots in strategic locations, backed by professional service and complete transparency. From farmland developments to DTCP & RERA-approved residential layouts, our projects are designed to offer value, transparency, and long-term appreciation.',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Award,
      title: 'Who We Are',
      description:
        'Green World is an ISO 9001:2015 Certified Company, recognized for our consistent commitment to quality, process excellence, and customer satisfaction in the real estate sector. With a dedicated team, clear legal documentation, and a customer-first approach, we ensure that your land-buying journey is smooth, safe, and rewarding.',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: Eye,
      title: 'Our Vision',
      description:
        'To become Tamil Nadu\'s most trusted name in plotted development, where every customer proudly says, "I own a plot from Green World." Whether you\'re looking to build your dream home, secure your retirement land, or make a smart investment, Green World is here to help you grow — plot by plot, trust by trust.',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 text-green-800">Our Values & Vision</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-green-400 mx-auto mb-6"></div>
          <p className="text-xl text-black max-w-3xl mx-auto">
            Building trust, delivering excellence, creating lasting value
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              <div
  className="p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 h-full transform hover:-translate-y-2"
  style={{ backgroundColor: '#073e04ff' }}
>
                <div className="flex flex-col items-center text-center">
                  <div className={`bg-gradient-to-br ${section.color} p-4 rounded-full mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <section.icon className="text-white" size={40} />
                  </div>
                 <h3 className="text-2xl mb-4" style={{ color: '#ffdd45ff' }}>{section.title}</h3>
                  <p className="text-white leading-relaxed">{section.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ISO Certification Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 text-white px-8 py-4 rounded-full shadow-xl"
  style={{ backgroundColor: '#073e04ff' }}
>
  <Award size={32} style={{ color: '#ffdd45ff' }} />
            <div className="text-left">
              <p className="text-sm">Certified Company</p>
              <p className="text-lg">ISO 9001:2015</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
