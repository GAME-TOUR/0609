package com.project.gametour.repository;

import com.project.gametour.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByGameId(Long id);
    Optional<Review> findById(Long id);
}
