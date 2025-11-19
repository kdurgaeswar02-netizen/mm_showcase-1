import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "Working with this team was a dream. They took our vision and brought it to life with incredible attention to detail and creativity.",
    name: "Alex Johnson",
    company: "Tech Innovators Inc."
  },
  {
    quote: "The final result was beyond our expectations. Their professionalism and craftsmanship are unmatched. Highly recommended!",
    name: "Maria Garcia",
    company: "Creative Solutions Co."
  },
  {
    quote: "A truly collaborative process. They listened to our needs and delivered a space that is both beautiful and functional.",
    name: "David Chen",
    company: "Future Homes Realty"
  }
];

const Testimonials = () => {
  return (
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          What Our Clients Say
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-gray-600 italic mb-6">"{testimonial.quote}"</p>
              <p className="text-gray-800 font-bold">{testimonial.name}</p>
              <p className="text-gray-500">{testimonial.company}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
