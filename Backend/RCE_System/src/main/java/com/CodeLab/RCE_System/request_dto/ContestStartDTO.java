package com.CodeLab.RCE_System.request_dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class ContestStartDTO {
    private String contestName;
    private String contestStartTime;
    private String contestEndTime;
    private String contestDuration;
}
