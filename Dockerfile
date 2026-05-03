# Use an official lightweight Python image
FROM python:3.12-slim

# Set working directory
WORKDIR /app

# Copy and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy all project files
COPY . .

# Expose port 8080 (Cloud Run default)
EXPOSE 8080

# Use $PORT environment variable
ENV PORT 8080

# Run the FastAPI app via uvicorn
CMD uvicorn backend.main:app --host 0.0.0.0 --port $PORT
