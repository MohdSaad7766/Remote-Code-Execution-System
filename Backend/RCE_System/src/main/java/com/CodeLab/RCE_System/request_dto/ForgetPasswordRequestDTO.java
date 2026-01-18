package com.CodeLab.RCE_System.request_dto;

import jakarta.validation.constraints.Email;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ForgetPasswordRequestDTO {
    @Email
    private String email;
}
