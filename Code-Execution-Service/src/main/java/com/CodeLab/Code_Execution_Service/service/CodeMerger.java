package com.CodeLab.Code_Execution_Service.service;

import common.CodeExecutionRequestDTO;

import java.util.*;

public class CodeMerger {
    public static String mergeCode(CodeExecutionRequestDTO dto) {
        switch (dto.getLanguage()) {
            case JAVA:
                return mergeJavaCode(dto);
            case CPP:
                return mergeCppCode(dto);
            case C:
                return mergeCCode(dto);
            case JAVA_SCRIPT:
                return mergeJavaScriptCode(dto);
            case PYTHON:
                return mergePythonCode(dto);
            default:
                throw new IllegalArgumentException("Unsupported language");
        }
    }

    public static String mergeJavaCode(CodeExecutionRequestDTO dto) {

        String mainCode = dto.getMainCode();
        String userCode = dto.getUserCode();

        Set<String> imports = new LinkedHashSet<>();
        StringBuilder body = new StringBuilder();
        String packageLine = "";

        // -------- Process main code --------
        for (String line : mainCode.split("\n")) {
            String trimmed = line.trim();

            if (trimmed.startsWith("package ")) {
                packageLine = trimmed;
            }
            else if (trimmed.startsWith("import ")) {
                imports.add(trimmed);
            }
            else {
                body.append(line).append("\n");
            }
        }

        // -------- Process user code --------
        for (String line : userCode.split("\n")) {
            String trimmed = line.trim();

            if (trimmed.startsWith("import ")) {
                imports.add(trimmed);
            }
            else if (!trimmed.startsWith("package ")) {
                body.append(line).append("\n");
            }
        }

        // -------- Build final code --------
        StringBuilder finalCode = new StringBuilder();

        if (!packageLine.isEmpty()) {
            finalCode.append(packageLine).append("\n\n");
        }

        for (String imp : imports) {
            finalCode.append(imp).append("\n");
        }

        if (!imports.isEmpty()) {
            finalCode.append("\n");
        }

        finalCode.append(body);

        return finalCode.toString();
    }


    public static String mergeCppCode(CodeExecutionRequestDTO dto) {

        String userCode = dto.getUserCode();
        String mainCode = dto.getMainCode();

        Set<String> includes = new LinkedHashSet<>();
        boolean hasUsingStd = false;

        StringBuilder body = new StringBuilder();

        // ---------- Process User Code ----------
        for (String line : userCode.split("\n")) {
            String trimmed = line.trim();

            if (trimmed.startsWith("#include")) {
                includes.add(trimmed);
            }
            else if (trimmed.equals("using namespace std;")) {
                hasUsingStd = true;
            }
            else {
                body.append(line).append("\n");
            }
        }

        // ---------- Process Main Code ----------
        for (String line : mainCode.split("\n")) {
            String trimmed = line.trim();

            if (trimmed.startsWith("#include")) {
                includes.add(trimmed);
            }
            else if (trimmed.equals("using namespace std;")) {
                hasUsingStd = true;
            }
            else {
                body.append(line).append("\n");
            }
        }

        // ---------- Auto-add bits/stdc++.h if missing ----------
        boolean hasBits = includes.stream()
                .anyMatch(i -> i.contains("bits/stdc++.h"));

        if (!hasBits) {
            includes.add("#include <bits/stdc++.h>");
        }

        // ---------- Build Final Code ----------
        StringBuilder finalCode = new StringBuilder();

        // Includes
        for (String inc : includes) {
            finalCode.append(inc).append("\n");
        }

        // Namespace
        finalCode.append("\nusing namespace std;\n\n");

        // Body
        finalCode.append(body);

        return finalCode.toString();
    }


    public static String mergeCCode(CodeExecutionRequestDTO dto) {
        String userCode = dto.getUserCode() == null ? "" : dto.getUserCode().strip();
        String mainCode = dto.getMainCode() == null ? "" : dto.getMainCode().strip();

        Set<String> includes = new LinkedHashSet<>();
        StringBuilder body = new StringBuilder();

        List<String> userFunctions = new ArrayList<>();
        List<String> mainFunctions = new ArrayList<>();

        // ---- Extract includes and user code ----
        for (String line : userCode.split("\n")) {
            String trimmed = line.trim();
            if (trimmed.startsWith("#include")) {
                includes.add(trimmed);
            } else {
                userFunctions.add(line);
            }
        }

        // ---- Extract includes and main code ----
        for (String line : mainCode.split("\n")) {
            String trimmed = line.trim();
            if (trimmed.startsWith("#include")) {
                includes.add(trimmed);
            } else if (!trimmed.isEmpty()) {
                mainFunctions.add(line);
            }
        }

        // ---- Remove redundant function declarations from main ----
        Set<String> userFuncSignatures = new HashSet<>();
        for (String line : userFunctions) {
            String trimmed = line.trim();
            if (trimmed.endsWith(");")) {
                userFuncSignatures.add(trimmed);
            }
        }

        List<String> filteredMain = new ArrayList<>();
        for (String line : mainFunctions) {
            if (!userFuncSignatures.contains(line.trim())) {
                filteredMain.add(line);
            }
        }

        // ---- Ensure stdio.h is included ----
        boolean hasStdio = includes.stream().anyMatch(i -> i.contains("stdio.h"));
        if (!hasStdio) {
            includes.add("#include <stdio.h>");
        }

        // ---- Build final code ----
        StringBuilder finalCode = new StringBuilder();

        // Add includes
        for (String inc : includes) {
            finalCode.append(inc).append("\n");
        }

        finalCode.append("\n");

        // Add user code
        for (String line : userFunctions) {
            finalCode.append(line).append("\n");
        }

        finalCode.append("\n");

        // Add main code (filtered)
        for (String line : filteredMain) {
            finalCode.append(line).append("\n");
        }

        return finalCode.toString();
    }



    public static String mergeJavaScriptCode(CodeExecutionRequestDTO dto) {
        if (dto.getUserCode() == null || dto.getUserCode().isBlank()) {
            return dto.getMainCode();
        }
        // Ensure proper spacing between user code and main code
        return dto.getUserCode().stripTrailing() + "\n\n" + dto.getMainCode().stripLeading();
    }

    public static String mergePythonCode(CodeExecutionRequestDTO dto) {
        if (dto.getUserCode() == null || dto.getUserCode().isBlank()) {
            return dto.getMainCode();
        }
        // Properly join user code and main code with spacing
        return dto.getUserCode().stripTrailing() + "\n\n" + dto.getMainCode().stripLeading();
    }
}
