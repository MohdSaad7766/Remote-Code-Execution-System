package com.CodeLab.RCE_System.request_dto;

import com.CodeLab.RCE_System.util.ValidPassword;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor


public class AppUserRegistrationRequestDTO {

    @NotBlank(message = "Email cannot be empty")
    @Email(message = "Please enter a valid email address")
    private String email;

    @ValidPassword
    private String password;
}