package com.CodeLab.Code_Execution_Service.DTO;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString

public class TestcaseEvaluationResult {
    private boolean allTestcasesPassed;
    private int totalTestCasesPassed;
    private String lastInput;
    private String lastOutput;
    private String lastExpectedOutput;
}
