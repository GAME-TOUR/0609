package com.project.gametour.dto;

import com.project.gametour.entity.User;
import com.project.gametour.role.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Builder
@AllArgsConstructor
@Getter
@Setter
public class UserRequestDto {
    private String username;
    private String name;
    private String password1;
    private String password2;

    public static User toEntity(UserRequestDto userRequestDto) {
        return User.builder()
                .username(userRequestDto.getUsername())
                .password(userRequestDto.getPassword1())
                .name(userRequestDto.getName())
                .role(UserRole.USER.getValue())
                .createDate(LocalDateTime.now())
                .build();
    }
}
