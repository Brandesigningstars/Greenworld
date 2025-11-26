import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Quote, Star } from 'lucide-react';
import { Card } from './ui/card';

export default function Testimonials() {
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

  const testimonials = [
    {
      name: 'Sathish Kumar',
      location: 'Chennai',
      rating: 5,
      text: 'I had a great experience buying my plot through GreenWorld. The team was transparent, helpful, and made the process smooth from start to finish. I highly recommend them for anyone looking for DTCP-approved land near GST Road.',
      project: 'DTCP Layout near GST Road',
    },
    {
      name: 'Revathi',
      location: 'Kanchipuram',
      rating: 5,
      text: 'What I loved most was their honesty and clarity. No hidden charges, and they patiently explained the legal documents. My family is now planning to build our dream home here!',
      project: 'Residential Plot',
    },
    {
      name: 'Prakash R',
      location: 'Tambaram',
      rating: 5,
      text: 'Excellent location, great investment! I bought a plot near Melmaruvathur Temple through GreenWorld. The fencing, roads, and layout are well-developed, and the staff guided me properly.',
      project: 'Melmaruvathur Layout',
    },
  ];

  return (
    <section id="testimonials" ref={sectionRef} className="py-20 bg-gradient-to-br from-green-50 via-white to-green-50">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 text-green-800">What Our Clients Say</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-green-400 mx-auto mb-6"></div>
          <p className="text-xl text-black max-w-3xl mx-auto">
            Real experiences from our satisfied customers
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card
                className="p-6 h-full hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-none shadow-lg relative overflow-hidden"
                style={{ backgroundColor: '#073e04ff' }} // ✅ Changed card color here
              >
                <div className="absolute top-0 right-0 text-white opacity-50">
                  <Quote size={80} />
                </div>
                <div className="relative z-10">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={20} className="text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-white mb-6 italic leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div className="border-t border-gray-200 pt-4">
                   <p className="font-semibold" style={{ color: '#ffdd45ff' }}>{testimonial.name}</p>
                    <p className="text-sm text-white">{testimonial.location}</p>
                    <p className="text-sm text-white mt-1">{testimonial.project}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
