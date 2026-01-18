package com.CodeLab.Code_Execution_Service.DTO;

import com.CodeLab.Code_Execution_Service.enums.SubmissionStatus;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString

public class CodeExecutionResult {
    private SubmissionStatus status;
    private String output;
    private String error;
    private String lastInput;
    private String lastOutput;
    private String lastExpectedOutput;

    private int totalPassedTestcases;
}
