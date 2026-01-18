package com.CodeLab.RCE_System.request_dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class ExampleRequestDTO {
    private String input;

    private String output;

    private String explanation;

    private String imagePath;
}
