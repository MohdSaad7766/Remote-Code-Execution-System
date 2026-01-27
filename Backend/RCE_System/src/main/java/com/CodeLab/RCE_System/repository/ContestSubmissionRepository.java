package com.CodeLab.RCE_System.repository;

import com.CodeLab.RCE_System.entity.Contest;
import com.CodeLab.RCE_System.entity.ContestSubmission;
import com.CodeLab.RCE_System.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ContestSubmissionRepository extends JpaRepository<ContestSubmission, UUID> {
    boolean existsByUserAndContest(User user, Contest contest);
    ContestSubmission findByUserAndContest(User user, Contest contest);
}