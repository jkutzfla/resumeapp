# Overview
Josh Kutz-Flamenbaum - Demo App - Prompt UI for Resume Optimization

[![Docker Image CI](https://github.com/jkutzfla/resumeapp/actions/workflows/docker-image.yml/badge.svg)](https://github.com/jkutzfla/resumeapp/actions/workflows/docker-image.yml)

# Frontend
React

# Backend
Express

# Dev
run the backend express locally, frontend vite dev with proxy

# Deploy
container app on Azure, script in /infra



# Docker
docker build -t my-node-app:v1 .

docker run -p 3003:3003  --rm --name my-resume-app my-node-app:v1 
