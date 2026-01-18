package com.CodeLab.RCE_System.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(
        name = "otp",
        indexes = {
                @Index(name = "otp_user_id", columnList = "appUserId")
        }
)
public class Otp {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String otpString;
    private UUID appUserId;
    private LocalDateTime expiryTime;

}
