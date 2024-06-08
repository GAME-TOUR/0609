package com.project.gametour.service;

import com.project.gametour.entity.Game;
import com.project.gametour.entity.Review;
import com.project.gametour.entity.User;
import com.project.gametour.repository.GameRepository;
import com.project.gametour.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;

@RequiredArgsConstructor
@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final GameRepository gameRepository;
    public Review create(Review review, Game game, User user) {
        review.setGame(game);
        review.setUser(user);
        review.setCreateDate(LocalDateTime.now());
        review.setLiker(new HashSet<>());

//        game.getReviewList().add(review);
        double starPoint = game.averageStarPoint();
        game.setStarPoint(starPoint);
        gameRepository.save(game);

        return reviewRepository.save(review);
    }

    public List<Review> getReviewList(Long id) {
        return this.reviewRepository.findByGameId(id);
    }

    public Review getReview(Long id) {
        return this.reviewRepository.findById(id).orElse(null);
    }

    public Review modify(Review curReview, String content) {
        curReview.setContent(content);
        return this.reviewRepository.save(curReview);
    }

    public Review modify(Review review, String content, Double starPoint) {
        // Set the new content and star point to the review
        review.setContent(content);
        review.setStarPoint(starPoint);
        
        // Save the modified review in the database
        return reviewRepository.save(review);
    }

    public void delete(Review curReview) {
        this.reviewRepository.delete(curReview);
    }

}
