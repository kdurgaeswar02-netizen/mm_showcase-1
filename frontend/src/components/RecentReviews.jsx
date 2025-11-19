import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ThumbsUp } from 'lucide-react';
import API from '../api/api';

const RecentReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await API.get('/api/reviews');
        setReviews(response.data.slice(0, 3));
      } catch (err) {
        console.error('Error fetching reviews:', err);
      }
    };

    fetchReviews();
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(<Star key={i} size={18} className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}/>);
    }
    return <div className="flex items-center gap-1">{stars}</div>;
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true, amount: 0.2 }}
      className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 font-display text-primary">What Our Clients Say</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
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
                  <p className='text-gray-700 leading-snug'>\"{review.message}\"</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className='font-bold text-gray-800'>{review.name}</p>
                    </div>
                    {renderStars(review.rating)}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/reviews">
            <button className="bg-primary text-white px-8 py-3 rounded-md font-semibold hover:scale-105 transition-transform duration-300 flex items-center gap-2 mx-auto shadow-lg">
              View All Reviews
            </button>
          </Link>
        </div>
      </div>
    </motion.section>
  );
};

export default RecentReviews;
