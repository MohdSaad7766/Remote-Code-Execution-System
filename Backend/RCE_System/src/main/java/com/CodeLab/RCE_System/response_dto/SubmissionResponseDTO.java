package com.CodeLab.RCE_System.response_dto;

import com.CodeLab.RCE_System.enums.Language;
import com.CodeLab.RCE_System.enums.SubmissionStatus;
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

public class SubmissionResponseDTO {
    private UUID id;
    private SubmissionStatus status;
    private Language language;
    private String timeComplexity;
    private String spaceComplexity;
    private LocalDateTime submittedAt;
    private int totalTestcases;
    private int totalPassedTestcases;
    private String code;
}
