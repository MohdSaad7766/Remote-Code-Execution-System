package com.CodeLab.Code_Execution_Service.DTO.gemini;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@ToString

public class GeminiRequestBody {
    private List<Content> contents;

    public static GeminiRequestBody getGeminiRequestDTO(String prompt){

        Part part = new Part();
        part.setText(prompt);

        Content content = new Content();
        content.setParts(new ArrayList<>());
        content.getParts().add(part);

        GeminiRequestBody geminiRequestBody = new GeminiRequestBody();
        geminiRequestBody.setContents(new ArrayList<>());
        geminiRequestBody.getContents().add(content);

        return geminiRequestBody;
    }
}
