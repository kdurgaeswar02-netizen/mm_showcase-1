import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import axios from 'axios';

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
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await axios.get('/api/faqs');
        setFaqs(response.data);
      } catch (err) {
        setError('Error fetching FAQs. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  const handleFaqClick = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  if (loading) {
    return <div className="text-center p-8">Loading FAQs...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-6 py-12 animate-fade-in">
      <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
        <h1 className="text-5xl font-bold font-display text-center text-primary mb-4">Got Questions?</h1>
        <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12 font-serif">We have answers. Here are some of the most common questions we get about our services and process.</p>
      </motion.div>

      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <AccordionItem 
            key={faq._id} 
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
