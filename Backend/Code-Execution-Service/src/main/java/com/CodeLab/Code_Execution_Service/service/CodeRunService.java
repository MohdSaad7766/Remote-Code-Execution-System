package com.CodeLab.Code_Execution_Service.service;

import common.RunCodeRequestDTO;
import org.springframework.stereotype.Service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Comparator;

@Service
public class CodeRunService {
    public String runCode(RunCodeRequestDTO dto){
        String code = CodeMerger.mergeCode(dto.getLanguage(), dto.getMainCode(), dto.getUserCode());
        String input = dto.getInput();

        String output = switch (dto.getLanguage()){
            case C -> cCodeExecutor(code, input);
            case CPP -> cppCodeExecutor(code, input);
            case JAVA -> javaCodeExecutor(code, input);
            case JAVA_SCRIPT -> jsCodeExecutor(code, input);
            case PYTHON -> pyCodeExecutor(code, input);
        };

        return output;
    }


    private String cCodeExecutor(String code, String input) {

        Path tempDir = null;

        try {
            // 1. Create temp directory
            tempDir = Files.createTempDirectory("code-");

            // 2. Write C source
            Files.writeString(
                    tempDir.resolve("main.c"),
                    code
            );

            // 3. Write input
            Files.writeString(
                    tempDir.resolve("input.txt"),
                    input
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

            return output;

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


    private String cppCodeExecutor(String code, String input) {

        Path tempDir = null;

        try {
            // 1. Create temp directory
            tempDir = Files.createTempDirectory("code-");

            // 2. Write C++ source
            Files.writeString(
                    tempDir.resolve("main.cpp"),
                    code
            );

            // 3. Write input
            Files.writeString(
                    tempDir.resolve("input.txt"),
                    input
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

            return output;

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

    private String javaCodeExecutor(String code, String input) {
        Path tempDir = null;

        try {
            // Create temp folder
            tempDir = Files.createTempDirectory("code-");

            // Write Java source
            Files.writeString(
                    tempDir.resolve("Main.java"),
                   code
            );

            // Write input
            Files.writeString(
                    tempDir.resolve("input.txt"),
                    input
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

            return output;

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

    private String jsCodeExecutor(String code, String input) {

        Path tempDir = null;

        try {
            // 1. Create temp directory
            tempDir = Files.createTempDirectory("code-");

            // 2. Write JS code
            Files.writeString(
                    tempDir.resolve("main.js"),
                    code
            );

            // 3. Write input
            Files.writeString(
                    tempDir.resolve("input.txt"),
                   input
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

            return output;

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

    private String pyCodeExecutor(String code, String input) {

        Path tempDir = null;

        try {
            // 1. Create temp directory
            tempDir = Files.createTempDirectory("code-");

            // 2. Write Python code
            Files.writeString(
                    tempDir.resolve("main.py"),
                    code
            );

            // 3. Write input
            Files.writeString(
                    tempDir.resolve("input.txt"),
                    input
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

           return output;

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
}
