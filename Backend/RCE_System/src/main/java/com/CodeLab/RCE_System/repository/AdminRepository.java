package com.CodeLab.RCE_System.repository;

import com.CodeLab.RCE_System.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AdminRepository extends JpaRepository<Admin, UUID> {
}