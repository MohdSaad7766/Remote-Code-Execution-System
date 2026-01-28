package com.CodeLab.RCE_System.controller;

import com.CodeLab.RCE_System.service.ExecutionService;
import common.RunCodeRequestDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/execute")
public class ExecutionController {

    private final ExecutionService executionService;

    ExecutionController(ExecutionService executionService){
        this.executionService = executionService;
    }

    @PostMapping("/run")
    public ResponseEntity<String> runCode(@RequestBody RunCodeRequestDTO dto){
        String output = executionService.runCode(dto);

        return ResponseEntity.ok(output);
    }
}
