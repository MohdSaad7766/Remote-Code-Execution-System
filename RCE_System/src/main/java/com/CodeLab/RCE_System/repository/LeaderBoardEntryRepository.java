package com.CodeLab.RCE_System.repository;

import com.CodeLab.RCE_System.entity.LeaderBoardEntry;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface LeaderBoardEntryRepository extends JpaRepository<LeaderBoardEntry, UUID> {
}