package common;

import com.CodeLab.Code_Execution_Service.enums.Language;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString

public class RunCodeRequestDTO {
    private Language language;
    private String mainCode;
    private String userCode;
    private String input;
}
