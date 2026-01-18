package com.CodeLab.RCE_System.entity;

import com.CodeLab.RCE_System.enums.Language;
import com.CodeLab.RCE_System.request_dto.CodeTemplateRequestDTO;
import com.CodeLab.RCE_System.response_dto.CodeTemplateResponseDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

@Entity
public class CodeTemplate {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(columnDefinition = "TEXT")
    private String visibleCode;

    @Column(columnDefinition = "TEXT")
    private String invisibleCode;

    @Enumerated(EnumType.STRING)
    private Language language;

    public static CodeTemplate fromDTO(CodeTemplateRequestDTO dto){
        CodeTemplate codeTemplate = new CodeTemplate();
        codeTemplate.setVisibleCode(dto.getVisibleCode());
        codeTemplate.setInvisibleCode(dto.getInvisibleCode());
        codeTemplate.setLanguage(dto.getLanguage());

        return codeTemplate;
    }

    public static List<CodeTemplate> fromDTOs(List<CodeTemplateRequestDTO> dtos){
        List<CodeTemplate> codeTemplates = new ArrayList<>();

        for(CodeTemplateRequestDTO dto : dtos){
            codeTemplates.add(fromDTO(dto));
        }
        return codeTemplates;
    }

    public static CodeTemplateResponseDTO toDTO(CodeTemplate codeTemplate){
        CodeTemplateResponseDTO dto = new CodeTemplateResponseDTO();
        dto.setInvisibleTemplateCode(codeTemplate.invisibleCode);
        dto.setVisibleTemplateCode(codeTemplate.getVisibleCode());
        dto.setLanguage(codeTemplate.language);
        return dto;
    }

    public static List<CodeTemplateResponseDTO> toDTOs(List<CodeTemplate> codeTemplates){
        List<CodeTemplateResponseDTO> dtos = new ArrayList<>();

        for(CodeTemplate codeTemplate : codeTemplates){
            dtos.add(toDTO(codeTemplate));
        }

        return dtos;
    }
}
