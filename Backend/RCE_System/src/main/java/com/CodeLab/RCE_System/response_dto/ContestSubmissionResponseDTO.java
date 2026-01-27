package com.CodeLab.RCE_System.response_dto;

import com.CodeLab.RCE_System.entity.Contest;
import com.CodeLab.RCE_System.entity.ContestSubmission;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class ContestSubmissionResponseDTO {
    private LocalDateTime userStartedAt;

    private LocalDateTime userSubmittedAt;

    private Long totalTimeTaken;

    private Double percentage;


}
