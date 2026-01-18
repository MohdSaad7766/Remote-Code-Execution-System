package com.CodeLab.RCE_System.response_dto;

import com.CodeLab.RCE_System.enums.UserProblemStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class UserProblemStatusDTO {
    private UUID id;
    private UserProblemStatus status;
}
