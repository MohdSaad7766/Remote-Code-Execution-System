package com.CodeLab.RCE_System.controller;

import com.CodeLab.RCE_System.request_dto.CodeRequestDTO;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/execute")
public class ExecutionController {

    @PostMapping("/run")
    public void runCode(@RequestBody CodeRequestDTO dto){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();


    }

    @PostMapping("/submit")
    public void submitCode(@RequestBody CodeRequestDTO dto){

    }
}
