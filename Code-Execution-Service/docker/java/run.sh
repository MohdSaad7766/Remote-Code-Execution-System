#!/bin/bash

# Compile
javac Main.java 2> compile_error.txt
if [ $? -ne 0 ]; then
  cat compile_error.txt
  exit 10
fi

# Run
timeout 5s java Main < input.txt > output.txt 2> runtime_error.txt
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
