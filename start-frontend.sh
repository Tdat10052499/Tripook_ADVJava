#!/bin/bash
echo "Starting Tripook Frontend..."
npm install
npm run build
echo "Frontend built successfully!"
echo "To run development server, use: npm run start-dev"