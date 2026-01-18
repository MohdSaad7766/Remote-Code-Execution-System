package com.CodeLab.Code_Execution_Service;

import com.CodeLab.Code_Execution_Service.service.ComplexityAnalysisService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class Testing {


    ComplexityAnalysisService complexityAnalysisService;

    @BeforeEach
    public void setup(){
        System.out.println("From setup()");
        complexityAnalysisService = new ComplexityAnalysisService();
    }

    @AfterEach
    public void tearDown(){
        System.out.println("From tearDown()");
        complexityAnalysisService = null;
    }

    @Test
    public void testTimeComplexityService(){

        String code = """
                public static void findEvenSumPairs(int[] arr) {
                        int n = arr.length;
                
                        // Extra space O(n)
                        int[] copy = new int[n];
                        for (int i = 0; i < n; i++) {
                            copy[i] = arr[i];
                        }
                
                        // Nested loops → O(n^2)
                        for (int i = 0; i < n; i++) {
                            for (int j = i + 1; j < n; j++) {
                                if ((copy[i] + copy[j]) % 2 == 0) {
                                    System.out.println(copy[i] + ", " + copy[j]);
                                }
                            }
                        }
                    }
                """;

        complexityAnalysisService.getTimeAndSpaceComplexity(code);
    }
}
