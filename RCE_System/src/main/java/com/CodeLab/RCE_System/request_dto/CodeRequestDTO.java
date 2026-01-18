package com.CodeLab.RCE_System.request_dto;

import com.CodeLab.RCE_System.enums.ExecutionType;
import com.CodeLab.RCE_System.enums.Language;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString

public class CodeRequestDTO {
    private UUID problemId;
    private Language language;
    private String userCode;
    private String mainCode;
    private ExecutionType executionType;
}
