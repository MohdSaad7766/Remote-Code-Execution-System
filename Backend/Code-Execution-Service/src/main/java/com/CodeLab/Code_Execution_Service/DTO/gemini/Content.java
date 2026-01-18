package com.CodeLab.Code_Execution_Service.DTO.gemini;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString

public class Content {

    private List<Part> parts;
}
