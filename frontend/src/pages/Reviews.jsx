import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, ThumbsUp } from 'lucide-react';
import API from '../api/api';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(5);
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
      const response = await API.post('/reviews', { name, message, rating });
      setReviews([response.data, ...reviews]);
      setName('');
      setMessage('');
      setRating(5);
      setSuccess('Thank you for your review!');
    } catch (err) {
      setError('There was an error submitting your review. Please try again.');
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(<Star key={i} size={18} className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}/>);
    }
    return <div className="flex items-center gap-1">{stars}</div>;
  };

  return (
    <div className="container mx-auto px-6 py-12 animate-fade-in">
      <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
        <h1 className="text-5xl font-bold font-display text-center text-primary mb-4">Words of Appreciation</h1>
        <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12 font-serif">Our clients' satisfaction is our greatest achievement. Here's what they have to say about their experience with M&M Interior Works.</p>
      </motion.div>

      {/* Review Form */}
      <div className="max-w-2xl mx-auto mb-16">
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
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating</label>
              <div className="flex items-center gap-2 mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    size={24} 
                    className={`cursor-pointer ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
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
      </div>

      {/* Reviews List */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
        {reviews.map((review, index) => (
            <motion.div 
                key={review._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="break-inside-avoid bg-white p-6 rounded-xl shadow-lg border border-transparent hover:border-primary transition-all duration-300">
              <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full">
                        <ThumbsUp size={24} />
                    </div>
                    <div>
                        <p className="text-gray-700 leading-snug">\"{review.message}\"</p>
                        <div className="mt-4 flex items-center justify-between">
                            <div>
                                <p className="font-bold text-gray-800">{review.name}</p>
                            </div>
                           {renderStars(review.rating)}
                        </div>
                    </div>
                </div>
            </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
