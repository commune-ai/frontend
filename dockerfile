# Use an official Node.js runtime as the base image for the frontend
FROM node:latest AS frontend

# Set the working directory for the frontend
WORKDIR /app/frontend

# Copy package.json and package-lock.json to the working directory
COPY ./frontend/package*.json ./

# Install frontend dependencies
RUN npm install --force

# Copy the rest of the frontend code to the working directory
COPY ./frontend .

# Build the frontend
RUN npm run build

# Use an official Python runtime as the base image for the backend
FROM python:latest AS backend

# Set the working directory for the backend
WORKDIR /app/backend

# Copy requirements.txt to the working directory
COPY ./backend/requirements.txt .

# Install backend dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend code to the working directory
COPY ./backend .

# Use a minimal Python image for the final stage to keep the image size small
FROM python:slim AS final

# Set the working directory for the combined application
WORKDIR /app

# Copy built frontend files from the frontend stage
COPY --from=frontend /app/frontend/build ./frontend/build

# Copy installed Python packages from the backend stage
COPY --from=backend /usr/local/lib/python3.9/site-packages /usr/local/lib/python3.9/site-packages

# Copy the backend code from the backend stage
COPY --from=backend /app/backend .

# Expose the necessary port for the backend
EXPOSE 8000

# Command to run the combined application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
