package com.CodeLab.RCE_System.response_dto;

import com.CodeLab.RCE_System.enums.Language;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class CodeTemplateResponseDTO {
    private String visibleTemplateCode;

    private String invisibleTemplateCode;

    private Language language;
}
