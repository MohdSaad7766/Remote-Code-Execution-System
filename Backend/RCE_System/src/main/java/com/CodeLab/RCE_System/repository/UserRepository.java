package com.CodeLab.RCE_System.repository;

import com.CodeLab.RCE_System.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
}