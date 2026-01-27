package com.CodeLab.RCE_System.response_dto;

import com.CodeLab.RCE_System.entity.Problem;
import com.CodeLab.RCE_System.enums.Difficulty;
import com.CodeLab.RCE_System.enums.UserProblemStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class ProblemListResponseDTO {
    private UUID problemId;
    private String title;
    private Difficulty difficulty;
    private UserProblemStatus problemStatus;
    private Set<String> topics;
    private Set<String> companies;

}
