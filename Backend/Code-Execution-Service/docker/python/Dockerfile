# Base Python image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy runner script
COPY run.sh /run.sh
RUN chmod +x /run.sh

# Default command
CMD ["/run.sh"]
