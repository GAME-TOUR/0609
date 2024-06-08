package com.project.gametour.service;

import com.project.gametour.dto.UserResponseDto;
import com.project.gametour.entity.Game;
import com.project.gametour.entity.User;
import com.project.gametour.repository.GameRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class GameService {
    private final GameRepository gameRepository;

    public Page<Game> list(int page, String kw) {
        Pageable pageable = PageRequest.of(page, 5);
        Page<Game> gameList = gameRepository.findAllByKeyword(kw, pageable);
        if (gameList == null) {
            return null;
        }

        return gameList;
    }

    public Game show(Long id) {
        return gameRepository.findById(id).orElse(null);
    }


}
