# Render Deployment Steps - Docker Container Approach

## Step 1: Delete Current Service (if exists)
1. Go to your Render dashboard
2. Delete the existing `cloudhelm-api` service if it exists
3. This will give us a fresh start

## Step 2: Create New Web Service with Docker
1. Click "New +" → "Web Service"
2. Connect your GitHub repository: `Dakshmulundkar/CloudHelm`
3. Fill in these settings:

### Basic Settings:
- **Name:** `cloudhelm-api`
- **Region:** `Oregon` (or Singapore if you prefer)
- **Branch:** `main`
- **Runtime:** `Docker`

### Build & Deploy Settings:
- **Root Directory:** (leave empty)
- **Dockerfile Path:** `./backend/Dockerfile`
- **Docker Context:** `.` (project root)
- **Docker Build Arguments:** (leave empty)

### Environment Variables:
Add these environment variables in Render:

```
APP_ENV=production
DATABASE_URL=postgresql+psycopg://neondb_owner:npg_qUx7AXyGg5dr@ep-super-heart-ai1gyx35-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require
JWT_SECRET=dcf6281977ee4d511be409e457b1a6f488664df48a7d1fe9d3985d3c400675f9
JWT_ALGORITHM=HS256
JWT_ACCESS_TOKEN_EXPIRES_MINUTES=60
GITHUB_CLIENT_ID=Ov23liUfDwM7LW8KkJKY
GITHUB_CLIENT_SECRET=99bf31cf0b9f3e6d8dd5bc0aa29f2d81d598123d
GITHUB_REDIRECT_URI=https://cloudhelm.onrender.com/auth/github/callback
GOOGLE_CLIENT_ID=dummy_google_client_id
GOOGLE_CLIENT_SECRET=dummy_google_client_secret
GOOGLE_REDIRECT_URI=https://cloudhelm.onrender.com/auth/google/callback
FRONTEND_ORIGIN=https://cloudhelm.netlify.app
GEMINI_API_KEY=AIzaSyCsxlUuuwBTMZpdM6vAsf597DNQw0E5FuQ
MISTRAL_API_KEY=KXOvkan1EBUGFFXFBqGHuBeSjHnwAIeg
GITHUB_TOKEN=your_github_token_here
```

### Instance Type:
- **Plan:** `Free`

## Step 3: Deploy
1. Click "Create Web Service"
2. Wait for Docker build and deployment to complete
3. The service will be available at: `https://cloudhelm.onrender.com`

## Step 4: Verify Deployment
1. Visit: `https://cloudhelm.onrender.com/health`
2. Should return: `{"status": "healthy", "environment": "production"}`
3. Visit: `https://cloudhelm.onrender.com/docs` to see the API documentation

## Step 5: Update GitHub OAuth (if needed)
If you need to update GitHub OAuth settings:
1. Go to: https://github.com/settings/developers
2. Update your OAuth app:
   - **Homepage URL:** `https://cloudhelm.netlify.app`
   - **Authorization callback URL:** `https://cloudhelm.onrender.com/auth/github/callback`

## Why Docker Container Approach is Better:
- **No import path issues:** Docker handles the Python path correctly
- **Consistent environment:** Same environment locally and in production
- **Better dependency management:** All dependencies are installed in the container
- **Faster deployments:** Docker layer caching speeds up builds
- **More reliable:** Eliminates environment-specific issues

## Advantages over Native Python Deployment:
1. **Eliminates PYTHONPATH issues** that were causing import errors
2. **Consistent Python version** (3.11) across all environments
3. **Better dependency isolation** - no conflicts with system packages
4. **Reproducible builds** - same container works everywhere
5. **Easier debugging** - can test the exact same container locally

## Local Testing (Optional):
To test the Docker container locally before deployment:

```bash
# Build the container
docker build -f backend/Dockerfile -t cloudhelm-backend .

# Run the container
docker run -p 8000:8000 --env-file backend/.env cloudhelm-backend

# Test the health endpoint
curl http://localhost:8000/health
```

## Troubleshooting:
If deployment fails, check the Render logs for:
1. **Docker build errors:** Missing dependencies or Dockerfile issues
2. **Container startup errors:** Environment variable or application issues
3. **Port binding issues:** Ensure the app binds to 0.0.0.0:8000

The Docker approach should resolve all the import path issues we were experiencing with the native Python deployment.