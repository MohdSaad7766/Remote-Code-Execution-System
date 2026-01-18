package com.CodeLab.RCE_System.repository;

import com.CodeLab.RCE_System.entity.Otp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

public interface OtpRepository extends JpaRepository<Otp, UUID> {
  @Modifying
  void deleteByAppUserId(UUID appUserid);

  @Modifying
  @Query("Delete FROM Otp otp Where otp.expiryTime < :now")
  void deleteByExpiryTimeBefore(@Param("now") LocalDateTime now);

  Optional<Otp> findByAppUserId(UUID appUserId);

}