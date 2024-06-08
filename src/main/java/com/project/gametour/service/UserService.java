package com.project.gametour.service;

import com.project.gametour.dto.UserRequestDto;
import com.project.gametour.dto.UserResponseDto;
import com.project.gametour.entity.User;
import com.project.gametour.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserResponseDto create(UserRequestDto userRequestDto) {
        User existed = userRepository.findByUsername(userRequestDto.getUsername()).orElse(null);
        if (existed != null) {
            return null;
        }

        userRequestDto.setPassword1(passwordEncoder.encode(userRequestDto.getPassword1()));
        userRequestDto.setName(userRequestDto.getUsername());// default name = username

        User user = UserRequestDto.toEntity(userRequestDto);

        User created = userRepository.save(user);

        return UserResponseDto.toDto(created);
    }

    public UserResponseDto show(Long id) {
        User searched = userRepository.findById(id).orElse(null);

        return (searched != null) ?
                UserResponseDto.toDto(searched) :
                null;
    }

    public UserResponseDto update(Long id, UserRequestDto userRequestDto) {
        User user = UserRequestDto.toEntity(userRequestDto);

        User target = userRepository.findById(id).orElse(null);

        if (target == null) {
            return null;
        }

        target.modifyName(user);
        User updated = userRepository.save(target);
        return UserResponseDto.toDto(updated);
    }

    public UserResponseDto delete(Long id) {
        User target = userRepository.findById(id).orElse(null);

        if (target == null) {
            return null;
        }

        userRepository.delete(target);
        return UserResponseDto.toDto(target);
    }

    public User getUser(String username) {
        User user = this.userRepository.findByUsername(username).orElse(null);
        if (user != null) {
            return user;
        }
        return user;
    }

    public User findByUsername(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        return user.orElse(null);
    }
}
