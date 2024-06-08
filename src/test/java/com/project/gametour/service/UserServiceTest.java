package com.project.gametour.service;

import com.project.gametour.dto.UserRequestDto;
import com.project.gametour.dto.UserResponseDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class UserServiceTest {
    @Autowired
    UserService userService;

    @Transactional
    @Test
    void show_성공_존재하는_id_입력() {
        // 1. 예상 데이터
        Long id = 1L;
        UserResponseDto expected = UserResponseDto.builder()
                .id(id)
                .username("홍길동")
                .name("홍길동")
                .reviewList(new ArrayList<>())
                .build();
        // 2. 실제 데이터
        UserResponseDto userResponseDto = userService.show(id);
        // 3. 비교 및 검증
        assertEquals(expected.toString(), userResponseDto.toString());
    }

    @Test
    void show_실패_존재하지_않는_id_입력() {
        // 1. 예상 데이터
        Long id = -1L;
        UserResponseDto expected = null;
        // 2. 실제 데이터
        UserResponseDto userResponseDto = userService.show(id);
        // 3. 비교 및 검증
        assertEquals(expected, userResponseDto);
    }

    @Transactional
    @Test
    void create_성공_존재하지_않는_username_입력() {
        // 1. 예상 데이터
        String username = "아무개";
        String password = "1234";
        UserRequestDto dto = UserRequestDto.builder()
                .username(username)
                .password(password)
                .build();
        UserResponseDto expected = UserResponseDto.builder()
                .username(username)
                .name(username)
                .reviewList(new ArrayList<>())
                .build();
        // 2. 실제 데이터
        UserResponseDto userResponseDto = userService.create(dto);
        // 3. 비교 및 검증
        assertEquals(expected.getUsername(), userResponseDto.getUsername());
    }

    @Transactional
    @Test
    void create_실패_존재_하는_username_입력() {
        // 1. 예상 데이터
        String username = "홍길동";
        String password = "1234";
        UserRequestDto dto = UserRequestDto.builder()
                .username(username)
                .password(password)
                .build();
        UserResponseDto expected = null;
        // 2. 실제 데이터
        UserResponseDto userResponseDto = userService.create(dto);
        // 3. 비교 및 검증
        assertEquals(expected, userResponseDto);
    }

    @Transactional
    @Test
    void update_성공_존재하는_id와_name만_있는_dto_입력() {
        // 1. 예상 데이터
        Long id = 1L;
        String username = "홍길동";
        String name = "한길동";
        UserRequestDto dto = UserRequestDto.builder()
                .name(name)
                .build();
        UserResponseDto expected = UserResponseDto.builder()
                .id(1L)
                .username(username)
                .name(name)
                .reviewList(new ArrayList<>())
                .build();
        // 2. 실제 데이터
        UserResponseDto userResponseDto = userService.update(id, dto);
        // 3. 비교 및 검증
        assertEquals(expected.toString(), userResponseDto.toString());
    }

    @Transactional
    @Test
    void update_실패_존재하지_않는_id의_dto_입력() {
        // 1. 예상 데이터
        Long id = -1L;
        String name = "한길동";
        UserRequestDto dto = UserRequestDto.builder()
                .name(name)
                .build();
        UserResponseDto expected = null;
        // 2. 실제 데이터
        UserResponseDto userResponseDto = userService.update(id, dto);
        // 3. 비교 및 검증
        assertEquals(expected, userResponseDto);
    }

    @Transactional
    @Test
    void delete_성공_존재하는_id_입력() {
        // 1. 예상 데이터
        Long id = 1L;
        UserResponseDto expected = UserResponseDto.builder()
                .id(id)
                .username("홍길동")
                .name("홍길동")
                .reviewList(new ArrayList<>())
                .build();
        // 2. 실제 데이터
        UserResponseDto userResponseDto = userService.delete(id);
        // 3. 비교 및 검증
        assertEquals(expected.toString(), userResponseDto.toString());
    }

    @Transactional
    @Test
    void delete_실패_존재하지_않는_id_입력() {
        // 1. 예상 데이터
        Long id = -1L;
        UserResponseDto expected = null;
        // 2. 실제 데이터
        UserResponseDto userResponseDto = userService.delete(id);
        // 3. 비교 및 검증
        assertEquals(expected, userResponseDto);
    }
}