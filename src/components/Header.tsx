import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, X, UserCircle } from 'lucide-react';
import { Button } from './ui/button';
import logoVideo from '../assets/logo.mp4';

interface HeaderProps {
  onBookVisitClick: () => void;
  onAdminClick: () => void;
}

export default function Header({ onBookVisitClick, onAdminClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-4 left-0 right-0 z-50 transition-all duration-300"
    >
      {/* Capsule Navbar container */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={isScrolled ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="container mx-auto max-w-6xl rounded-full bg-white shadow-lg"  // 🔥 Capsule is now solid white
      >
        <div className="flex items-center justify-between py-2 px-4 lg:px-8">
          {/* Video Logo */}
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#home');
            }}
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <video
              src={logoVideo}
              autoPlay
              loop
              muted
              playsInline
              className="h-12 md:h-16 rounded-md"
            />
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className="text-gray-700 hover:text-green-700 transition-colors duration-300 relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-700 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Buttons */}
          <div className="hidden lg:flex items-center gap-3">
           {/*  <Button
              onClick={onAdminClick}
              variant="outline"
              size="icon"
              className="border-2 border-green-600 text-green-700 hover:bg-green-50 transition-all duration-300"
              title="Admin Login"
            >
              <UserCircle size={22} />
            </Button> */}
            <Button
              onClick={onBookVisitClick}
              className="bg-gradient-to-r from-green-700 to-green-600 hover:from-green-800 hover:to-green-700 text-white px-6 py-2.5 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Book a Visit
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-700 hover:text-green-700 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="lg:hidden mt-2 mx-4 p-4 bg-white rounded-lg shadow-xl"
        >
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className="text-gray-700 hover:text-green-700 transition-colors duration-300 py-2"
              >
                {item.name}
              </a>
            ))}
            {/* Admin Login button - Hidden in mobile view for future use */}
            {/* <Button
              onClick={() => {
                onAdminClick();
                setIsMobileMenuOpen(false);
              }}
              variant="outline"
              className="border-2 border-green-600 text-green-700 hover:bg-green-50 w-full"
            >
              <UserCircle size={18} className="mr-2" />
              Admin Login
            </Button> */}
            <Button
              onClick={() => {
                onBookVisitClick();
                setIsMobileMenuOpen(false);
              }}
              className="bg-gradient-to-r from-green-700 to-green-600 hover:from-green-800 hover:to-green-700 text-white w-full shadow-lg"
            >
              Book a Visit
            </Button>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}
