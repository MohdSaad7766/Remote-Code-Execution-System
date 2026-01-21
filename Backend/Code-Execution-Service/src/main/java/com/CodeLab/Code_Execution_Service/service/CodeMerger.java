package com.CodeLab.Code_Execution_Service.service;

import com.CodeLab.Code_Execution_Service.DTO.RunCodeRequestDTO;
import com.CodeLab.Code_Execution_Service.enums.Language;
import common.CodeExecutionRequestDTO;

import java.util.*;

public class CodeMerger {
    public static String mergeCode(Language language, String mainCode, String userCode) {
        switch (language) {
            case JAVA:
                return mergeJavaCode(mainCode, userCode);
            case CPP:
                return mergeCppCode(mainCode, userCode);
            case C:
                return mergeCCode(mainCode, userCode);
            case JAVA_SCRIPT:
                return mergeJavaScriptCode(mainCode, userCode);
            case PYTHON:
                return mergePythonCode(mainCode, userCode);
            default:
                throw new IllegalArgumentException("Unsupported language");
        }
    }



    public static String mergeJavaCode(String mainCode,  String userCode) {

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


    public static String mergeCppCode(String mainCode,  String userCode) {

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


    public static String mergeCCode(String mainCode,  String userCode) {
        userCode = (userCode == null) ? "" : userCode.strip();
        mainCode = (mainCode == null) ? "" : mainCode.strip();

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



    public static String mergeJavaScriptCode(String mainCode,  String userCode) {
        if (userCode == null || userCode.isBlank()) {
            return mainCode;
        }
        // Ensure proper spacing between user code and main code
        return userCode.stripTrailing() + "\n\n" + mainCode.stripLeading();
    }

    public static String mergePythonCode(String mainCode,  String userCode) {
        if (userCode == null || userCode.isBlank()) {
            return mainCode;
        }
        // Properly join user code and main code with spacing
        return userCode.stripTrailing() + "\n\n" + mainCode.stripLeading();
    }
}
