package com.CodeLab.RCE_System.response_dto;

import com.CodeLab.RCE_System.enums.Gender;
import com.CodeLab.RCE_System.enums.Language;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class UserProfileResponseDTO {
    private String name;
    private String email;
    private String city;
    private String state;
    private String country;
    private Gender gender;
    private Language preferredLanguage;
}
