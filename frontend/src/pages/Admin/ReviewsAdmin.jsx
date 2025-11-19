import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, CheckCircle } from 'lucide-react';

import API from '../../api/api';

const ReviewsAdmin = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await API.get('/api/reviews');
        setReviews(response.data);
      } catch (error) {
        console.error("Failed to fetch reviews", error);
      }
    };
    fetchReviews();
  }, []);

  const handleApprove = async (id) => {
    try {
      await API.put(`/api/reviews/${id}/approve`);
      
      setReviews(reviews.map(r => r._id === id ? { ...r, approved: true } : r));
    } catch (error) {
      console.error("Failed to approve review", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await API.delete(`/api/reviews/${id}`);
        setReviews(reviews.filter(r => r._id !== id));
      } catch (error) {
        console.error("Failed to delete review", error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Manage Reviews</h1>
      <div className="space-y-4">
        {reviews.map(review => (
          <Card key={review._id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {review.name}
                <div className="flex space-x-2">
                  {!review.approved && (
                    <Button size="sm" onClick={() => handleApprove(review._id)} className="text-white bg-green-600 hover:bg-green-700">
                      <CheckCircle className="h-4 w-4 mr-2" /> Approve
                    </Button>
                  )}
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(review._id)} className="text-white">
                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Rating: {'⭐'.repeat(review.rating)}</p>
              <p className="mt-2">{review.comment}</p>
              {review.approved ? <p className='text-green-600 font-semibold mt-2'>Approved</p> : <p className='text-red-600 font-semibold mt-2'>Not Approved</p>}
            </CardContent>
          </Card>
        ))}
        {reviews.length === 0 && <p className="text-center text-gray-500">No reviews found.</p>}
      </div>
    </div>
  );
};

export default ReviewsAdmin;
