import React from 'react';
import { motion } from 'framer-motion';
import { Users, CheckCircle, Target } from 'lucide-react';

const About = () => {
  return (
    <div className="container mx-auto px-6 py-12 animate-fade-in">
      <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
        <h1 className="text-5xl font-bold font-display text-center text-primary mb-4">About Us</h1>
        <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12 font-serif">
          At M&M Interior Works, we specialize in crafting premium aluminium solutions that elevate residential and commercial spaces. With 5+ years of hands-on experience, we have built a strong reputation for quality, reliability, and attention to detail.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="max-w-md">
          <img src="/about-us.png" alt="Our team" className="rounded-xl shadow-lg" />
        </motion.div>
        <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Based in Vizag, our team has successfully delivered 100+ projects across Visakhapatnam, Vizianagaram, Srikakulam, and several other cities. From aluminium partitions and elevations to windows, doors, and custom designs, we ensure every project is finished with precision and long-lasting durability.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            What sets us apart is our commitment to quality materials, skilled craftsmanship, and on-time delivery. No matter where your project is located, we are ready to work at any site and bring exceptional results that meet your expectations.
          </p>
        </motion.div>
      </div>

      <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-center mt-16">
        <h2 className="text-3xl font-bold font-display text-primary mb-4">Our Philosophy</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto font-serif">
          At M&M Interior Works, we don’t just build structures — we create spaces that reflect strength, style, and trust.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 mt-16 text-center">
        <div className="bg-gray-50 p-8 rounded-xl shadow-lg">
          <Users size={40} className="mx-auto text-primary mb-4" />
          <h3 className="text-2xl font-bold font-display mb-2">100+</h3>
          <p className="text-gray-600">Projects Delivered</p>
        </div>
        <div className="bg-gray-50 p-8 rounded-xl shadow-lg">
          <CheckCircle size={40} className="mx-auto text-primary mb-4" />
          <h3 className="text-2xl font-bold font-display mb-2">5+</h3>
          <p className="text-gray-600">Years of Experience</p>
        </div>
        <div className="bg-gray-50 p-8 rounded-xl shadow-lg">
          <Target size={40} className="mx-auto text-primary mb-4" />
          <h3 className="text-2xl font-bold font-display mb-2">Vizag-Based</h3>
          <p className="text-gray-600">Serving Multiple Cities</p>
        </div>
      </div>
    </div>
  );
};

export default About;
