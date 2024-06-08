package com.project.gametour.dto;

import com.project.gametour.entity.Review;
import com.project.gametour.entity.User;
import com.project.gametour.role.UserRole;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@AllArgsConstructor
@ToString
@Getter
@Setter
public class UserResponseDto {
    private Long id;
    private String username;
    private String name;
    private List<Review> reviewList;

    public static UserResponseDto toDto(User user) {
        return UserResponseDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .name(user.getName())
                .build();
    }
}
