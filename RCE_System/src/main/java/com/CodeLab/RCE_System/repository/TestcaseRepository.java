package com.CodeLab.RCE_System.repository;

import com.CodeLab.RCE_System.entity.Testcase;
import org.aspectj.weaver.ast.Test;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface TestcaseRepository extends JpaRepository<Testcase, UUID> {
//    @Query(value = "SELECT * FROM testcase WHERE problem_id = :problemId AND is_visible = :visibility",nativeQuery = true)
//    public List<Testcase> findAllTestcasesByProblemId(UUID problemId, boolean visibility);
}