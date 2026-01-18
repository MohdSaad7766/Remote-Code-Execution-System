package com.CodeLab.RCE_System.repository;

import com.CodeLab.RCE_System.entity.Example;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ExampleRepository extends JpaRepository<Example, UUID> {
}