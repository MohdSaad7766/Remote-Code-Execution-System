package com.CodeLab.RCE_System.entity;

import com.CodeLab.RCE_System.response_dto.ContestSubmissionResponseDTO;
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

    public static ContestSubmissionResponseDTO toDTO(ContestSubmission submission){
        ContestSubmissionResponseDTO dto = new ContestSubmissionResponseDTO();
        dto.setUserStartedAt(submission.getUserStartedAt());
        dto.setUserSubmittedAt(submission.getUserSubmittedAt());
        dto.setTotalTimeTaken(submission.getTotalTimeTaken());
        dto.setPercentage(submission.getPercentage());

        return dto;
    }
}
