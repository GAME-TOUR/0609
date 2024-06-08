package com.project.gametour.controller;

import com.project.gametour.entity.Game;
import com.project.gametour.service.GameService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class GameController {
    private final GameService gameService;
    @GetMapping("/games") // 게임 목록 정보 가져오기
    public ResponseEntity<Page<Game>> list(@RequestParam(value = "page", defaultValue = "0") int page,
                                           @RequestParam(value = "kw", defaultValue = "") String kw) {
        Page<Game> searched = gameService.list(page, kw);

        return (searched != null) ?
                ResponseEntity.status(HttpStatus.OK).body(searched) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @GetMapping("/games/{id}") // 특정 게임 정보 가져오기
    public ResponseEntity<Game> show(@PathVariable Long id) {
        Game searched = gameService.show(id);

        System.out.println(searched.toString());

        return (searched != null) ?
                ResponseEntity.status(HttpStatus.OK).body(searched) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @GetMapping("/api/hello")
    public String hello() {
        return "수정해도 되남?";
    }

}
