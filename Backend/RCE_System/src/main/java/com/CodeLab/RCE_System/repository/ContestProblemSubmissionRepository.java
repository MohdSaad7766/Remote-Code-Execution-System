package com.CodeLab.RCE_System.repository;

import com.CodeLab.RCE_System.entity.Contest;
import com.CodeLab.RCE_System.entity.ContestProblemSubmission;
import com.CodeLab.RCE_System.entity.Problem;
import com.CodeLab.RCE_System.entity.User;
import com.CodeLab.RCE_System.enums.SubmissionStatus;
import com.CodeLab.RCE_System.enums.UserProblemStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ContestProblemSubmissionRepository extends JpaRepository<ContestProblemSubmission, UUID> {

    @Query("""
    SELECT 
        CASE
            WHEN SUM(
                CASE 
                    WHEN cps.status = 'ACCEPTED' THEN 1 
                    ELSE 0 
                END
            ) > 0 THEN com.CodeLab.RCE_System.enums.UserProblemStatus.SOLVED

            WHEN COUNT(cps) > 0 THEN com.CodeLab.RCE_System.enums.UserProblemStatus.ATTEMPTED

            ELSE com.CodeLab.RCE_System.enums.UserProblemStatus.UNATTEMPTED
        END
    FROM ContestProblemSubmission cps
    WHERE cps.user = :user
      AND cps.contest = :contest
      AND cps.problem = :problem
""")
    UserProblemStatus findUserProblemStatus(
            User user,
            Contest contest,
            Problem problem
    );


    Optional<ContestProblemSubmission> findByContestAndUser(Contest contest, User user);

    Optional<ContestProblemSubmission>
    findTopByUserAndContestAndProblemOrderByPercentageDesc(
            User user,
            Contest contest,
            Problem problem
    );

    @Query("""
    SELECT MAX(cps.percentage)
    FROM ContestProblemSubmission cps
    WHERE cps.user = :user
      AND cps.contest = :contest
    GROUP BY cps.problem.id
""")
    List<Double> findMaxPercentagePerProblem(User user, Contest contest);

}