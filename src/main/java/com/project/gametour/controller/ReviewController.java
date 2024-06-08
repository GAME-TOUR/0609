package com.project.gametour.controller;

import com.project.gametour.dto.UserResponseDto;
import com.project.gametour.entity.Game;
import com.project.gametour.entity.Review;
import com.project.gametour.entity.User;
import com.project.gametour.service.GameService;
import com.project.gametour.service.ReviewService;
import com.project.gametour.service.UserService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.List;

@RequiredArgsConstructor
@RestController
public class ReviewController {
    private final ReviewService reviewService;
    private final GameService gameService;
    private final UserService userService;

    @PostMapping("/reviews/create/{id}") // 리뷰 생성
    public ResponseEntity<Review> create(@RequestBody Review review, @PathVariable Long id, Principal principal) {
        Game game = gameService.show(id);
        User user = userService.getUser(principal.getName());

        Review created = reviewService.create(review, game, user);

        return (created != null) ?
                ResponseEntity.status(HttpStatus.OK).body(created) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @GetMapping("/reviews/list/{id}") // 특정 게임에 대한 리뷰 정보 가져오기
    public ResponseEntity<List<Review>> list(@PathVariable Long id) {
        List<Review> reviewList = reviewService.getReviewList(id);

        return (reviewList != null) ?
                ResponseEntity.status(HttpStatus.OK).body(reviewList) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @PatchMapping("/reviews/modify") // 특정 리뷰 수정하기
    public ResponseEntity<Review> answerModify(Review review, Principal principal) {
        Review curReview = this.reviewService.getReview(review.getId());
        if (!curReview.getUser().getUsername().equals(principal.getName())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "수정 권한이 없습니다.");
        }
        Review modified = this.reviewService.modify(curReview, review.getContent());
        return (modified != null) ?
                ResponseEntity.status(HttpStatus.OK).body(modified) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @DeleteMapping("/reviews/delete/{id}") // 특정 리뷰 삭제하기
    public ResponseEntity<UserResponseDto> delete(@PathVariable Long id, Principal principal) {
        Review curReview = this.reviewService.getReview(id);
        if (!curReview.getUser().getUsername().equals(principal.getName())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "삭제 권한이 없습니다.");
        }
        this.reviewService.delete(curReview);

        return (curReview != null) ?
                ResponseEntity.status(HttpStatus.NO_CONTENT).build() :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @PatchMapping("/reviews/update/{id}") // Modify specific review
    public ResponseEntity<Review> updateReview(@RequestBody Review updatedReview, @PathVariable Long id, Principal principal) {
        Review existingReview = reviewService.getReview(id);
        if (existingReview == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "리뷰를 찾을 수 없습니다.");
        }
        if (!existingReview.getUser().getUsername().equals(principal.getName())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "수정 권한이 없습니다.");
        }

        Review modifiedReview = reviewService.modify(existingReview, updatedReview.getContent(), updatedReview.getStarPoint());
        return ResponseEntity.ok(modifiedReview);
    }
}

