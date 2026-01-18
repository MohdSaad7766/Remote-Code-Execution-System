package com.CodeLab.RCE_System;

import com.CodeLab.RCE_System.entity.Problem;
import com.CodeLab.RCE_System.enums.ApproachType;
import com.CodeLab.RCE_System.enums.Difficulty;
import com.CodeLab.RCE_System.enums.Language;
import com.CodeLab.RCE_System.request_dto.*;
import com.CodeLab.RCE_System.service.ProblemService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Set;
import java.util.UUID;

//@SpringBootTest
public class ProblemServiceTest {

    @Autowired
    ProblemService problemService;

//    @Test
    public void testAddProblem(){
        ProblemRequestDTO problemRequestDTO = new ProblemRequestDTO();

// Basic fields
        problemRequestDTO.setTitle("Two Sum");
        problemRequestDTO.setDescription(
                "Given an array of integers nums and an integer target, " +
                        "return indices of the two numbers such that they add up to target."
        );
        problemRequestDTO.setDifficulty(Difficulty.EASY);
        problemRequestDTO.setNote("Use a hash map for optimal solution.");
        problemRequestDTO.setFollowUp("Can you solve it in O(n) time?");

// Constraints
        problemRequestDTO.setConstraints(List.of(
                "2 <= nums.length <= 10^4",
                "-10^9 <= nums[i] <= 10^9",
                "-10^9 <= target <= 10^9"
        ));

// Examples
        ExampleRequestDTO example1 = new ExampleRequestDTO();
        example1.setInput("nums = [2,7,11,15], target = 9");
        example1.setOutput("[0,1]");
        example1.setExplanation("nums[0] + nums[1] = 2 + 7 = 9");
        example1.setImagePath(null);

        problemRequestDTO.setExampleList(List.of(example1));

// Testcases
        TestcaseRequestDTO testcase1 = new TestcaseRequestDTO();
        testcase1.setInput("[2,7,11,15], 9");
        testcase1.setExpectedOutput("[0,1]");
        testcase1.setVisible(true);

        TestcaseRequestDTO testcase2 = new TestcaseRequestDTO();
        testcase2.setInput("[3,2,4], 6");
        testcase2.setExpectedOutput("[1,2]");
        testcase2.setVisible(false);

        problemRequestDTO.setTestcaseList(List.of(testcase1, testcase2));

// Topics & Companies (UUIDs)
        problemRequestDTO.setTopicList(Set.of(
                UUID.fromString("11111111-1111-1111-1111-111111111111")
        ));

        problemRequestDTO.setCompanyList(Set.of(
                UUID.fromString("22222222-2222-2222-2222-222222222222")
        ));

// Code Templates
        CodeTemplateRequestDTO javaTemplate = new CodeTemplateRequestDTO();
        javaTemplate.setLanguage(Language.JAVA);
        javaTemplate.setVisibleCode(
                "class Solution {\n" +
                        "    public int[] twoSum(int[] nums, int target) {\n" +
                        "        // write your code here\n" +
                        "        return new int[0];\n" +
                        "    }\n" +
                        "}"
        );
        javaTemplate.setInvisibleCode(
                "import java.util.*;"
        );

        problemRequestDTO.setCodeTemplateList(List.of(javaTemplate));

// Solution Approaches
        ApproachRequestDTO bruteForce = new ApproachRequestDTO();
        bruteForce.setApproachType(ApproachType.BRUTE_FORCE);
        bruteForce.setDescription("Check all pairs using two loops. Time O(n²).");

        ApproachRequestDTO optimal = new ApproachRequestDTO();
        optimal.setApproachType(ApproachType.OPTIMAL);
        optimal.setDescription("Use HashMap to store visited elements. Time O(n).");

        SolutionRequestDTO solution = new SolutionRequestDTO();
        solution.setApproachList(List.of(bruteForce, optimal));

        problemRequestDTO.setSolution(solution);

        problemRequestDTO.setNote("Note akmsmva");
        problemRequestDTO.setFollowUp("wehbjdhjsfhfsajks");

        Problem problem = problemService.addProblem(problemRequestDTO, false);
        System.out.println("Probem: \n"+problem);

    }
}
