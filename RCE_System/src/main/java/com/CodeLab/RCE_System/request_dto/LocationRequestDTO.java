package com.CodeLab.RCE_System.request_dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class LocationRequestDTO {
    private String city;

    private String state;

    private String country;
}
