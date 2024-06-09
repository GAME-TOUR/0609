import React, { useState } from 'react';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import './css/GameDetailPage.css';
import './css/ReviewForm.css';

const ReviewComponent = ({ existingReview, fetchReviews, onRemove }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [review, setReview] = useState(existingReview);
    const [userReviews, setUserReviews] = useState([]);

    const handleUpdateReview = async () => {
        try {
            await axios.patch(`http://localhost:8080/reviews/update/${review.id}`, {
                content: review.content,
                starPoint: review.starPoint,
            }, {
                withCredentials: true,
            });
            alert('리뷰가 수정되었습니다.');
            setIsEditing(false); // Exit edit mode
            fetchReviews(); // Fetch reviews again to update the list
        } catch (error) {
            alert('수정 권한이 없습니다.');
        }
    };

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    const fetchUserReviews = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/reviews/user/${review.user.id}`);
            setUserReviews(response.data);
        } catch (error) {
            console.error('Failed to fetch user reviews:', error);
        }
    };


    return (
        <div className="existing-review">
            <span>나의 별점과 코멘트 &nbsp;</span>
            <StarRatings
                rating={review.starPoint}
                starDimension="25px"
                starSpacing="2px"
                starRatedColor="gold"
                starEmptyColor="gray"
                readonly
            />
            <div className='review-ar'>
                <textarea 
                    readOnly={!isEditing}
                    value={review.content}
                    onChange={(e) => {
                      setReview((prevReview) => ({
                        ...prevReview,
                        content: e.target.value,
                      }));
                    }}
                    className="fix-text"
                />
                <div className='my-riv-btn'>
                    {isEditing ? (
                        <button onClick={handleUpdateReview}>완료</button>
                    ) : (
                        <button onClick={toggleEditMode}>수정</button>
                    )}
                    <button onClick={() => onRemove(review.id)}>삭제</button>
                </div>
            </div>
        </div>
    );
};

export default ReviewComponent;
