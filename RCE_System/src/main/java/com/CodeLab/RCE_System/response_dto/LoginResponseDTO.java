package com.CodeLab.RCE_System.response_dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class LoginResponseDTO {
    private boolean authenticated;
    private String token;
    private UserProfileResponseDTO profile;
}
