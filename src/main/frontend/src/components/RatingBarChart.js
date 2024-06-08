import React from 'react';
import './css/RatingBarChart.css';

const RatingBarChart = ({ reviews }) => {
  const totalReviews = reviews.length;
  const sumOfRatings = reviews.reduce((sum, review) => sum + review.starPoint, 0);
  const averageRating = totalReviews > 0 ? (sumOfRatings / totalReviews).toFixed(1) : 0;

  const ratingCounts = [0, 0, 0, 0, 0];
  reviews.forEach(review => {
    ratingCounts[review.starPoint - 1]++;
  });

  return (
    <div className="rating-bar-chart">
      <div className="average-rating">
        평균 별점: <span>{averageRating}</span>
      </div> 
      <div className="star">
        ★
        <div className="bar-chart"> 
          {ratingCounts.map((count, index) => (
            <div key={index} className="bar" style={{ height: `${(count / totalReviews) * 100}%`, minHeight: '10px' }}>
              <div className="bar-value">
                {'★'.repeat(index + 1)}: {count}
              </div>
            </div>
          ))}
        </div>
        ★ ★ ★ ★ ★
      </div>
    </div>
  );
};

export default RatingBarChart;
