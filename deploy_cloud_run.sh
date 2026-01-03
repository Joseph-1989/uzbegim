#!/bin/bash

# Configuration
PROJECT_ID="optical-habitat-478204-p3" # Derived from user context/screenshots
APP_NAME="uzbegim"
REGION="europe-west1" # Matching HomeCareExperts region

echo "Deploying $APP_NAME to Google Cloud Run (Project: $PROJECT_ID, Region: $REGION)..."

# Add common Homebrew path for gcloud if not in PATH
export PATH="/opt/homebrew/share/google-cloud-sdk/bin:$PATH"

# Check for gcloud
if ! command -v gcloud &> /dev/null; then
    echo "Error: 'gcloud' command not found."
    echo "It seems the Google Cloud SDK is not in your PATH and could not be found in standard locations."
    echo "Please ensure it is installed: brew install --cask google-cloud-sdk"
    exit 1
fi

# Check for authentication
# Check for authentication (checking for active account)
if [[ -z $(gcloud auth list --filter=status:ACTIVE --format="value(account)") ]]; then
    echo "You are not authenticated with Google Cloud."
    echo "Initiating login sequence..."
    gcloud auth login
    
    if [ $? -ne 0 ]; then
        echo "Login failed. Exiting."
        exit 1
    fi
fi

# Build the image using Cloud Build (recommended for Cloud Run)
# This avoids needing local Docker setup and pushes directly to GCR/Artifact Registry
echo "Building container image..."
gcloud builds submit --tag gcr.io/$PROJECT_ID/$APP_NAME --project $PROJECT_ID

# Deploy to Cloud Run with environment variables
echo "Deploying to Cloud Run..."
gcloud run deploy $APP_NAME \
  --image gcr.io/$PROJECT_ID/$APP_NAME \
  --platform managed \
  --region $REGION \
  --project $PROJECT_ID \
  --allow-unauthenticated \
  --port 3003 \
  --set-env-vars "MONGO_URL=mongodb+srv://akmalkhasanov1989:Yusufbek011216@joseph0.aio4fkj.mongodb.net/Burak,SESSION_SECRET=secret-key,SECRET_TOKEN=wqedihji4444sdfasdasdf123123!@,NODE_ENV=production"

echo "Deployment complete!"
