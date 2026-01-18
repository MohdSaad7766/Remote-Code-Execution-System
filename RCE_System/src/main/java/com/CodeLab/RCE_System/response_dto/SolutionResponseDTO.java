package com.CodeLab.RCE_System.response_dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class SolutionResponseDTO {
    private List<ApproachResponseDTO> approachList  = new ArrayList<>();
}
