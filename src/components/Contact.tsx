import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // WhatsApp message
    const whatsappMessage = `Hello Green World Realtors,\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nMessage: ${formData.message}`;
    const whatsappUrl = `https://wa.me/919600077816?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');

    toast.success('Message sent! We will contact you soon.');

    // Google Ads conversion event
    (window as any)?.gtag?.('event', 'conversion', {
      send_to: 'AW-17222552794/JYu3CI-JuM4bENqZrZRA',
      value: 1.0,
      currency: 'INR',
    });
    
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Address',
      content: '85, Srinivasan Perumal Kovil St, C. Pallavaram, Pallavaram, Chennai, Tamil Nadu 600043',
      color: 'text-red-600',
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '96000 77816',
      color: 'text-green-600',
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'greenworldrealtors012@gmail.com',
      color: 'text-blue-600',
    },
    {
      icon: Clock,
      title: 'Working Hours',
      content: 'Mon - Sat: 9:00 AM - 7:00 PM',
      color: 'text-purple-600',
    },
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-20 overflow-x-hidden" style={{ backgroundColor: '#073e04ff' }}>
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 text-white">Contact Us</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-green-400 mx-auto mb-6"></div>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Get in touch with us for any queries or to schedule a site visit
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="bg-white/20 backdrop-blur-sm p-8 rounded-2xl shadow-xl"
          >
           <h3 className="text-2xl mb-6" style={{ color: '#ffdd45ff' }}>Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white mb-2">Your Name</label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your name"
                  required
                  className="w-full border-gray-300 focus:border-green-500 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-white mb-2">Email Address</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your email"
                  required
                  className="w-full border-gray-300 focus:border-green-500 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-white mb-2">Phone Number</label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Enter your phone number"
                  required
                  className="w-full border-gray-300 focus:border-green-500 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-white mb-2">Your Message</label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your requirements"
                  required
                  rows={4}
                  className="w-full border-gray-300 focus:border-green-500 focus:ring-green-500"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Send Message
              </Button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="bg-white/20 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4">
                    <div className={`${info.color} bg-gray-50 p-3 rounded-full`}>
                      <info.icon size={28} />
                    </div>
                    <div>
                     <h4 className="text-lg mb-1" style={{ color: '#ffdd45ff' }}>{info.title}</h4>
                      <p className="text-white">{info.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8 bg-gradient-to-br from-green-600 to-green-700 p-8 rounded-xl shadow-xl text-white"
            >
              <h3 className="text-2xl mb-4">Visit Our Office</h3>
              <p className="mb-6">
                Schedule a visit to our office to discuss your property requirements and explore our projects.
              </p>
              <Button
                onClick={() => {
                  const element = document.querySelector('#home');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white text-green-700 hover:bg-gray-100 w-full py-6 shadow-lg"
              >
                Book an Appointment
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
