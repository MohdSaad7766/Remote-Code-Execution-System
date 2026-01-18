package com.CodeLab.RCE_System.repository;

import com.CodeLab.RCE_System.entity.CodeTemplate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CodeTemplateRepository extends JpaRepository<CodeTemplate, UUID> {
}