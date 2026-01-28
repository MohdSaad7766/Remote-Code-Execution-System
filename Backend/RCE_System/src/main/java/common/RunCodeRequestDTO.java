package common;

import com.CodeLab.RCE_System.enums.Language;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class RunCodeRequestDTO {
    private Language language;
    private String mainCode;
    private String userCode;
    private String input;
}
