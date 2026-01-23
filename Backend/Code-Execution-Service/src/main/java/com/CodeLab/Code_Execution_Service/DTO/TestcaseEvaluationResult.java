package com.CodeLab.Code_Execution_Service.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class TestcaseEvaluationResult {
    private boolean allTestcasesPassed;
    private int totalTestCasesPassed;
    private String lastInput;
    private String lastOutput;
    private String lastExpectedOutput;
}
