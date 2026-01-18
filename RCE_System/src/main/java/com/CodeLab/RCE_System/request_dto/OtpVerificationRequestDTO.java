package com.CodeLab.RCE_System.request_dto;

import com.CodeLab.RCE_System.enums.OtpPurpose;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class OtpVerificationRequestDTO {
    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String otpString;
}
