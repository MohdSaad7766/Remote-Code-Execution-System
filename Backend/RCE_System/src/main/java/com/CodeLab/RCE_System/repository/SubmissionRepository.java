package com.CodeLab.RCE_System.repository;

import com.CodeLab.RCE_System.entity.Submission;
import com.CodeLab.RCE_System.entity.User;
import com.CodeLab.RCE_System.enums.SubmissionStatus;
import com.CodeLab.RCE_System.enums.UserProblemStatus;
import com.CodeLab.RCE_System.response_dto.SubmissionResponseDTO;
import com.CodeLab.RCE_System.response_dto.UserProblemStatusDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;
import java.util.UUID;

public interface SubmissionRepository extends JpaRepository<Submission, UUID> {
    @Query("""
            SELECT new com.CodeLab.RCE_System.response_dto.UserProblemStatusDTO(
                p.id,
                CASE
                    WHEN EXISTS (
                        SELECT 1 FROM Submission s
                        WHERE s.problem.id = p.id
                          AND s.user.id = :userId
                          AND s.status = com.CodeLab.RCE_System.enums.SubmissionStatus.ACCEPTED
                    ) THEN com.CodeLab.RCE_System.enums.UserProblemStatus.SOLVED
        
                    WHEN EXISTS (
                        SELECT 1 FROM Submission s
                        WHERE s.problem.id = p.id
                          AND s.user.id = :userId
                    ) THEN com.CodeLab.RCE_System.enums.UserProblemStatus.ATTEMPTED
        
                    ELSE com.CodeLab.RCE_System.enums.UserProblemStatus.UNATTEMPTED
                END
            )
            FROM Problem p
            WHERE p.id IN (:problemIds)
        """)
    List<UserProblemStatusDTO> findStatus(
            @Param("userId") UUID userId,
            @Param("problemIds") Set<UUID> problemIds
    );


    @Query("""
            SELECT new com.CodeLab.RCE_System.response_dto.SubmissionResponseDTO(
                s.id,
                s.status,
                s.language,
                s.timeComplexity,
                s.spaceComplexity,
                s.submittedAt,
                s.totalTestcases,
                s.totalPassedTestcases
                )
                FROM Submission s
                WHERE s.problem.id = :problemId AND s.user.id = :userId
            """)
    List<SubmissionResponseDTO> getAllSubmissionsByProblemIdAndUserId(@Param("problemId") UUID problemId,
                                                                      @Param("userId") UUID userId);

    @Query("""
        SELECT
            CASE
                WHEN EXISTS (
                    SELECT 1 FROM Submission s
                    WHERE s.problem.id = :problemId
                      AND s.user.id = :userId
                      AND s.status = com.CodeLab.RCE_System.enums.SubmissionStatus.ACCEPTED
                ) THEN com.CodeLab.RCE_System.enums.UserProblemStatus.SOLVED
    
                WHEN EXISTS (
                    SELECT 1 FROM Submission s
                    WHERE s.problem.id = :problemId
                      AND s.user.id = :userId
                ) THEN com.CodeLab.RCE_System.enums.UserProblemStatus.ATTEMPTED
    
                ELSE com.CodeLab.RCE_System.enums.UserProblemStatus.UNATTEMPTED
            END
        """)
    UserProblemStatus getProblemStatus(
            @Param("problemId") UUID problemId,
            @Param("userId") UUID userId
    );


    @Query("""
SELECT COUNT(DISTINCT s.problem)
FROM Submission s
WHERE s.user = :user
AND s.status = :status
""")
    long countProblemsByStatus(User user, SubmissionStatus status);


}