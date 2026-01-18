package com.CodeLab.RCE_System.request_dto;

import com.CodeLab.RCE_System.enums.Language;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor


public class CodeTemplateRequestDTO {
    private String visibleCode;

    private String invisibleCode;

    private Language language;
}
