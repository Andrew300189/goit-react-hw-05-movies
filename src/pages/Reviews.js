import React from 'react';

const Reviews = ({ reviews }) => {
  return (
    <div>
      <h2>Reviews</h2>
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