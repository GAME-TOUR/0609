import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import StarRatings from 'react-star-ratings';

const UserReviews = () => {
    const { userId } = useParams();
    const [userReviews, setUserReviews] = useState([]);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const fetchUserReviews = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/reviews/user/${userId}`);
                setUserReviews(response.data);
                if (response.data.length > 0) {
                    setUserName(response.data[0].user.name);
                }
            } catch (error) {
                console.error('Failed to fetch user reviews:', error);
            }
        };

        fetchUserReviews();
    }, [userId]);

    return (
        <div className="user-reviews-page">
            <h2>{userName}님의 리뷰</h2>
            {userReviews.length > 0 ? (
                userReviews.map((review) => (
                    <div key={review.id} className="user-review">
                        <StarRatings
                            rating={review.starPoint}
                            starDimension="20px"
                            starSpacing="2px"
                            starRatedColor="gold"
                            starEmptyColor="gray"
                            readonly
                        />
                        <p>{review.content}</p>
                    </div>
                ))
            ) : (
                <p>리뷰가 없습니다.</p>
            )}
        </div>
    );
};

export default UserReviews;
