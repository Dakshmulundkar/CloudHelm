# CloudHelm Deployment Guide

This guide covers deploying CloudHelm to production using Render (backend) and Netlify/Vercel (frontend).

## Architecture

- **Backend**: Render (FastAPI)
- **Frontend**: Netlify or Vercel (React/Vite)
- **Database**: Neon PostgreSQL (already configured)

---

## Prerequisites

1. GitHub account with CloudHelm repository
2. Neon database (already set up)
3. Render account (free tier available)
4. Netlify or Vercel account (free tier available)
5. OAuth credentials (GitHub, Google)
6. API keys (Gemini, Mistral) - optional

---

## Part 1: Deploy Backend to Render

### Step 1: Create Render Account

1. Go to [https://render.com](https://render.com)
2. Sign up with GitHub
3. Authorize Render to access your repositories

### Step 2: Create Web Service

1. Click "New +" → "Web Service"
2. Connect your GitHub repository: `Dakshmulundkar/CloudHelm`
3. Configure the service:
   - **Name**: `cloudhelm-api`
   - **Region**: Oregon (US West) or closest to you
   - **Branch**: `main`
   - **Root Directory**: Leave empty
   - **Runtime**: `Docker`
   - **Dockerfile Path**: `./backend/Dockerfile`
   - **Docker Context**: `.` (project root)
   - **Plan**: Free

### Step 3: Configure Environment Variables

In Render dashboard, add these environment variables:

**Required:**
```
DATABASE_URL=postgresql+psycopg://username:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require
FRONTEND_ORIGIN=https://your-frontend-url.netlify.app
JWT_SECRET=your-super-secret-key-min-32-characters-long
JWT_ALGORITHM=HS256
JWT_ACCESS_TOKEN_EXPIRES_MINUTES=60
APP_ENV=production
APP_HOST=0.0.0.0
APP_PORT=10000
```

**OAuth (Required):**
```
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_REDIRECT_URI=https://your-backend-url.onrender.com/auth/github/callback
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=https://your-backend-url.onrender.com/auth/google/callback
```

**Optional (AI Services):**
```
GEMINI_API_KEY=your_gemini_api_key
MISTRAL_API_KEY=your_mistral_api_key
GITHUB_TOKEN=your_github_personal_access_token
```

### Step 4: Deploy

1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes)
3. Note your backend URL: `https://cloudhelm-api.onrender.com`

### Step 5: Run Database Migrations

After first deployment, run migrations using Render Shell:

1. Go to Render dashboard → Your service → Shell
2. Run:
```bash
cd backend
alembic upgrade head
```

Note: With Docker deployment, the container already has the correct Python path configured, so migrations should work without additional setup.

---

## Part 2: Deploy Frontend to Netlify

### Option A: Netlify

#### Step 1: Create Netlify Account

