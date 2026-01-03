### Cloud Run Deployment Guide
Overview
This guide documents the complete process for deploying applications (Next.js frontend or NestJS backend) to Google Cloud Run, based on our successful deployment experience.
Documentation Structure
Prerequisites Section
Required tools (Docker, Google Cloud SDK)
GCP project setup
Authentication steps
Project Preparation
Creating .dockerignore file
Configuring build settings (Next.js standalone or NestJS production)
Creating multi-stage Dockerfile
Local Testing
Building Docker image locally
Testing container before deployment
Verifying architecture compatibility
Google Cloud Setup
Installing Google Cloud SDK
Authentication and project configuration
Enabling required APIs
Image Build and Push
Building for correct architecture (linux/amd64)
Tagging images for GCR
Pushing to Google Container Registry
Cloud Run Deployment
Deploying service with correct configuration
Setting environment variables
Configuring ports and resources
Troubleshooting
Common errors and solutions
Architecture mismatch issues
Health check failures
Log viewing and debugging
Best Practices
Security considerations
Environment variable management
CI/CD integration tips
Performance optimization
Quick Reference
Command cheat sheet
Common deployment scenarios
Next steps after deployment