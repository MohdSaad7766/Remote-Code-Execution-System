package com.CodeLab.RCE_System;

import com.CodeLab.RCE_System.enums.ExecutionType;
import com.CodeLab.RCE_System.enums.Language;
import com.CodeLab.RCE_System.request_dto.CodeRequestDTO;
import com.CodeLab.RCE_System.service.ExecutionService;
import org.checkerframework.checker.units.qual.A;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.UUID;

@SpringBootTest
public class ExecutionTest {

    @Autowired
    ExecutionService service;

    @Test
    public void testRunCode(){
        CodeRequestDTO dto = new CodeRequestDTO();
        dto.setExecutionType(ExecutionType.NORMAL_RUN);
        dto.setLanguage(Language.JAVA);
        UUID problemId = UUID.fromString("7ff4b3c1-adb0-4952-a84b-01d7ad9fbf8d");
        dto.setProblemId(problemId);
        // USER CODE (Logic only)
        dto.setUserCode("""
    class TwoSumSolver {
        public int[] twoSum(int[] nums, int target) {
            Map<Integer, Integer> mp = new HashMap<>();
            for (int i = 0; i < nums.length; i++) {
                int diff = target - nums[i];
                if (mp.containsKey(diff)) return new int[]{mp.get(diff), i};
                mp.put(nums[i], i);
                
//                int number = 100/ 0;
            }

            return new int[]{-1, -1};
        }
    }
    """);

        dto.setMainCode("""
    import java.util.*;

    public class Main {
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
            int t = sc.nextInt();
            while (t-- > 0) {
                int n = sc.nextInt();
                int target = sc.nextInt();
                int[] nums = new int[n];
                for (int i = 0; i < n; i++) nums[i] = sc.nextInt();

                TwoSumSolver solver = new TwoSumSolver();
                int[] res = solver.twoSum(nums, target);
                System.out.println(res[0] + " " + res[1]);

            }
        }
    }
    """);

        service.runCode(dto, null);
    }
}
