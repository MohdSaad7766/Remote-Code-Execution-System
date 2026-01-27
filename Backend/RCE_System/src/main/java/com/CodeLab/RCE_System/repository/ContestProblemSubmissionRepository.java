package com.CodeLab.RCE_System.repository;

import com.CodeLab.RCE_System.entity.Contest;
import com.CodeLab.RCE_System.entity.ContestProblemSubmission;
import com.CodeLab.RCE_System.entity.Problem;
import com.CodeLab.RCE_System.entity.User;
import com.CodeLab.RCE_System.enums.SubmissionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.UUID;

public interface ContestProblemSubmissionRepository extends JpaRepository<ContestProblemSubmission, UUID> {

    @Query("""
    SELECT cps.submissionStatus
    FROM ContestProblemSubmission cps
    WHERE cps.user = :user
      AND cps.contest = :contest
      AND cps.problem = :problem
""")
    Optional<SubmissionStatus> findStatus(
            User user,
            Contest contest,
            Problem problem
    );

}