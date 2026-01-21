package com.CodeLab.Code_Execution_Service.DTO;

import com.CodeLab.Code_Execution_Service.enums.Language;
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
