package com.project.gametour.repository;

import com.project.gametour.entity.Game;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface GameRepository extends JpaRepository<Game, Long> {
    Page<Game> findAll(Pageable pageable);

    @Query("select "
    + "distinct g "
    + "from Game g "
    + "left outer join Review r on g=r.game "
    + "left outer join User u on r.user=u "
    + "where "
    + "g.title like %:kw% "
    + "or u.name like %:kw%")
    Page<Game> findAllByKeyword(@Param("kw") String kw, Pageable pageable);
}
