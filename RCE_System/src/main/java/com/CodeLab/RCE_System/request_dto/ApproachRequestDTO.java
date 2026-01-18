package com.CodeLab.RCE_System.request_dto;

import com.CodeLab.RCE_System.enums.ApproachType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class ApproachRequestDTO {
    private ApproachType approachType;

    private String description;
}
