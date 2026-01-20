package com.CodeLab.RCE_System.repository;

import com.CodeLab.RCE_System.entity.Problem;
import com.CodeLab.RCE_System.entity.Testcase;
import com.CodeLab.RCE_System.enums.Difficulty;
import com.CodeLab.RCE_System.response_dto.ProblemFlatRowDTO;
import com.CodeLab.RCE_System.response_dto.ProblemResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;
import java.util.UUID;

public interface ProblemRepository extends JpaRepository<Problem, UUID> {

    @Query("Select p.id FROM Problem p")
    Page<UUID> findAllProblemsId(Pageable pageable);

    @Query("""
            Select new com.CodeLab.RCE_System.response_dto.ProblemFlatRowDTO(
                p.id,
                p.title, 
                p.difficulty, 
                t.topicName, 
                c.companyName 
            )
            FROM Problem p 
            LEFT JOIN p.topicList t 
            LEFT JOIN p.companyList c
            WHERE p.id IN (:problemIds)          
           """)
    List<ProblemFlatRowDTO> findAllProblems(@Param("problemIds") Set<UUID> problemIds);

    @Query("""
    SELECT p.id
    FROM Problem p
    LEFT JOIN p.topicList t
    LEFT JOIN p.companyList c
    WHERE (:title IS NULL OR LOWER(p.title) LIKE CONCAT('%', LOWER(CAST(:title AS text)), '%'))
      AND (:difficulty IS NULL OR p.difficulty = :difficulty)
      AND (:topicIds IS NULL OR t.id IN :topicIds)
      AND (:companyIds IS NULL OR c.id IN :companyIds)
    GROUP BY p.id
""")
    Page<UUID> findProblemIdsWithFilters(
            @Param("title") String title,
            @Param("difficulty") Difficulty difficulty,
            @Param("topicIds") Set<UUID> topicIds,
            @Param("companyIds") Set<UUID> companyIds,
            Pageable pageable
    );



    @Query("SELECT t FROM Problem p Join p.testcaseList t WHERE p.id = :problemId AND t.isVisible = :visibility")
    List<Testcase> findAllTestcasesByProblemId(@Param("problemId") UUID problemId ,@Param("visibility") boolean visibility);

    long count();
}