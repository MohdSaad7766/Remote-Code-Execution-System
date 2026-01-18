package com.CodeLab.RCE_System.request_dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class ContestRequestDTO {
    private String title;
    private String description;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private long duration;
    Set<UUID> oldProblemIds = new HashSet<>();
    List<ProblemRequestDTO> newProblems = new ArrayList<>();
}
