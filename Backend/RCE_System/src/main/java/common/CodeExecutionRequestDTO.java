package common;

import com.CodeLab.RCE_System.enums.ExecutionType;
import com.CodeLab.RCE_System.enums.Language;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString

public class CodeExecutionRequestDTO {
    private UUID userId;
    private UUID submissionId;
    private UUID problemId;
    private Language language;
    private String mainCode;
    private String userCode;
    private String input;
    private String expectedOutput;
    private int totalTestcases;
    private ExecutionType executionType;
}
