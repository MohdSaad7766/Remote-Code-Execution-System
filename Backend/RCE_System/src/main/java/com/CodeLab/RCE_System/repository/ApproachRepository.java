package com.CodeLab.RCE_System.repository;

import com.CodeLab.RCE_System.entity.Approach;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ApproachRepository extends JpaRepository<Approach, UUID> {
}