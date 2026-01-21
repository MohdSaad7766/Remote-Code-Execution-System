package com.CodeLab.Code_Execution_Service.controller;

import com.CodeLab.Code_Execution_Service.DTO.RunCodeRequestDTO;
import com.CodeLab.Code_Execution_Service.service.CodeRunService;
import jakarta.annotation.PostConstruct;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/execute-code")
public class CodeExecutionController {

    private final CodeRunService codeRunService;

    CodeExecutionController(CodeRunService codeRunService){
        this.codeRunService = codeRunService;
    }

    @PostMapping("/run")
    public String normalRun(@RequestBody RunCodeRequestDTO dto){
        System.out.println("DTO Received For RUN\n"+dto);
        return codeRunService.runCode(dto);
    }
}
