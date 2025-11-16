import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { title: "Home", href: "/" },
  { title: "Showroom", href: "/showroom" },
  { title: "Projects", href: "/projects" },
  { title: "Reviews", href: "/reviews" },
  { title: "FAQ", href: "/faq" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold font-display text-primary">
          M&M Interior Works
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-gray-700 hover:text-primary transition-colors duration-300">
              {link.title}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Link to="/book-call">
            <button className="bg-primary text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition-all duration-300">
              Book a Call
            </button>
          </Link>
          <Link to="/admin/login" className="text-gray-700 hover:text-primary transition-colors duration-300">
            Admin
          </Link>
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu} className="text-gray-700 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/90 backdrop-blur-md">
            <div className="flex flex-col items-center py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={toggleMobileMenu}
                  className="text-gray-700 hover:text-primary transition-colors duration-300">
                  {link.title}
                </Link>
              ))}
              <Link to="/book-call" onClick={toggleMobileMenu}>
                <button className="bg-primary text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition-all duration-300">
                  Book a Call
                </button>
              </Link>
              <Link to="/admin/login" onClick={toggleMobileMenu} className="text-gray-700 hover:text-primary transition-colors duration-300">
                Admin
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
