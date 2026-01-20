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

//		testTimeComplexityService(context);

	}

	public static void testTimeComplexityService(ApplicationContext context){
		String code = """
        public static void findEvenSumPairs(int[] arr) {
            int n = arr.length;

            // Extra space O(n)
            int[] copy = new int[n];
            for (int i = 0; i < n; i++) {
                copy[i] = arr[i];
            }

            // Nested loops → O(n^3)
            for (int i = 0; i < n; i++) {
                for (int j = i + 1; j < n; j++) {
                    for (int k = j + 1; k < n; k++) {
                        if ((copy[i] + copy[j] + copy[k]) % 2 == 0) {
                            System.out.println(copy[i] + ", " + copy[j] + ", " + copy[k]);
                        }
                    }
                }
            }
        }
        """;


		ComplexityAnalysisService service =context.getBean(ComplexityAnalysisService.class);

		Map<String, String> timeAndSpaceComplexity = service.getTimeAndSpaceComplexity(code);
		System.out.println(timeAndSpaceComplexity);
	}
}
