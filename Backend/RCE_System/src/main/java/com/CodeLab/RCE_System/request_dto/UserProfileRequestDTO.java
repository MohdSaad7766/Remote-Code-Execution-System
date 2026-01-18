package com.CodeLab.RCE_System.request_dto;

import com.CodeLab.RCE_System.enums.Gender;
import com.CodeLab.RCE_System.enums.Language;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class UserProfileRequestDTO {
    private String name;
    private Gender gender;
    private Language preferredLanguage;
    private LocationRequestDTO location;
}
