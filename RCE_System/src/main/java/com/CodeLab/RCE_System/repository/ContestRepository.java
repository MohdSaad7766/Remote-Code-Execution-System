package com.CodeLab.RCE_System.repository;

import com.CodeLab.RCE_System.entity.Contest;
import com.CodeLab.RCE_System.entity.User;
import com.CodeLab.RCE_System.response_dto.LiveContestResponseDTO;
import com.CodeLab.RCE_System.response_dto.PastAndUpcomingContestResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface ContestRepository extends JpaRepository<Contest, UUID> {

    @Query("""
    SELECT new com.CodeLab.RCE_System.response_dto.PastAndUpcomingContestResponseDTO(
        c.id,
        c.title,
        c.description,
        c.startTime,
        c.endTime,
        c.duration,
        CASE
            WHEN :user IS NULL THEN false
            WHEN u.id IS NOT NULL THEN true
            ELSE false
        END
    )
    FROM Contest c
    LEFT JOIN c.userList u ON u = :user
    WHERE c.endTime < CURRENT_TIMESTAMP
""")
    Page<PastAndUpcomingContestResponseDTO> getAllPastContests(
            Pageable pageable,
            @Param("user") User user
    );



    @Query("""
    SELECT new com.CodeLab.RCE_System.response_dto.PastAndUpcomingContestResponseDTO(
        c.id,
        c.title,
        c.description,
        c.startTime,
        c.endTime,
        c.duration,
        CASE
            WHEN :user IS NULL THEN false
            WHEN u.id IS NOT NULL THEN true
            ELSE false
        END
    )
    FROM Contest c
    LEFT JOIN c.userList u ON u = :user
    WHERE c.startTime > CURRENT_TIMESTAMP
""")
    Page<PastAndUpcomingContestResponseDTO> getAllUpcomingContests(
            Pageable pageable,
            @Param("user") User user
    );

    @Query("""
    SELECT new com.CodeLab.RCE_System.response_dto.LiveContestResponseDTO(
        c.id,
        c.title,
        c.description,
        c.startTime,
        c.endTime,
        c.duration,
        CASE
            WHEN :user IS NULL THEN false
            WHEN u.id IS NOT NULL THEN true
            ELSE false
        END,
        false,
        0L,
        false
    )
    FROM Contest c
    LEFT JOIN c.userList u ON u = :user
    WHERE c.startTime <= CURRENT_TIMESTAMP AND CURRENT_TIMESTAMP < c.endTime
""")
    Page<LiveContestResponseDTO> getAllLiveContests(Pageable pageable, @Param("user") User user);

}