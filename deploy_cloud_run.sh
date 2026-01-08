#!/bin/bash

# Configuration
PROJECT_ID="optical-habitat-478204-p3" # Derived from user context/screenshots
APP_NAME="uzbegim"
REGION="europe-west1" # Matching HomeCareExperts region
BUCKET_NAME="uzbegim-product-images"

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

# Create GCS bucket if it doesn't exist
echo "Checking GCS bucket: $BUCKET_NAME..."
if ! gcloud storage buckets describe gs://$BUCKET_NAME --project $PROJECT_ID &> /dev/null; then
    echo "Creating GCS bucket: $BUCKET_NAME..."
    gcloud storage buckets create gs://$BUCKET_NAME \
        --project=$PROJECT_ID \
        --location=$REGION \
        --uniform-bucket-level-access
    
    echo "Making bucket publicly readable..."
    gcloud storage buckets add-iam-policy-binding gs://$BUCKET_NAME \
        --member=allUsers \
        --role=roles/storage.objectViewer \
        --project=$PROJECT_ID
else
    echo "Bucket already exists."
fi

# Configure CORS for the bucket
echo "Configuring CORS for bucket..."
cat > /tmp/cors-config.json <<EOF
[
  {
    "origin": ["*"],
    "method": ["GET", "HEAD"],
    "responseHeader": ["Content-Type"],
    "maxAgeSeconds": 3600
  }
]
EOF

gcloud storage buckets update gs://$BUCKET_NAME --cors-file=/tmp/cors-config.json --project=$PROJECT_ID
rm /tmp/cors-config.json

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
  --set-env-vars "MONGO_URL=mongodb+srv://akmalkhasanov1989:Yusufbek011216@joseph0.aio4fkj.mongodb.net/Burak,SESSION_SECRET=secret-key,SECRET_TOKEN=wqedihji4444sdfasdasdf123123!@,NODE_ENV=production,GCS_BUCKET_NAME=$BUCKET_NAME,GCS_PROJECT_ID=$PROJECT_ID"

echo "Deployment complete!"
echo "Your application is now using Google Cloud Storage for file uploads."
echo "Bucket: gs://$BUCKET_NAME"
