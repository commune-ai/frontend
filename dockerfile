# Use an official Node.js runtime as base image for the frontend
FROM node:latest AS frontend

# Set working directory for the frontend
WORKDIR /app/frontend

# Copy package.json and package-lock.json to the working directory
COPY ./frontend/package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the rest of the frontend code to the working directory
COPY ./frontend .

# Build the frontend
RUN npm run build

# Use an official Python runtime as base image for the backend
FROM python:latest AS backend

# Set working directory for the backend
WORKDIR /app/backend

# Copy requirements.txt to the working directory
COPY ./backend/requirements.txt .

# Install backend dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend code to the working directory
COPY ./backend .

# Expose the ports
EXPOSE 3000 8000

# Use multi-stage build to keep the image small
FROM python:latest

# Set working directory for the combined application
WORKDIR /app

# Copy built frontend files from the frontend stage
COPY --from=frontend /app/frontend/build ./frontend/build

# Copy installed Python packages from the backend stage
COPY --from=backend /usr/local/lib/python3.9/site-packages /usr/local/lib/python3.9/site-packages

# Copy the rest of the backend code to the working directory
COPY --from=backend /app/backend .

# Command to run the combined application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
