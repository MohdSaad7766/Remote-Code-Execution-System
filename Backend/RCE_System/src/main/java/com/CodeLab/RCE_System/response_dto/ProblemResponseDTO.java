package com.CodeLab.RCE_System.response_dto;

import com.CodeLab.RCE_System.enums.Difficulty;
import com.CodeLab.RCE_System.enums.UserProblemStatus;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@ToString
public class ProblemResponseDTO {
    private UUID id;
    private String title;
    private Difficulty difficulty;
    private Set<String> topicList;
    private Set<String> companyList;

    private String description;
    private List<ExampleResponseDTO> exampleList = new ArrayList<>();
    private List<String> constraints = new ArrayList<>();
    private SolutionResponseDTO solution;
    private List<CodeTemplateResponseDTO>  codeTemplateList =new ArrayList<>();
    private List<TestcaseResponseDTO> testCasesList= new ArrayList<>();

    private String note;
    private String followUp;
    private UserProblemStatus status;

}
