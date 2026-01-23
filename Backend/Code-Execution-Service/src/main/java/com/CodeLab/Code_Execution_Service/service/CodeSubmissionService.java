package com.CodeLab.Code_Execution_Service.service;

import com.CodeLab.Code_Execution_Service.DTO.CodeExecutionResult;
import com.CodeLab.Code_Execution_Service.DTO.TestcaseEvaluationResult;
import com.CodeLab.Code_Execution_Service.enums.Language;
import com.CodeLab.Code_Execution_Service.enums.SubmissionStatus;
import com.CodeLab.Code_Execution_Service.rabbitMQ.RabbitMQProducerService;
import common.CodeExecutionRequestDTO;
import common.CodeExecutionResponseDTO;
import org.springframework.stereotype.Service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Comparator;
import java.util.Map;

@Service
public class CodeSubmissionService {

    private final ComplexityAnalysisService analysisService;
    private final RabbitMQProducerService rabbitMQProducerService;

    CodeSubmissionService(RabbitMQProducerService rabbitMQProducerService, ComplexityAnalysisService analysisService){
        this.rabbitMQProducerService = rabbitMQProducerService;
        this.analysisService = analysisService;
    }



    public void submitCode(CodeExecutionRequestDTO codeDto){
        Language language = codeDto.getLanguage();


        CodeExecutionResult codeExecutionResult =  switch (language) {
            case C -> cCodeExecutor(codeDto);
            case CPP -> cppCodeExecutor(codeDto);
            case JAVA -> javaCodeExecutor(codeDto);
            case JAVA_SCRIPT -> jsCodeExecutor(codeDto);
            case PYTHON -> pyCodeExecutor(codeDto);
            default -> null;
        };

        CodeExecutionResponseDTO responseDTO = new CodeExecutionResponseDTO();

        responseDTO.setSubmissionId(codeDto.getSubmissionId());



        if(codeExecutionResult != null){
            responseDTO.setStatus(codeExecutionResult.getStatus());
            responseDTO.setError(codeExecutionResult.getError());
            responseDTO.setLastInput(codeExecutionResult.getLastInput());
            responseDTO.setLastOutput(codeExecutionResult.getLastOutput());
            responseDTO.setLastExpectedOutput(codeExecutionResult.getLastExpectedOutput());

            if(codeExecutionResult.getStatus() == SubmissionStatus.ACCEPTED){
                Map<String, String> complexities = analysisService.getTimeAndSpaceComplexity(codeDto.getUserCode());
                responseDTO.setTimeComplexity(complexities.get("TC"));
                responseDTO.setSpaceComplexity(complexities.get("SC"));
            }
            else{
                responseDTO.setTimeComplexity(null);
                responseDTO.setSpaceComplexity(null);
            }
        }
        else{
            responseDTO.setStatus(SubmissionStatus.INTERNAL_ERROR);
            responseDTO.setError(null);
            responseDTO.setTimeComplexity(null);
            responseDTO.setSpaceComplexity(null);
        }

        rabbitMQProducerService.sendExecutionResult(responseDTO);
    }

    private CodeExecutionResult cCodeExecutor(CodeExecutionRequestDTO codeDto) {

        Path tempDir = null;

        try {
            // 1. Create temp directory
            tempDir = Files.createTempDirectory("code-");

            // 2. Write C source
            Files.writeString(
                    tempDir.resolve("main.c"),
                    CodeMerger.mergeCCode(codeDto.getMainCode(), codeDto.getUserCode())
            );

            // 3. Write input
            Files.writeString(
                    tempDir.resolve("input.txt"),
                    codeDto.getInput()
            );

            // 4. Docker execution
            ProcessBuilder pb = new ProcessBuilder(
                    "docker", "run", "--rm",
                    "--memory=256m",
                    "--cpus=1",
                    "--pids-limit=64",
                    "--network", "none",
                    "-e", "TIME_LIMIT=4",
                    "-v", tempDir.toAbsolutePath() + ":/app",
                    "oj-c"
            );

            Process process = pb.start();

            String output = new String(process.getInputStream().readAllBytes());
            String error = new String(process.getErrorStream().readAllBytes());

            int exitCode = process.waitFor();

            return mapResult(exitCode, output, error, codeDto);

        } catch (Exception e) {
            System.err.println("C execution failed: " + e.getMessage());
        } finally {
            // Cleanup temp directory
            try {
                if (tempDir != null) {
                    Files.walk(tempDir)
                            .sorted(Comparator.reverseOrder())
                            .forEach(p -> p.toFile().delete());
                }
            } catch (Exception ignored) {}
        }
        return null;
    }

