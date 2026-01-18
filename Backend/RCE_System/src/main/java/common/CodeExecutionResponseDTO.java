package common;

import com.CodeLab.RCE_System.enums.SubmissionStatus;
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
}
