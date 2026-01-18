package com.CodeLab.RCE_System.exception;

public class InvalidAppUserIdException extends RuntimeException {
    public InvalidAppUserIdException(String message){
        super(message);
    }
}
