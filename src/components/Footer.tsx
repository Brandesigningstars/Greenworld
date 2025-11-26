import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import logoVideo from '../assets/logo.mp4'; // ✅ Import video instead of image

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-b from-[#e8f0eb] to-[#dce5de] text-black">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            {/* ✅ Centered and Enlarged Video Logo */}
           <video
  src={logoVideo}
  autoPlay
  loop
  muted
  playsInline
  className="h-24 mb-6 rounded-md mx-auto bg-transparent object-contain"
  style={{ display: 'block' }}
/>


            <p className="text-gray-700 mb-4 leading-relaxed max-w-xs">
              ISO 9001:2015 Certified Land Promotors since 2007. Building dreams and creating homes with excellence.
            </p>

            <div className="flex gap-4 justify-center lg:justify-start">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="bg-gray-200 hover:bg-[#a5da93] text-green-800 p-2 rounded-full transition-all duration-300 transform hover:scale-110"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-xl mb-6 font-semibold text-gray-800">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-gray-700 hover:text-green-600 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-0 group-hover:w-4 h-0.5 bg-green-600 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl mb-6 font-semibold text-gray-800">Contact Info</h3>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-green-600 flex-shrink-0 mt-1" />
                <span>Chennai, Tamil Nadu, India</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={20} className="text-green-600 flex-shrink-0 mt-1" />
                <a href="tel:+919600077816" className="hover:text-green-600 transition-colors">
                  96000 77816
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={20} className="text-green-600 flex-shrink-0 mt-1" />
                <a
                  href="mailto:greenworldrealtors012@gmail.com"
                  className="hover:text-green-600 transition-colors"
                >
                  greenworldrealtors012@gmail.com
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Business Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-xl mb-6 font-semibold text-gray-800">Business Hours</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex justify-between">
                <span>Monday - Friday:</span>
                <span className="text-green-700">9:00 AM - 7:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday:</span>
                <span className="text-green-700">9:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday:</span>
                <span className="text-gray-500">Closed</span>
              </li>
            </ul>

            <div className="mt-6 bg-green-600 p-4 rounded-lg text-white text-center">
              <p className="text-sm font-medium">ISO 9001:2015 Certified Company</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-300 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-center md:text-left">
              © {currentYear} Green World Realtors. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-600 hover:text-green-700 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-600 hover:text-green-700 transition-colors">
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}