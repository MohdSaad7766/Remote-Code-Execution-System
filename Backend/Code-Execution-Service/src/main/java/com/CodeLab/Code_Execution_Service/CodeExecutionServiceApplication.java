package com.CodeLab.Code_Execution_Service;

import com.CodeLab.Code_Execution_Service.service.ComplexityAnalysisService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import java.util.Map;

@SpringBootApplication
public class CodeExecutionServiceApplication {

	public static void main(String[] args) {
		ApplicationContext context = SpringApplication.run(CodeExecutionServiceApplication.class, args);
		System.out.println("Code Execution Service Started");
	}
}
