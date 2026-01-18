package com.CodeLab.RCE_System.repository;

import com.CodeLab.RCE_System.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface LocationRepository extends JpaRepository<Location, UUID> {
}