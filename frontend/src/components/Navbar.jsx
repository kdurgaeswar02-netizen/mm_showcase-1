import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'About Us', path: '/about' },
  { name: 'Admin', path: '/admin/login' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const mobileMenuVariants = {
    hidden: { x: '-100%', opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    exit: { x: '-100%', opacity: 0, transition: { duration: 0.3 } }
  };
  
  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${hasScrolled ? 'bg-white/80 backdrop-blur-xl shadow-md' : 'bg-white'}`}>
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3">
            <img src="/logo.png" alt="M&M Interior Works Logo" className="h-10 w-auto" />
            <span className="text-xl font-bold text-black">
              M&M Interior Works
            </span>
          </Link>

          {/* Desktop Menu */}
          <motion.div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative text-base font-medium text-gray-700 hover:text-black transition-colors duration-300 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
              </Link>
            ))}
          </motion.div>

          <div className="hidden md:flex items-center">
             <Link to="/book-call">
                <button className="bg-gradient-to-r from-gray-800 to-black text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2">
                    Book a Call <ArrowRight size={18}/>
                </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-black">
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
            className="fixed inset-0 bg-white/95 backdrop-blur-xl z-50 md:hidden"
          >
            <div className="container mx-auto px-6 py-4 h-full">
              <div className="flex justify-between items-center">
                 <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center space-x-3">
                    <img src="/logo.png" alt="M&M Interior Works Logo" className="h-10 w-auto" />
                    <span className="text-xl font-bold text-black">M&M Interior Works</span>
                 </Link>
                <button onClick={toggleMenu} className="text-black">
                  <X size={28} />
                </button>
              </div>
              <motion.div 
                className="flex flex-col items-start justify-center h-full space-y-6 -mt-16 pl-5"
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                >
                {navLinks.map((link) => (
                  <motion.div key={link.path} variants={navItemVariants}>
                    <Link
                      to={link.path}
                      className="text-4xl font-semibold text-black hover:text-gray-700 transition-colors duration-300"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div variants={navItemVariants}>
                    <Link to="/book-call" onClick={() => setIsOpen(false)}>
                        <button className="bg-gradient-to-r from-gray-800 to-black text-white px-8 py-4 rounded-full font-bold text-2xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 mt-8">
                            Book a Call <ArrowRight size={22}/>
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