    private CodeExecutionResult cppCodeExecutor(CodeExecutionRequestDTO codeDto) {

        Path tempDir = null;

        try {
            // 1. Create temp directory
            tempDir = Files.createTempDirectory("code-");

            // 2. Write C++ source
            Files.writeString(
                    tempDir.resolve("main.cpp"),
                    CodeMerger.mergeCppCode(codeDto.getMainCode(), codeDto.getUserCode())
            );

            // 3. Write input
            Files.writeString(
                    tempDir.resolve("input.txt"),
                    codeDto.getInput()
            );

            // 4. Docker execution
            ProcessBuilder pb = new ProcessBuilder(
                    "docker", "run", "--rm",
                    "--memory=256m",
                    "--cpus=1",
                    "--pids-limit=64",
                    "--network", "none",
                    "-e", "TIME_LIMIT=4",
                    "-v", tempDir.toAbsolutePath() + ":/app",
                    "oj-cpp"
            );

            Process process = pb.start();

            String output = new String(process.getInputStream().readAllBytes());
            String error = new String(process.getErrorStream().readAllBytes());

            int exitCode = process.waitFor();

            return mapResult(exitCode, output, error, codeDto);

        } catch (Exception e) {
            System.err.println("C++ execution failed: " + e.getMessage());
        } finally {
            try {
                if (tempDir != null) {
                    Files.walk(tempDir)
                            .sorted(Comparator.reverseOrder())
                            .forEach(p -> p.toFile().delete());
                }
            } catch (Exception ignored) {}
        }
        return null;
    }

    private CodeExecutionResult javaCodeExecutor(CodeExecutionRequestDTO codeDto) {
        Path tempDir = null;

        try {
            // Create temp folder
            tempDir = Files.createTempDirectory("code-");

            // Write Java source
            Files.writeString(
                    tempDir.resolve("Main.java"),
                    CodeMerger.mergeJavaCode(codeDto.getMainCode(), codeDto.getUserCode())
            );

            // Write input
            Files.writeString(
                    tempDir.resolve("input.txt"),
                    codeDto.getInput()
            );

            // Docker execution
            ProcessBuilder pb = new ProcessBuilder(
                    "docker", "run", "--rm",
                    "--memory=256m",
                    "--cpus=1",
                    "--pids-limit=64",
                    "--network", "none",
                    "-e", "TIME_LIMIT=5",
                    "-v", tempDir.toAbsolutePath() + ":/app",
                    "oj-java"
            );

            Process process = pb.start();

            String output = new String(process.getInputStream().readAllBytes());
            String error = new String(process.getErrorStream().readAllBytes());

            int exitCode = process.waitFor();

            return mapResult(exitCode, output, error, codeDto);

        } catch (Exception e) {
            System.err.println("Execution failed: " + e.getMessage());
        } finally {
            // Cleanup temp directory
            try {
                if (tempDir != null) {
                    Files.walk(tempDir)
                            .sorted(Comparator.reverseOrder())
                            .forEach(p -> p.toFile().delete());
                }
            } catch (Exception ignored) {}
        }
        return null;
    }

    private CodeExecutionResult jsCodeExecutor(CodeExecutionRequestDTO codeDto) {

        Path tempDir = null;

        try {
            // 1. Create temp directory
            tempDir = Files.createTempDirectory("code-");

            // 2. Write JS code
            Files.writeString(
                    tempDir.resolve("main.js"),
                    CodeMerger.mergeJavaScriptCode(codeDto.getMainCode(), codeDto.getUserCode())
            );

            // 3. Write input
            Files.writeString(
                    tempDir.resolve("input.txt"),
                    codeDto.getInput()
            );

            // 4. Run Docker container
            ProcessBuilder pb = new ProcessBuilder(
                    "docker", "run", "--rm",
                    "--memory=256m",
                    "--cpus=1",
                    "--pids-limit=64",
                    "--network", "none",
                    "-e", "TIME_LIMIT=5",
                    "-v", tempDir.toAbsolutePath() + ":/app",
                    "oj-js"
            );

            Process process = pb.start();

            String output = new String(process.getInputStream().readAllBytes());
            String error = new String(process.getErrorStream().readAllBytes());

            int exitCode = process.waitFor();

            return mapResult(exitCode, output, error, codeDto);

        } catch (Exception e) {
            System.err.println("JS execution failed: " + e.getMessage());
        } finally {
            try {
                if (tempDir != null) {
                    Files.walk(tempDir)
                            .sorted(Comparator.reverseOrder())
                            .forEach(p -> p.toFile().delete());
                }
            } catch (Exception ignored) {}
        }
        return null;
    }

