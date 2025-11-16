import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { title: "Home", href: "/" },
  { title: "Showroom", href: "/showroom" },
  { title: "Projects", href: "/projects" },
  { title: "Reviews", href: "/reviews" },
  { title: "FAQ", href: "/faq" },
];

const ModernNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const activeLinkStyle = {
    color: '#0891b2', // primary color
    fontWeight: '600',
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen ? 'bg-white/80 backdrop-blur-lg shadow-sm' : 'bg-transparent'
      }`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className={`text-2xl font-bold font-display transition-colors duration-300 ${
            isScrolled || isMobileMenuOpen ? 'text-primary' : 'text-white' 
        }`}>
          M&M Interior Works
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              style={({ isActive }) => isActive ? activeLinkStyle : {}}
              className={`transition-colors duration-300 font-medium ${
                isScrolled || isMobileMenuOpen ? 'text-gray-700 hover:text-primary' : 'text-gray-200 hover:text-white' 
              }`}>
              {link.title}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Link to="/book-call">
            <button className="bg-primary text-white px-5 py-2 rounded-md font-semibold hover:bg-opacity-90 transition-all duration-300 shadow-sm">
              Book a Call
            </button>
          </Link>
          <Link to="/admin/login" className={`font-medium transition-colors duration-300 ${
                isScrolled || isMobileMenuOpen ? 'text-gray-700 hover:text-primary' : 'text-gray-200 hover:text-white' 
              }`}>
            Admin
          </Link>
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu} className={`focus:outline-none transition-colors duration-300 ${
                isScrolled || isMobileMenuOpen ? 'text-gray-700' : 'text-white' 
              }`}>
            {isMobileMenuOpen ? <X size={28}/> : <Menu size={28}/>}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200/50">
            <div className="flex flex-col items-center py-6 space-y-5">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  onClick={toggleMobileMenu}
                  style={({ isActive }) => isActive ? activeLinkStyle : {}}
                  className="text-gray-700 hover:text-primary transition-colors duration-300 text-lg">
                  {link.title}
                </NavLink>
              ))}
              <div className="w-full h-px bg-gray-200 my-2"></div>
              <Link to="/book-call" onClick={toggleMobileMenu}>
                <button className="bg-primary text-white px-8 py-3 rounded-md font-semibold hover:bg-opacity-90 transition-all duration-300 w-full">
                  Book a Call
                </button>
              </Link>
              <Link to="/admin/login" onClick={toggleMobileMenu} className="text-gray-700 hover:text-primary transition-colors duration-300">
                Admin Login
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default ModernNavbar;
