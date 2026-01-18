package com.CodeLab.RCE_System.service;

import com.CodeLab.RCE_System.entity.Problem;
import com.CodeLab.RCE_System.entity.Testcase;
import com.CodeLab.RCE_System.request_dto.TestcaseRequestDTO;
import com.CodeLab.RCE_System.response_dto.TestcaseResponseDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class TestcaseFileService {

    @Value("${testcase.base.path}")
    private String basePath;

    public Path getProblemFolder(UUID problemId){
        return Paths.get(basePath, problemId.toString());
    }

    public Path getInputPath(UUID problemId, UUID testcaseId){
        return getProblemFolder(problemId).resolve(testcaseId.toString() + ".in");
    }

    public Path getOutputPath(UUID problemId, UUID testcaseId){
        return getProblemFolder(problemId).resolve(testcaseId + ".out");
    }

    public void addTestcase(UUID problemId, UUID testcaseId, String input, String expectedOutput) throws IOException {
        Path folder = getProblemFolder(problemId);
        Files.createDirectories(folder);

        Files.writeString(getInputPath(problemId, testcaseId), input , StandardCharsets.UTF_8);
        Files.writeString(getOutputPath(problemId, testcaseId), expectedOutput, StandardCharsets.UTF_8);
    }

    public void addTestcases(Problem problem, List<TestcaseRequestDTO> testcases) throws IOException{

        UUID problemId = problem.getId();
        for(int i=0;i<problem.getTestcaseList().size();i++){
            UUID testcaseId = problem.getTestcaseList().get(i).getId();
            String input = testcases.get(i).getInput();
            String expectedOutput = testcases.get(i).getExpectedOutput();

            addTestcase(problemId, testcaseId, input, expectedOutput);
        }
    }

    public TestcaseResponseDTO getTestcase(UUID problemId, Testcase testcase){
        System.out.println("Base Path: "+basePath);
        UUID testcaseId = testcase.getId();

        Path io = getInputPath(problemId, testcaseId);
        Path op = getOutputPath(problemId, testcaseId);

        try {
            String input = Files.readString(io, StandardCharsets.UTF_8);
            String output = Files.readString(op, StandardCharsets.UTF_8);

            return new TestcaseResponseDTO(input, output, testcase.isVisible());
        }
        catch(IOException e){
            throw new RuntimeException(
                    "Failed to read testcase files for testcaseId: " + testcaseId, e
            );
        }
    }

    public List<TestcaseResponseDTO> getTestcase(Problem problem){

        List<TestcaseResponseDTO> dtos = new ArrayList<>();

        for(Testcase testcase : problem.getTestcaseList()){
            dtos.add(getTestcase(problem.getId(), testcase));
        }

        return dtos;
    }

    public List<StringBuilder> getTestcase(UUID problemId, List<Testcase> testcases){

        List<StringBuilder> list = new ArrayList<>();

        StringBuilder inputs = new StringBuilder();
        StringBuilder expectedOutputs = new StringBuilder();

        inputs.append(testcases.size()).append("\n");
        for(Testcase testcase : testcases){
            TestcaseResponseDTO dto = getTestcase(problemId, testcase);

            inputs.append(dto.getInput()).append("\n");
            expectedOutputs.append(dto.getOutput()).append("\n");
        }

        list.add(inputs);
        list.add(expectedOutputs);

        return list;
    }


}
