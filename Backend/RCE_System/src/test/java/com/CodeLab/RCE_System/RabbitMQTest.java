package com.CodeLab.RCE_System;

//import com.CodeLab.RCE_System.request_dto.CodeExecutionRequestDTO;
import com.CodeLab.RCE_System.enums.ExecutionType;
import com.CodeLab.RCE_System.enums.Language;
import com.CodeLab.RCE_System.rabbitMQ.RabbitMQProducerService;
import common.CodeExecutionRequestDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.UUID;

@SpringBootTest
public class RabbitMQTest {
    @Autowired
    RabbitMQProducerService rabbitMQProducerService;

    @Test
    public void javaExeTest() {

        CodeExecutionRequestDTO codeDto = new CodeExecutionRequestDTO();

        // USER CODE (Logic only)
        codeDto.setUserCode("""
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

        codeDto.setMainCode("""
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


        codeDto.setLanguage(Language.JAVA);
        codeDto.setExecutionType(ExecutionType.NORMAL_RUN);
        codeDto.setUserId(UUID.randomUUID());

        codeDto.setInput(
                "20\n" +
                        "4 9\n2 7 11 15\n".repeat(20)
        );

        codeDto.setExpectedOutput("0 1\n".repeat(20));
        codeDto.setTotalTestcases(20);

        rabbitMQProducerService.executeCode(codeDto);
    }


    @Test
    public void cppExeTest() {

        CodeExecutionRequestDTO dto = new CodeExecutionRequestDTO();

        dto.setUserCode("""
    class TwoSumSolver {
    public:
        std::vector<int> twoSum(std::vector<int>& nums, int target) {
            std::unordered_map<int, int> mp;
            for (int i = 0; i < nums.size(); i++) {
                int diff = target - nums[i];
                if (mp.count(diff)) return {mp[diff], i};
                mp[nums[i]] = i;
            }
            return {-1, -1};
        }
    };
    """);

        dto.setMainCode("""
    #include <bits/stdc++.h>
    using namespace std;

    int main() {
        int t;
        cin >> t;
        while (t--) {
            int n, target;
            cin >> n >> target;
            vector<int> nums(n);
            for (int i = 0; i < n; i++) cin >> nums[i];

            TwoSumSolver solver;
            auto res = solver.twoSum(nums, target);
            cout << res[0] << " " << res[1] << '\\n';
        }
        return 0;
    }
    """);



        dto.setLanguage(Language.CPP);
        dto.setExecutionType(ExecutionType.NORMAL_RUN);
        dto.setUserId(UUID.randomUUID());
        dto.setInput("20\n" + "4 9\n2 7 11 15\n".repeat(20));
        dto.setExpectedOutput("0 1\n".repeat(20));
        dto.setTotalTestcases(20);

        rabbitMQProducerService.executeCode(dto);
    }


    @Test
    public void cExeTest() {

        CodeExecutionRequestDTO dto = new CodeExecutionRequestDTO();

        dto.setUserCode("""
    void twoSum(int nums[], int n, int target) {
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (nums[i] + nums[j] == target) {
                    printf("%d %d\\n", i, j);
                    return;
                }
            }
        }
    }
    """);

        dto.setMainCode("""
    #include <stdio.h>

    void twoSum(int nums[], int n, int target);

    int main() {
        int t;
        scanf("%d", &t);

        while (t--) {
            int n, target;
            scanf("%d %d", &n, &target);

            int nums[n];
            for (int i = 0; i < n; i++) {
                scanf("%d", &nums[i]);
            }

            twoSum(nums, n, target);
        }

        return 0;
    }
    """);


        dto.setLanguage(Language.C);
        dto.setExecutionType(ExecutionType.NORMAL_RUN);
        dto.setUserId(UUID.randomUUID());
        dto.setInput("20\n" + "4 9\n2 7 11 15\n".repeat(20));
        dto.setExpectedOutput("0 1\n".repeat(20));
        dto.setTotalTestcases(20);

        rabbitMQProducerService.executeCode(dto);
    }


    @Test
    public void jsExeTest() {

        CodeExecutionRequestDTO dto = new CodeExecutionRequestDTO();

        dto.setUserCode("""
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number[]} [index1, index2]
     */
    function twoSum(nums, target) {
        const map = new Map();
        for (let i = 0; i < nums.length; i++) {
            let diff = target - nums[i];
            if (map.has(diff)) {
                return [map.get(diff), i];
            }
            map.set(nums[i], i);
        }
        return [-1, -1];
    }
    """);


        dto.setMainCode("""
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
    let i = 0;
    let t = parseInt(input[i++]);
    
    while (t--) {
        let n = parseInt(input[i++]);
        let target = parseInt(input[i++]);
        let nums = [];
        for (let j = 0; j < n; j++) nums.push(parseInt(input[i++]));

        const res = twoSum(nums, target);
        console.log(res[0], res[1]);
    }
    """);


        dto.setLanguage(Language.JAVA_SCRIPT);
        dto.setExecutionType(ExecutionType.NORMAL_RUN);
        dto.setUserId(UUID.randomUUID());
        dto.setInput("20\n" + "4 9\n2 7 11 15\n".repeat(20));
        dto.setExpectedOutput("0 1\n".repeat(20));
        dto.setTotalTestcases(20);

        rabbitMQProducerService.executeCode(dto);
    }

    @Test
    public void pythonExeTest() {

        CodeExecutionRequestDTO dto = new CodeExecutionRequestDTO();

        dto.setUserCode("""
    class TwoSumSolver:
        def two_sum(self, nums, target):
            mp = {}
            for i, num in enumerate(nums):
                diff = target - num
                if diff in mp:
                    return mp[diff], i
                mp[num] = i
            return -1, -1
    """);

        dto.setMainCode("""
    t = int(input())
    for _ in range(t):
        n, target = map(int, input().split())
        nums = list(map(int, input().split()))
        solver = TwoSumSolver()
        i, j = solver.two_sum(nums, target)
        print(i, j)
    """);


        dto.setLanguage(Language.PYTHON);
        dto.setExecutionType(ExecutionType.NORMAL_RUN);
        dto.setUserId(UUID.randomUUID());
        dto.setInput("50\n" + "4 9\n2 7 11 15\n".repeat(50));
        dto.setExpectedOutput("0 1\n".repeat(50));
        dto.setTotalTestcases(50);

        rabbitMQProducerService.executeCode(dto);
    }



}