1. Go to [https://netlify.com](https://netlify.com)
2. Sign up with GitHub
3. Authorize Netlify

#### Step 2: Create New Site

1. Click "Add new site" → "Import an existing project"
2. Choose GitHub
3. Select `Dakshmulundkar/CloudHelm`
4. Configure build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
   - **Node version**: 18

#### Step 3: Configure Environment Variables

In Netlify dashboard → Site settings → Environment variables:

```
VITE_API_BASE_URL=https://cloudhelm-api.onrender.com
```

#### Step 4: Deploy

1. Click "Deploy site"
2. Wait for deployment (2-5 minutes)
3. Note your frontend URL: `https://your-site-name.netlify.app`

#### Step 5: Update Backend CORS

Go back to Render and update `FRONTEND_ORIGIN`:
```
FRONTEND_ORIGIN=https://your-site-name.netlify.app
```

### Option B: Vercel

#### Step 1: Create Vercel Account

1. Go to [https://vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Authorize Vercel

#### Step 2: Import Project

1. Click "Add New" → "Project"
2. Import `Dakshmulundkar/CloudHelm`
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

#### Step 3: Configure Environment Variables

Add environment variable:
```
VITE_API_BASE_URL=https://cloudhelm-api.onrender.com
```

#### Step 4: Deploy

1. Click "Deploy"
2. Wait for deployment (2-5 minutes)
3. Note your URL: `https://your-project.vercel.app`

#### Step 5: Update Backend CORS

Update Render `FRONTEND_ORIGIN`:
```
FRONTEND_ORIGIN=https://your-project.vercel.app
```

---

## Part 3: Update OAuth Redirect URIs

### GitHub OAuth

1. Go to https://github.com/settings/developers
2. Edit your OAuth App
3. Update URLs:
   - **Homepage URL**: `https://your-frontend-url`
   - **Authorization callback URL**: `https://cloudhelm-api.onrender.com/auth/github/callback`

### Google OAuth

1. Go to https://console.cloud.google.com/
2. Navigate to "APIs & Services" → "Credentials"
3. Edit OAuth 2.0 Client ID
4. Update:
   - **Authorized JavaScript origins**: `https://your-frontend-url`
   - **Authorized redirect URIs**: `https://cloudhelm-api.onrender.com/auth/google/callback`

---

## Part 4: Verify Deployment

### Test Backend

1. Visit: `https://cloudhelm-api.onrender.com/health`
2. Should return: `{"status":"healthy","environment":"production"}`
3. Visit: `https://cloudhelm-api.onrender.com/docs`
4. Should show Swagger UI

### Test Frontend

1. Visit: `https://your-frontend-url`
2. Should load the landing page
3. Try logging in with GitHub/Google
4. Navigate through all pages

### Test Features

- ✅ Authentication (GitHub/Google)
- ✅ Cost Dashboard
- ✅ Resource Efficiency
- ✅ Application Health
- ✅ Incidents
- ✅ Releases
- ✅ CloudHelm Assistant

---

## Troubleshooting

### Backend Issues

**Problem**: 502 Bad Gateway

**Solution**:
- Check Render logs for errors
- Verify all environment variables are set
- Ensure database connection string is correct
- Check if migrations ran successfully

**Problem**: CORS errors

**Solution**:
- Verify `FRONTEND_ORIGIN` matches your frontend URL exactly
- No trailing slash in URL
- Redeploy backend after changing CORS settings

**Problem**: Database connection failed

**Solution**:
- Verify Neon database is active
- Check connection string format: `postgresql+psycopg://...?sslmode=require`
- Ensure `+psycopg` is in the URL
- Test connection from Render shell

### Frontend Issues

**Problem**: API calls fail

**Solution**:
- Verify `VITE_API_BASE_URL` is set correctly
- Check backend is running and accessible
- Verify CORS is configured properly
- Check browser console for errors

**Problem**: OAuth redirect fails

**Solution**:
- Verify OAuth redirect URIs match exactly
- Check OAuth credentials are correct
- Ensure callback URLs use HTTPS
- Clear browser cookies and try again

**Problem**: Build fails

**Solution**:
- Check Node version is 18+
- Verify all dependencies are in package.json
- Check build logs for specific errors
- Try building locally first

---

## Environment Variables Reference

### Backend (Render)

| Variable | Required | Description |
|----------|----------|-------------|
| DATABASE_URL | Yes | Neon PostgreSQL connection string |
| FRONTEND_ORIGIN | Yes | Frontend URL for CORS |
| JWT_SECRET | Yes | Secret key for JWT tokens (min 32 chars) |
| JWT_ALGORITHM | Yes | JWT algorithm (HS256) |
| JWT_ACCESS_TOKEN_EXPIRES_MINUTES | Yes | Token expiration (60) |
| APP_ENV | Yes | Environment (production) |
| APP_HOST | Yes | Host (0.0.0.0) |
| APP_PORT | Yes | Port ($PORT for Render) |
| GITHUB_CLIENT_ID | Yes | GitHub OAuth client ID |
| GITHUB_CLIENT_SECRET | Yes | GitHub OAuth client secret |
| GITHUB_REDIRECT_URI | Yes | GitHub OAuth callback URL |
| GOOGLE_CLIENT_ID | Yes | Google OAuth client ID |
| GOOGLE_CLIENT_SECRET | Yes | Google OAuth client secret |
| GOOGLE_REDIRECT_URI | Yes | Google OAuth callback URL |
| GEMINI_API_KEY | No | Gemini AI API key |
| MISTRAL_API_KEY | No | Mistral AI API key |
| GITHUB_TOKEN | No | GitHub personal access token |

### Frontend (Netlify/Vercel)

| Variable | Required | Description |
|----------|----------|-------------|
| VITE_API_BASE_URL | Yes | Backend API URL |

---

## Custom Domain (Optional)

### Netlify

1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Follow DNS configuration instructions
4. Update `FRONTEND_ORIGIN` in Render

### Vercel

1. Go to Project settings → Domains
2. Add your custom domain
3. Configure DNS records
4. Update `FRONTEND_ORIGIN` in Render

### Render

1. Go to Service → Settings → Custom Domain
2. Add your custom domain
3. Configure DNS records
4. Update OAuth redirect URIs

---

## Monitoring

### Render

- View logs: Dashboard → Logs
- Monitor metrics: Dashboard → Metrics
- Set up alerts: Dashboard → Notifications

### Netlify/Vercel

- View build logs: Deployments → Build logs
- Monitor analytics: Analytics dashboard
- Set up notifications: Team settings

---

## Costs

### Free Tier Limits

**Render (Free)**
- 750 hours/month
- Sleeps after 15 min inactivity
- 512 MB RAM
- Shared CPU

**Netlify (Free)**
- 100 GB bandwidth/month
- 300 build minutes/month
- Unlimited sites

**Vercel (Free)**
- 100 GB bandwidth/month
- 6000 build minutes/month
- Unlimited deployments

**Neon (Free)**
- 0.5 GB storage
- 1 project
- Unlimited queries

**Total Monthly Cost: $0** ✨

### Paid Plans (Optional)

**Render Starter**: $7/month
- No sleep
- 1 GB RAM
- Dedicated CPU

**Netlify Pro**: $19/month
- 400 GB bandwidth
- 1000 build minutes

**Vercel Pro**: $20/month
- 1 TB bandwidth
- Unlimited build minutes

---

## Continuous Deployment

Both Render and Netlify/Vercel support automatic deployments:

1. Push to `main` branch
2. Automatic build and deploy
3. Zero downtime deployments
4. Rollback capability

---

## Security Checklist

- ✅ All API keys in environment variables
- ✅ HTTPS enabled (automatic)
- ✅ CORS properly configured
- ✅ OAuth redirect URIs use HTTPS
- ✅ Database uses SSL (Neon default)
- ✅ JWT secret is strong (32+ chars)
- ✅ Security headers configured
- ✅ No secrets in code or logs

---

## Support

For deployment issues:
- Render: https://render.com/docs
- Netlify: https://docs.netlify.com
- Vercel: https://vercel.com/docs
- Neon: https://neon.tech/docs

For CloudHelm issues:
- GitHub: https://github.com/Dakshmulundkar/CloudHelm/issues
