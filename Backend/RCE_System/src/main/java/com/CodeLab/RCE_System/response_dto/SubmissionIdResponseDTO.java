package com.CodeLab.RCE_System.response_dto;

import lombok.*;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString

public class SubmissionIdResponseDTO {
    private UUID submissionId;
}
