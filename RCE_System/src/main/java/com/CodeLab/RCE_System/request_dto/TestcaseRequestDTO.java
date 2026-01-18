package com.CodeLab.RCE_System.request_dto;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString

public class TestcaseRequestDTO {

    private String input;
    private String expectedOutput;
    private boolean visible;
}
