import React from 'react';
import { Link } from 'react-router-dom';

const ModernFooter = () => {
  return (
    <footer className="bg-accent/50 text-text py-12 mt-16">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold font-display text-primary mb-4">M&M Interior Works</h3>
          <p className="text-gray-600">Transforming spaces with elegance and precision.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link to="/projects" className="hover:text-primary transition-colors">Projects</Link></li>
            <li><Link to="/showroom" className="hover:text-primary transition-colors">Showroom</Link></li>
            <li><Link to="/book-call" className="hover:text-primary transition-colors">Book a Call</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            {/* Add social media icons here */}
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <p>123 Interior Lane, Design City</p>
          <p>contact@mminteriorworks.com</p>
        </div>
      </div>
      <div className="text-center mt-8 pt-8 border-t border-secondary">
        <p>&copy; {new Date().getFullYear()} M&M Interior Works. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default ModernFooter;
