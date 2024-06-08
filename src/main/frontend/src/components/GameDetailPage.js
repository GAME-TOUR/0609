import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';
import { AuthContext } from '../contexts/AuthContext';
import NavBar from './NavBar';
import StarRatings from 'react-star-ratings';
import './css/GameDetailPage.css';
import './css/ReviewForm.css';
import likeicon from './test_image/like.svg';
import commenticon from './test_image/comment.svg';
import RatingBarChart from './RatingBarChart';

function ReviewForm({ gameId, isLoggedIn, fetchReviews, closeForm, rating }) {
    const [content, setContent] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!isLoggedIn) {
            alert('Please log in to submit a review.');
            return;
        }
        try {
            await axios.post(`http://localhost:8080/reviews/create/${gameId}`, {
                content,
                starPoint: rating
            }, {
                withCredentials: true
            });
            alert('Review added successfully!');
            setContent('');
            fetchReviews(); // Fetch reviews again to update the list
            closeForm(); // Close the form after submission
            window.location.reload();
            
        } catch (error) {
            console.error('Failed to add review:', error);
            alert('Failed to add review');
        }
    };

    return (
        <div className="review-form-overlay">
            <div className="review-form-popup">
                <button className="close-btn" onClick={closeForm}>×</button>
                <form onSubmit={handleSubmit} className="review-form">
                    <textarea
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        placeholder="Write your review here"
                        required
                        className="review-textarea"
                        disabled={!isLoggedIn}
                    />
                    <button type="submit" className="submit-btn" disabled={!isLoggedIn}>Submit Review</button>
                    {!isLoggedIn && (
                        <p className="login-message">로그인, 혹은 회원가입 후 감상을 남겨주세요.</p>
                    )}
                </form>
            </div>
        </div>
    );
}

