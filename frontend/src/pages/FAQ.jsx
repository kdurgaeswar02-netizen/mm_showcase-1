import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const dummyFaqs = [
  {
    question: 'What types of interior services do you offer?',
    answer: 'We specialize in premium aluminum interiors, including modular kitchens, wardrobes, partitions, windows, and false ceilings. We handle everything from design to installation.'
  },
  {
    question: 'What is the typical timeline for a project?',
    answer: 'A typical residential project can take anywhere from 4 to 8 weeks, depending on the scope and complexity. Commercial projects have a more varied timeline, which we establish and agree upon before starting.'
  },
  {
    question: 'Do you provide a warranty for your work?',
    answer: 'Yes, all our workmanship and materials come with a comprehensive warranty. The specific terms and duration depend on the products used, and we provide all warranty details in our project agreement.'
  },
  {
    question: 'Can I see samples of the materials you use?',
    answer: 'Absolutely! We encourage you to visit our showroom to see and feel the high-quality materials, finishes, and hardware we use. You can also see completed projects in our portfolio.'
  },
  {
    question: 'How do I get a quote for my project?',
    answer: 'You can start by booking a free consultation call with us through our website. We will discuss your requirements, and our team will then prepare a detailed, no-obligation quote for your project.'
  }
];

const AccordionItem = ({ faq, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 py-4">
      <button onClick={onClick} className="w-full flex justify-between items-center text-left">
        <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown size={24} className={`text-primary transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: 'auto', opacity: 1, marginTop: '16px' }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden">
            <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const handleFaqClick = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="container mx-auto px-6 py-12 animate-fade-in">
      <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
        <h1 className="text-5xl font-bold font-display text-center text-primary mb-4">Got Questions?</h1>
        <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12 font-serif">We have answers. Here are some of the most common questions we get about our services and process.</p>
      </motion.div>

      <div className="max-w-3xl mx-auto">
        {dummyFaqs.map((faq, index) => (
          <AccordionItem 
            key={index} 
            faq={faq} 
            isOpen={openFaq === index} 
            onClick={() => handleFaqClick(index)} 
          />
        ))}
      </div>
    </div>
  );
};

export default FAQ;
