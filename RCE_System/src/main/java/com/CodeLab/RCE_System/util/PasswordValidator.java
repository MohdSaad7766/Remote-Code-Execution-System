package com.CodeLab.RCE_System.util;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PasswordValidator implements ConstraintValidator<ValidPassword, String> {

    @Override
    public boolean isValid(String password, ConstraintValidatorContext constraintValidatorContext) {
        if(password == null)
            return false;

        /*
        * Password Rules *
        *   Uppercase  at least 1
        *   Lowercase at least 1
        *   Digit at least 1
        *   Special Character at least 1
        *   Minimum Length - 8
        */

        boolean hasUppercase = password.matches(".*[A-Z].*");
        boolean hasLowercase = password.matches(".*[a-z].*");
        boolean hasDigit     = password.matches(".*[0-9].*");
        boolean hasSpecialChar = password.matches(".*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>/?].*");
        boolean hasMinLength = password.length() >= 8;

        return hasUppercase && hasLowercase && hasDigit && hasSpecialChar && hasMinLength;
    }
}
