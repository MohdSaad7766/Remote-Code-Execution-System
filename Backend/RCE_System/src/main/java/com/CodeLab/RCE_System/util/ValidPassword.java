package com.CodeLab.RCE_System.util;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = PasswordValidator.class)
@Documented
public @interface ValidPassword {
    String message() default "Password is not strong enough";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
