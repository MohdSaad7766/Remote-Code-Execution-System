#!/bin/bash

# Compile
gcc -O2 main.c -o main_exe 2> compile_error.txt
if [ $? -ne 0 ]; then
    cat compile_error.txt
    exit 10
fi

# Run
timeout 4s ./main_exe < input.txt > output.txt 2> runtime_error.txt
EXIT_CODE=$?

# TLE
if [ $EXIT_CODE -eq 124 ]; then
    echo "TLE"
    exit 124
fi

# Runtime Error
if [ $EXIT_CODE -ne 0 ]; then
    cat runtime_error.txt
    exit 20
fi

# Success
cat output.txt
