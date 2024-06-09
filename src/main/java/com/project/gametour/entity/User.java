package com.project.gametour.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Table(name = "\"User\"")
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String username;
    private String password;
    private String name;
    private String role;
    private LocalDateTime createDate;

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<Review> reviewList;

    private String providerId;
    private String provider;

    public void modifyName(User user) {
        if(user.getName() != null) {
            this.name = user.getName();
        }
    }
}
