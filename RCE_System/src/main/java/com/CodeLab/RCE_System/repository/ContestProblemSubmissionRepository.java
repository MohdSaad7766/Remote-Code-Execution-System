package com.CodeLab.RCE_System.repository;

import com.CodeLab.RCE_System.entity.ContestProblemSubmission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ContestProblemSubmissionRepository extends JpaRepository<ContestProblemSubmission, UUID> {
}