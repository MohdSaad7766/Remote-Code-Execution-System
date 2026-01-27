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
public class ContestSubmission {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "contest_id", updatable = false, nullable = false)
    private Contest contest;

    private LocalDateTime userStartedAt;

    private LocalDateTime userSubmittedAt;

    private Long totalTimeTaken;

    private Double percentage;
}
