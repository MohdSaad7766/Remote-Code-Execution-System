# Use official Node.js LTS image
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy runner script
COPY run.sh /run.sh
RUN chmod +x /run.sh

# Default command
CMD ["/run.sh"]
