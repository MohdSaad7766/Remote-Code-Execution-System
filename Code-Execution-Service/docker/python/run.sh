#!/bin/bash

timeout 8s python3 main.py < input.txt > output.txt 2> runtime_error.txt
EXIT_CODE=$?

# TLE
if [ $EXIT_CODE -eq 124 ]; then
    echo "TLE"
    exit 124
fi

# Runtime error
if [ $EXIT_CODE -ne 0 ]; then
    cat runtime_error.txt
    exit 20
fi

# Success
cat output.txt
