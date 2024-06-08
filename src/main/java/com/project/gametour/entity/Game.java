package com.project.gametour.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.*;


import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@Getter
@ToString
@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String thumb;
    private String description; // 소개글
    private String studio;   // 개발사
    private String publisher; // 배급사
    private String platform;
    private LocalDateTime releaseDate;  // 출시일
    private String tag;
    private double starPoint;

    @OneToMany(mappedBy = "game", cascade = CascadeType.REMOVE)
    private List<Review> reviewList;

    public double averageStarPoint() {
        if (this.reviewList.isEmpty()) return 0;
        int len = this.reviewList.size();
        int sum = 0;
        for (Review review : this.reviewList) {
            sum += review.getStarPoint();
        }
        return (double) sum / len;
    }
}
