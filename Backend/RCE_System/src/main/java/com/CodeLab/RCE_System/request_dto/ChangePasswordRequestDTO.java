package com.CodeLab.RCE_System.request_dto;

import com.CodeLab.RCE_System.util.ValidPassword;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class ChangePasswordRequestDTO {

    private String oldPassword;

    @ValidPassword
    private String newPassword;
}
