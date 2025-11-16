import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import API from '../api/api';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await API.get('/reviews');
      setReviews(response.data);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await API.post('/reviews', { name, message });
      setReviews([response.data, ...reviews]);
      setName('');
      setMessage('');
      setSuccess('Thank you for your review!');
    } catch (err) {
      setError('There was an error submitting your review. Please try again.');
    }
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true, amount: 0.2 }}
      className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 font-display text-primary">What Our Clients Say</h2>
        
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Review Form */}
          <div className="bg-gray-50 p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold font-display mb-6 text-gray-800">Leave a Review</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea 
                  id="message" 
                  rows="4" 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} 
                  className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  required
                ></textarea>
              </div>
              <div>
                <button 
                  type="submit" 
                  className="w-full bg-primary text-white py-3 px-4 rounded-md font-semibold hover:bg-primary/90 transition-all duration-300 shadow-md">
                  Submit Review
                </button>
              </div>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
            </form>
          </div>

          {/* Reviews List */}
          <div className="space-y-6">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <motion.div 
                  key={review._id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                  <p className="text-gray-600 font-serif italic">"{review.message}"</p>
                  <p className="text-right text-primary font-semibold mt-4">- {review.name}</p>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-500">No reviews yet. Be the first to leave one!</p>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Reviews;