    private CodeExecutionResult pyCodeExecutor(CodeExecutionRequestDTO codeDto) {

        Path tempDir = null;

        try {
            // 1. Create temp directory
            tempDir = Files.createTempDirectory("code-");

            // 2. Write Python code
            Files.writeString(
                    tempDir.resolve("main.py"),
                    CodeMerger.mergePythonCode(codeDto.getMainCode(), codeDto.getUserCode())
            );

            // 3. Write input
            Files.writeString(
                    tempDir.resolve("input.txt"),
                    codeDto.getInput()
            );

            // 4. Docker execution
            ProcessBuilder pb = new ProcessBuilder(
                    "docker", "run", "--rm",
                    "--memory=256m",
                    "--cpus=1",
                    "--pids-limit=64",
                    "--network", "none",
                    "-e", "TIME_LIMIT=8",
                    "-v", tempDir.toAbsolutePath() + ":/app",
                    "oj-python"
            );

            Process process = pb.start();

            String output = new String(process.getInputStream().readAllBytes());
            String error = new String(process.getErrorStream().readAllBytes());

            int exitCode = process.waitFor();

            return mapResult(exitCode, output, error, codeDto);

        } catch (Exception e) {
            System.err.println("Python execution failed: " + e.getMessage());
        } finally {
            try {
                if (tempDir != null) {
                    Files.walk(tempDir)
                            .sorted(Comparator.reverseOrder())
                            .forEach(p -> p.toFile().delete());
                }
            } catch (Exception ignored) {}
        }
        return null;
    }



    private CodeExecutionResult mapResult(int exitCode, String output, String error, CodeExecutionRequestDTO dto) {

        CodeExecutionResult res = new CodeExecutionResult();

        switch (exitCode) {

            case 0 -> {
                TestcaseEvaluationResult result = isCorrect(dto.getInput(), output, dto.getExpectedOutput(), dto.getTotalTestcases());
                boolean correct = result.isAllTestcasesPassed();
                res.setStatus(correct ? SubmissionStatus.ACCEPTED : SubmissionStatus.WRONG_ANSWER);
                res.setOutput(output);
                res.setLastInput(result.getLastInput());
                res.setLastOutput(result.getLastOutput());
                res.setLastExpectedOutput(result.getLastExpectedOutput());
            }

            case 10 -> {
                res.setStatus(SubmissionStatus.COMPILE_ERROR);
                res.setError(output);
            }

            case 124 -> {
                res.setStatus(SubmissionStatus.TIME_LIMIT_EXCEEDED);
            }

            default -> {
                res.setStatus(SubmissionStatus.RUNTIME_ERROR);
                res.setError(output);
            }
        }

        return res;
    }


    private TestcaseEvaluationResult isCorrect(String input, String output, String expectedOutput, int totalTestcases) {
        TestcaseEvaluationResult result = new TestcaseEvaluationResult();

        System.out.println("Output: \n"+output);
        System.out.println("Expected: \n"+expectedOutput);

        if (output == null || expectedOutput == null) return result;

        String[] inputLines = input.trim().split("\\R");
        String[] outputLines = output.trim().split("\\R");
        String[] expectedOutputLines = expectedOutput.trim().split("\\R");

        if(inputLines.length != totalTestcases+1) return result;
        if (outputLines.length != expectedOutputLines.length) return result;
        if (outputLines.length != totalTestcases) return result;


        String in = null;
        String op = null;
        String expected = null;
        result.setTotalTestCasesPassed(totalTestcases);
        result.setAllTestcasesPassed(true);

        for (int i = 0; i < totalTestcases; i++) {
            in = inputLines[i+1].trim();
            op = outputLines[i].trim();
            expected = expectedOutputLines[i].trim();

            if (!op.equals(expected)) {
                System.out.println(op + " != " + expected);
                System.out.println("Mismatch at test case " + (i + 1));
                result.setTotalTestCasesPassed(i + 1);
                result.setAllTestcasesPassed(false);
                break;
            }
        }
        result.setLastInput(in);
        result.setLastOutput(op);
        result.setLastExpectedOutput(expected);

        return result;
    }
}
