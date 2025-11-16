import React, { useState } from 'react';
import { motion } from 'framer-motion';

const dummyProducts = [
    { _id: '1', name: 'Italian Marble Finish', type: 'Kitchen Cabinet', pricePerSqft: 2500, image: '/showroom-1.jpg' },
    { _id: '2', name: 'Matte Black Handle', type: 'Hardware', pricePerSqft: null, image: '/showroom-2.jpg' },
    { _id: '3', name: 'Oak Wood Flooring', type: 'Flooring', pricePerSqft: 800, image: '/showroom-3.jpg' },
    { _id: '4', name: 'Minimalist Wardrobe', type: 'Bedroom', pricePerSqft: 1800, image: '/showroom-4.jpg' },
    { _id: '5', name: 'Fluted Glass Partition', type: 'Partition', pricePerSqft: 1200, image: '/showroom-5.jpg' },
    { _id: '6', name: 'Smart LED Mirror', type: 'Bathroom', pricePerSqft: null, image: '/showroom-6.jpg' },
    { _id: '7', name: 'Quartz Countertop', type: 'Kitchen', pricePerSqft: 3500, image: '/showroom-7.jpg' },
    { _id: '8', name: 'Designer Ceiling Fan', type: 'Accessory', pricePerSqft: null, image: '/showroom-8.jpg' },
];

const Showroom = () => {
  return (
    <div className="container mx-auto px-6 py-12 animate-fade-in">
       <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
        <h1 className="text-5xl font-bold font-display text-center text-primary mb-4">Our Showroom</h1>
        <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12 font-serif">Explore our curated collection of high-quality materials, finishes, and hardware. See and feel the elements that will bring your space to life.</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {dummyProducts.map((product, index) => (
          <motion.div 
            key={product._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-lg shadow-md overflow-hidden group">
            <div className="h-64 overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-semibold text-gray-800 font-sans truncate">{product.name}</h3>
              <p className="text-gray-500 text-sm mb-3">{product.type}</p>
              {product.pricePerSqft && (
                <p className="text-lg font-bold text-primary">₹{product.pricePerSqft.toLocaleString()}<span className="text-sm font-normal text-gray-500">/sqft</span></p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Showroom;
