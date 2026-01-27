package com.CodeLab.RCE_System.response_dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ContestStartedResponseDTO {
    private UUID contestSubmissionId;
    private String message;
}
