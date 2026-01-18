package com.CodeLab.RCE_System.response_dto;

import com.CodeLab.RCE_System.enums.ApproachType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class ApproachResponseDTO {
    private ApproachType approachType;

    private String approachDescription;
}
