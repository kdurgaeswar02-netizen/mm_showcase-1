import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'About Us', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'Admin', path: '/admin/login' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const mobileMenuVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    exit: { x: '100%', opacity: 0, transition: { duration: 0.3 } }
  };
  
  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };


  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-xl shadow-md' : 'bg-transparent'}`}>
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/">
            <img src="/logo.jpeg" alt="M&M Interior Works" className="h-12 w-auto" />
          </Link>

          {/* Desktop Menu */}
          <motion.div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-md text-lg font-medium transition-colors duration-300 ${
                  location.pathname === link.path
                    ? 'text-primary'
                    : isScrolled ? 'text-white hover:text-primary' : 'text-gray-700 hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}
             <Link to="/book-call">
                <button className="bg-primary text-white px-5 py-2 rounded-md font-semibold hover:bg-primary/90 transition-all duration-300 flex items-center gap-2 ml-4">
                    Book a Call <ArrowRight size={18}/>
                </button>
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-primary">
              <Menu size={28} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/90 backdrop-blur-2xl z-50 md:hidden"
          >
            <div className="container mx-auto px-6 py-4 h-full">
              <div className="flex justify-between items-center">
                 <Link to="/" onClick={() => setIsOpen(false)}>
                    <img src="/logo.jpeg" alt="M&M Interior Works" className="h-12 w-auto" />
                 </Link>
                <button onClick={toggleMenu} className="text-primary">
                  <X size={28} />
                </button>
              </div>
              <motion.div 
                className="flex flex-col items-center justify-center h-full space-y-6 -mt-16"
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                >
                {navLinks.map((link) => (
                  <motion.div key={link.path} variants={navItemVariants}>
                    <Link
                      to={link.path}
                      className={`text-3xl font-semibold transition-colors duration-300 ${
                        location.pathname === link.path ? 'text-primary' : 'text-white hover:text-primary'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div variants={navItemVariants}>
                    <Link to="/book-call" onClick={() => setIsOpen(false)}>
                        <button className="bg-primary text-white px-8 py-4 rounded-lg font-bold text-xl hover:bg-primary/90 transition-all duration-300 flex items-center gap-2 mt-8">
                            Book a Call <ArrowRight size={20}/>
                        </button>
                    </Link>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;