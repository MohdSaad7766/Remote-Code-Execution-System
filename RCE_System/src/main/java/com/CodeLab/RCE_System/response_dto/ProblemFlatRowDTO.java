package com.CodeLab.RCE_System.response_dto;

import com.CodeLab.RCE_System.enums.Difficulty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class ProblemFlatRowDTO {
    private UUID id;
    private String title;
    private Difficulty difficulty;
    private String topicName;
    private String companyName;
}
