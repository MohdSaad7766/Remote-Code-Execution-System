package com.CodeLab.RCE_System.request_dto;

import com.CodeLab.RCE_System.enums.Difficulty;
import lombok.*;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class ProblemRequestDTO {
    private String title;
    private String description;
    private Difficulty difficulty;
    private List<ExampleRequestDTO> exampleList;
    private Set<UUID> topicList;
    private Set<UUID> companyList;
    private List<TestcaseRequestDTO> testcaseList;
    private List<CodeTemplateRequestDTO> codeTemplateList;
    private SolutionRequestDTO solution;
    private List<String> constraints;
    private String note;
    private String followUp;
}
