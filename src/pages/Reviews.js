import React, { useEffect, useState } from 'react';
import { getMovieReviews } from '../services/api';
import { useParams } from 'react-router-dom';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchMovieReviews = async () => {
      try {
        const reviewsData = await getMovieReviews(movieId);
        setReviews(reviewsData.results);
      } catch (error) {
        console.error('Error', error);
      }
    };

    fetchMovieReviews();
  }, [movieId]);

  return (
    <div>
      <h3>Reviews</h3>
      {reviews.length > 0 ? (
        reviews.map(review => (
          <div key={review.id}>
            <p>Author: {review.author}</p>
            <p>Content: {review.content}</p>
          </div>
        ))
      ) : (
        <div>We don't have any reviews for this movie.</div>
      )}
    </div>
  );
};

export default Reviews;
