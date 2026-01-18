package com.CodeLab.RCE_System.response_dto;

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

public class LiveContestResponseDTO {
    private UUID id;
    private String title;
    private String description;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private long duration;

    private boolean userRegistered;
    private boolean userRejoin;
    private long remainingTimeInSeconds;
    private boolean contestSubmitted;
}
