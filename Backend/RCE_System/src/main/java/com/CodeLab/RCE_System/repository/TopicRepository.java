package com.CodeLab.RCE_System.repository;

import com.CodeLab.RCE_System.entity.Topic;
import com.CodeLab.RCE_System.response_dto.TopicResponseDTO;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;
import java.util.UUID;

public interface TopicRepository extends JpaRepository<Topic, UUID> {
    boolean existsByTopicName(String name);

    @Query("""
            SELECT new com.CodeLab.RCE_System.response_dto.TopicResponseDTO(
                t.id,
                t.topicName,
                COUNT(p)
            )
            FROM Topic t
            LEFT JOIN t.problemList p
            GROUP BY t.id, t.topicName
        """)
    List<TopicResponseDTO> findAllTopics(Sort sort);

    @Query("""
            SELECT t FROM Topic t WHERE t.id IN (:topicList)
            """)
    Set<Topic> findAllTopicsIn(@Param("topicList") Set<UUID> topicList);

}