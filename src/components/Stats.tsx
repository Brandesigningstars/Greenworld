import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Building2, Users, Award, Home } from 'lucide-react';

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { icon: Building2, value: 50, suffix: '+', label: 'Projects Completed', color: 'text-green-600' },
    { icon: Users, value: 5000, suffix: '+', label: 'Happy Customers', color: 'text-blue-600' },
    { icon: Award, value: 18, suffix: ' Years', label: 'Industry Experience', color: 'text-yellow-600' },
    { icon: Home, value: 100, suffix: '%', label: 'DTCP Approved', color: 'text-purple-600' },
  ];

  const Counter = ({ end, suffix }: { end: number; suffix: string }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isVisible) return;

      const duration = 2000;
      const steps = 60;
      const increment = end / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }, [isVisible, end]);

    return (
      <span>
        {count}
        {suffix}
      </span>
    );
  };

  return (
    <section ref={sectionRef} className="py-16 bg-gradient-to-br from-green-50 to-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="flex justify-center mb-4">
                <div className={`${stat.color} bg-white p-4 rounded-full shadow-lg`}>
                  <stat.icon size={40} />
                </div>
              </div>
              <div className="text-3xl md:text-4xl mb-2">
                <Counter end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
