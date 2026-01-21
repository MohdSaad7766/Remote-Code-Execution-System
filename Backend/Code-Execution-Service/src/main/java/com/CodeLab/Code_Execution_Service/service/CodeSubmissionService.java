package com.CodeLab.Code_Execution_Service.service;

import com.CodeLab.Code_Execution_Service.DTO.CodeExecutionResult;
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
public class CodeExecutionService {

    private final ComplexityAnalysisService analysisService;
    private final RabbitMQProducerService rabbitMQProducerService;

    CodeExecutionService(RabbitMQProducerService rabbitMQProducerService,ComplexityAnalysisService analysisService){
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
        responseDTO.setTotalPassedTestcases(100);


        responseDTO.setLastInput("Last Intput");
        responseDTO.setLastOutput("Last Op");
        responseDTO.setLastExpectedOutput("last Op");

        if(codeExecutionResult != null){
            responseDTO.setStatus(codeExecutionResult.getStatus());
            responseDTO.setError(codeExecutionResult.getError());

            if(codeExecutionResult.getStatus() == SubmissionStatus.ACCEPTED){
                Map<String, String> complexities = analysisService.getTimeAndSpaceComplexity(codeDto.getUserCode());
                responseDTO.setTimeComplexity(complexities.get("TC"));
                responseDTO.setSpaceComplexity(complexities.get("SC"));
            }
            else{
                responseDTO.setTimeComplexity("NA");
                responseDTO.setSpaceComplexity("NA");
            }
        }
        else{
            responseDTO.setStatus(SubmissionStatus.INTERNAL_ERROR);
            responseDTO.setError(null);
            responseDTO.setTimeComplexity("NA");
            responseDTO.setSpaceComplexity("NA");
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
                    CodeMerger.mergeCCode(codeDto)
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
                    CodeMerger.mergeCppCode(codeDto)
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
                    CodeMerger.mergeJavaCode(codeDto)
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
                    CodeMerger.mergeJavaScriptCode(codeDto)
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
                    CodeMerger.mergePythonCode(codeDto)
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
                boolean correct = isCorrect(output, dto.getExpectedOutput(), dto.getTotalTestcases());
                res.setStatus(correct ? SubmissionStatus.ACCEPTED : SubmissionStatus.WRONG_ANSWER);
                res.setOutput(output);
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


    private boolean isCorrect(String output, String expectedOutput, int totalTestcases) {
        System.out.println("Output: \n"+output);
        System.out.println("Expected: \n"+expectedOutput);

        if (output == null || expectedOutput == null) return false;

        String[] outLines = output.trim().split("\\R");
        String[] expLines = expectedOutput.trim().split("\\R");

        if (outLines.length != expLines.length) return false;
        if (outLines.length != totalTestcases) return false;

        for (int i = 0; i < totalTestcases; i++) {
            String op = outLines[i].trim();
            String expected = expLines[i].trim();

            if (!op.equals(expected)) {
                System.out.println(op +" != " + expected);
                System.out.println("Mismatch at test case " + (i + 1));
                return false;
            }
        }

        return true;
    }
}
