package common;

import com.CodeLab.Code_Execution_Service.enums.ExecutionType;
import com.CodeLab.Code_Execution_Service.enums.SubmissionStatus;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString

public class CodeExecutionResponseDTO {


    private UUID submissionId;

    private SubmissionStatus status;

    private String timeComplexity;
    private String spaceComplexity;

    private String output;
    private String error;

    private String lastInput;
    private String lastOutput;
    private String lastExpectedOutput;

    private int totalPassedTestcases;
    private ExecutionType executionType;
}
