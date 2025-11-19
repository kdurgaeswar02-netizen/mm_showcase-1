import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, CheckCircle } from 'lucide-react';

const ReviewsAdmin = () => {
  const [reviews, setReviews] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await fetch('/api/reviews', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await response.json();
      setReviews(data);
    };
    fetchReviews();
  }, [token]);

  const handleApprove = async (id) => {
    const response = await fetch(`/api/reviews/${id}/approve`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (response.ok) {
      setReviews(reviews.map(r => r._id === id ? { ...r, approved: true } : r));
    }
  };

  const handleDelete = async (id) => {
    await fetch(`/api/reviews/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    setReviews(reviews.filter(r => r._id !== id));
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
                    <Button size="sm" onClick={() => handleApprove(review._id)} className="text-white">
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
              {review.approved ? <p className='text-green-600'>Approved</p> : <p className='text-red-600'>Not Approved</p>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReviewsAdmin;