function GameDetailPage() {
    const { gameId } = useParams();
    const { isLoggedIn, getUserId } = useContext(AuthContext);
    const navigate = useNavigate();
    const [game, setGame] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [editingReviewId, setEditingReviewId] = useState(null);
    const [editedContent, setEditedContent] = useState('');
    const [editedRating, setEditedRating] = useState(0);
    const [isReviewFormVisible, setReviewFormVisible] = useState(false);
    const [rating, setRating] = useState(0);
    const [existingReview, setExistingReview] = useState(null);
    
    const userid = getUserId();
    console.log(userid);
    
    const handleSetValue = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            e.preventDefault();
            navigate(`/search?q=${searchQuery}`);
        }
    };

    const fetchReviews = async () => {
        try {
            const reviewResponse = await axios.get(`http://localhost:8080/reviews/list/${gameId}`);
            setReviews(reviewResponse.data);
        } catch (err) {
            console.error('Failed to fetch reviews:', err);
            setError('Failed to fetch reviews.');
        }
    };

    const fetchReviewsAndUpdate = async () => {
        try {
            const reviewResponse = await axios.get(`http://localhost:8080/reviews/list/${gameId}`);
            setReviews(reviewResponse.data); // Update reviews state with new data
        } catch (err) {
            console.error('Failed to fetch reviews:', err);
            setError('Failed to fetch reviews.');
        }
    };    

    const onRemove = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/reviews/delete/${id}`, {
                withCredentials: true
            });
            alert('Review deleted successfully!');
            setReviews(reviews.filter(review => review.id !== id));
            fetchReviews(); 
            window.location.reload();
            
        } catch (error) {
            console.error('Failed to delete review:', error);
            alert('Failed to delete review');
        }
    };

    const onModify = (review) => {
        setEditingReviewId(review.id);
        setEditedContent(review.content);
        setEditedRating(review.starPoint);
    };

    const handleEditSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`http://localhost:8080/reviews/update/${editingReviewId}`, {
                content: editedContent,
                starPoint: editedRating
            }, {
                withCredentials: true
            });
            alert('Review updated successfully!');
            setEditingReviewId(null);
            fetchReviews(); // Fetch reviews again to update the list
        } catch (error) {
            console.error('Failed to update review:', error);
            alert('Failed to update review');
        }
    };

    const handleUpdateReview = async () => {
        try {
          await axios.put(`http://localhost:8080/reviews/update/${existingReview.id}`, {
            content: existingReview.content,
            starPoint: existingReview.starPoint,
          }, {
            withCredentials: true,
          });
          alert('Review updated successfully!');
          fetchReviews(); // Fetch reviews again to update the list
        } catch (error) {
          console.error('Failed to update review:', error);
          alert('Failed to update review');
        }
      };

    useEffect(() => {
        const fetchGameDetails = async () => {
          try {
            const response = await axios.get(`http://localhost:8080/games/${gameId}`);
            setGame(response.data);
            const reviewResponse = await axios.get(`http://localhost:8080/reviews/list/${gameId}`);
            setReviews(reviewResponse.data);

            const currentUser = userid;
            const existingReview = reviewResponse.data.find(
              (review) => review.user.id === currentUser
            );
            setExistingReview(existingReview);
      
            setLoading(false);
          } catch (err) {
            setError('Failed to fetch data.');
            setLoading(false);
            console.error(err);
          }
        };
      
        fetchGameDetails();
      }, [gameId, userid]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!game) {
        return <div>Game not found</div>;
    }

    return (
        <div className="App">
            <NavBar
                textValue={searchQuery}
                handleSetValue={handleSetValue}
                handleKeyDown={handleKeyDown}
            />
            <div className="game-detail">
                <div className="game-data">
                    <div className="first-row">
                        <div className="game-banner">
                            <img src={game.thumb} alt={`Cover of ${game.title}`} />
                        </div>
                    </div>
                    <div className="second-row">
                        <div className="game-info">
                            <h1>{game.title}</h1>
                            {game.publisher === "Null"
                                ? <h4>출시일: {new Date(game.releaseDate).toLocaleDateString()} | {game.studio}</h4> 
                                : <h4>출시일: {new Date(game.releaseDate).toLocaleDateString()} | {game.publisher} | {game.studio}</h4>
                            }
                            <p>{game.description}</p>
                        </div>
                    </div>
                </div>
                <div className='review-area'>
                  <RatingBarChart reviews={reviews} />
                  {existingReview ? (
                    <div className="existing-review">
                        <StarRatings
                            rating={existingReview.starPoint}
                            starDimension="25px"
                            starSpacing="2px"
                            starRatedColor="gold"
                            starEmptyColor="gray"
                            readonly
                        />
                        <div className='review-ar'>
                            <textarea 
                                readOnly
                                value={existingReview.content}
                                onChange={(e) => {
                                  setExistingReview((prevReview) => ({
                                    ...prevReview,
                                    content: e.target.value,
                                  }));
                                }}
                                disabled={false} // or a separate state to enable/disable the textarea
                                className="fix-text"
                            />                      
                            <div className='my-riv-btn'>
                                <button onClick={handleUpdateReview}>수정</button>
                                <button onClick={() => onRemove(existingReview.id)}>삭제</button>
                            </div>
                        </div>
                    </div>
                  ) : (
                    <div className="review-controls">
                      <StarRatings
                        rating={rating}
                        starRatedColor="gold"
                        starHoverColor="orange"
                        changeRating={setRating}
                        numberOfStars={5}
                        name="rating"
                      />
                      <button
                        className="write-review-btn"
                        onClick={() => setReviewFormVisible(true)}
                      >
                        평가하기
                      </button>
                    </div>
                  )}
                  {isReviewFormVisible && (
                    <ReviewForm
                      gameId={gameId}
                      isLoggedIn={isLoggedIn}
                      fetchReviews={fetchReviews}
                      closeForm={() => setReviewFormVisible(false)}
                      rating={rating}
                    />
                  )}
                </div>
                
                <div className="reviews">
                    <h1>코멘트</h1>
                    {reviews.length === 0 ? (
                        <p>아직 올라온 후기가 없습니다.<br></br><br></br>
                            후기를 등록해주세요.
                        </p>
                    ) : (
                        reviews.map(review => (
                            <div key={review.id} className="review-item">
                                {editingReviewId === review.id ? (
                                    <form onSubmit={handleEditSubmit} className="review-form">
                                        <StarRatings
                                            rating={editedRating}
                                            starRatedColor="gold"
                                            starHoverColor="orange"
                                            changeRating={setEditedRating}
                                            numberOfStars={5}
                                            name='rating'
                                        />
                                        <textarea
                                            value={editedContent}
                                            onChange={e => setEditedContent(e.target.value)}
                                            required
                                            className="review-textarea"
                                        />
                                        <button type="submit" className="submit-btn">수정하기</button>
                                        <button type="button" className="submit-btn" onClick={() => setEditingReviewId(null)}>취소</button>
                                    </form>
                                ) : (
                                    <>
                                        <div className="review-info">
                                            <div className='left'>
                                                <div className='review-userid'>{review.user.name}</div>님의 리뷰 &nbsp;
                                                <StarRatings
                                                    rating={review.starPoint}
                                                    starDimension="15px"
                                                    starSpacing="0px"
                                                    starRatedColor="gold"
                                                />
                                            </div>
                                            <div className='right'>
                                                <div className='review-modify' onClick={() => onModify(review)}>수정</div>
                                                <div className='review-modify' onClick={() => onRemove(review.id)}>삭제</div> &nbsp;&nbsp;
                                                {new Date(review.createDate).toLocaleDateString("en-US")} 
                                            </div>
                                        </div> 
                                        <p>{review.content}</p>
                                        <div className='review-util'> 
                                            <div className='like-num'>
                                                <img src={likeicon} alt="like icon" /> 
                                                {review.likeCount}
                                            </div>
                                            <div className='comment-num'>
                                                <img src={commenticon} alt="comment icon" />
                                                {review.commentCount}
                                            </div>
                                        </div>
                                        <div className='review-util'> 
                                            <div className='like'>좋아요</div>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default GameDetailPage;
