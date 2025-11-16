import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, ThumbsUp } from 'lucide-react';
import axios from 'axios';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('/api/reviews');
        setReviews(response.data);
      } catch (err) {
        setError('Error fetching reviews. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
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

  if (loading) {
    return <div className="text-center p-8">Loading reviews...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-6 py-12 animate-fade-in">
      <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
        <h1 className="text-5xl font-bold font-display text-center text-primary mb-4">Words of Appreciation</h1>
        <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12 font-serif">Our clients' satisfaction is our greatest achievement. Here's what they have to say about their experience with M&M Interior Works.</p>
      </motion.div>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
        {reviews.map((review, index) => (
            <motion.div 
                key={review._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="break-inside-avoid bg-white p-6 rounded-xl shadow-lg border border-transparent hover:border-primary transition-all duration-300">
               
                {review.youtubeUrl && review.youtubeUrl.includes('VIDEO_ID') ? (
                   <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden mb-4 bg-slate-200 flex items-center justify-center">
                       <p className='text-sm text-slate-500'>YouTube video placeholder</p>
                   </div>
                ) : review.youtubeUrl ? (
                    <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden mb-4">
                        <iframe
                            src={review.youtubeUrl}
                            title={`Review by ${review.name}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                        ></iframe>
                    </div>
                ) : null}

                 <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full">
                        <ThumbsUp size={24} />
                    </div>
                    <div>
                        <p className="text-gray-700 leading-snug">\"{review.comment}\"</p>
                        <div className="mt-4 flex items-center justify-between">
                            <div>
                                <p className="font-bold text-gray-800">{review.author}</p>
                            </div>
                           {renderStars(5)}
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
