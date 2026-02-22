# CloudHelm Deployment Checklist

Use this checklist to ensure a smooth deployment.

## Pre-Deployment

### Database
- [ ] Neon database created and active
- [ ] Connection string copied (with `+psycopg` and `?sslmode=require`)
- [ ] Database accessible from internet

### OAuth Setup
- [ ] GitHub OAuth app created
- [ ] Google OAuth app created (optional)
- [ ] OAuth credentials saved securely

### API Keys (Optional)
- [ ] Gemini API key obtained
- [ ] Mistral API key obtained
- [ ] GitHub personal access token created

### Repository
- [ ] Code pushed to GitHub
- [ ] All changes committed
- [ ] `.env` files not committed (check `.gitignore`)

## Backend Deployment (Render)

### Setup
- [ ] Render account created
- [ ] GitHub repository connected
- [ ] Web service created

### Configuration
- [ ] Build command: `cd backend && pip install -r requirements.txt`
- [ ] Start command: `cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT`
- [ ] Python version: 3.12
- [ ] Region selected

### Environment Variables
- [ ] `DATABASE_URL` set
- [ ] `FRONTEND_ORIGIN` set (will update after frontend deploy)
- [ ] `JWT_SECRET` generated (min 32 chars)
- [ ] `JWT_ALGORITHM` = HS256
- [ ] `JWT_ACCESS_TOKEN_EXPIRES_MINUTES` = 60
- [ ] `APP_ENV` = production
- [ ] `APP_HOST` = 0.0.0.0
- [ ] `APP_PORT` = 10000
- [ ] `GITHUB_CLIENT_ID` set
- [ ] `GITHUB_CLIENT_SECRET` set
- [ ] `GITHUB_REDIRECT_URI` set (use Render URL)
- [ ] `GOOGLE_CLIENT_ID` set
- [ ] `GOOGLE_CLIENT_SECRET` set
- [ ] `GOOGLE_REDIRECT_URI` set (use Render URL)
- [ ] `GEMINI_API_KEY` set (optional)
- [ ] `MISTRAL_API_KEY` set (optional)
- [ ] `GITHUB_TOKEN` set (optional)

### Deployment
- [ ] Service deployed successfully
- [ ] Backend URL noted: `https://cloudhelm-api.onrender.com`
- [ ] Health check works: `/health`
- [ ] API docs accessible: `/docs`

### Database Migrations
- [ ] Migrations run via Render shell: `cd backend && alembic upgrade head`
- [ ] No migration errors in logs

## Frontend Deployment (Netlify/Vercel)

### Netlify Setup
- [ ] Netlify account created
- [ ] GitHub repository connected
- [ ] Site created

### Netlify Configuration
- [ ] Base directory: `frontend`
- [ ] Build command: `npm run build`
- [ ] Publish directory: `frontend/dist`
- [ ] Node version: 18

### Vercel Setup (Alternative)
- [ ] Vercel account created
- [ ] GitHub repository imported
- [ ] Project created

### Vercel Configuration (Alternative)
- [ ] Framework: Vite
- [ ] Root directory: `frontend`
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`

### Environment Variables
- [ ] `VITE_API_BASE_URL` set to Render backend URL

### Deployment
- [ ] Site deployed successfully
- [ ] Frontend URL noted: `https://your-site.netlify.app` or `https://your-project.vercel.app`
- [ ] Site loads correctly
- [ ] No console errors

## Post-Deployment

### Update Backend CORS
- [ ] Go to Render dashboard
- [ ] Update `FRONTEND_ORIGIN` with actual frontend URL
- [ ] Redeploy backend

### Update OAuth Redirect URIs

#### GitHub OAuth
- [ ] Go to https://github.com/settings/developers
- [ ] Update Homepage URL to frontend URL
- [ ] Update Authorization callback URL to backend URL + `/auth/github/callback`
- [ ] Save changes

#### Google OAuth
- [ ] Go to https://console.cloud.google.com/
- [ ] Update Authorized JavaScript origins to frontend URL
- [ ] Update Authorized redirect URIs to backend URL + `/auth/google/callback`
- [ ] Save changes

### Testing

#### Backend Tests
- [ ] Health check: `https://your-backend.onrender.com/health`
- [ ] API docs: `https://your-backend.onrender.com/docs`
- [ ] CORS working (no errors in browser console)

#### Frontend Tests
- [ ] Landing page loads
- [ ] Login with GitHub works
- [ ] Login with Google works (if configured)
- [ ] All pages accessible
- [ ] No console errors

#### Feature Tests
- [ ] Cost Dashboard loads data
- [ ] Resource Efficiency works
- [ ] Application Health displays
- [ ] Incidents page works
- [ ] Releases page works
- [ ] CloudHelm Assistant opens
- [ ] CLI commands work (`/help`, `/test`, etc.)

### Monitoring
- [ ] Render logs checked for errors
- [ ] Netlify/Vercel build logs reviewed
- [ ] Database connection verified
- [ ] API response times acceptable

## Optional Enhancements

### Custom Domain
- [ ] Domain purchased
- [ ] DNS configured for frontend
- [ ] DNS configured for backend
- [ ] SSL certificates active
- [ ] OAuth redirect URIs updated with custom domain
- [ ] `FRONTEND_ORIGIN` updated with custom domain

### Monitoring & Alerts
- [ ] Render notifications configured
- [ ] Netlify/Vercel notifications configured
- [ ] Uptime monitoring set up (e.g., UptimeRobot)
- [ ] Error tracking configured (e.g., Sentry)

### Performance
- [ ] Frontend build optimized
- [ ] Images optimized
- [ ] Caching configured
- [ ] CDN enabled (automatic with Netlify/Vercel)

## Troubleshooting

If something doesn't work:

1. **Check Logs**
   - Render: Dashboard → Logs
   - Netlify/Vercel: Deployments → Build logs
   - Browser: Console (F12)

2. **Verify Environment Variables**
   - All required variables set
   - No typos in variable names
   - URLs don't have trailing slashes
   - Secrets are correct

3. **Test Connections**
   - Database accessible
   - Backend responds to health check
   - Frontend can reach backend
   - OAuth redirects work

4. **Common Issues**
   - CORS errors → Check `FRONTEND_ORIGIN`
   - 502 errors → Check backend logs
   - OAuth fails → Check redirect URIs
   - Build fails → Check Node/Python versions

## Success Criteria

✅ Backend deployed and accessible
✅ Frontend deployed and accessible
✅ Database connected and migrations run
✅ Authentication works (GitHub/Google)
✅ All pages load without errors
✅ API calls succeed
✅ CloudHelm Assistant works
✅ No console errors
✅ No CORS errors

## Deployment Complete! 🎉

Your CloudHelm platform is now live and ready to use!

**URLs:**
- Frontend: `https://your-site.netlify.app`
- Backend: `https://cloudhelm-api.onrender.com`
- API Docs: `https://cloudhelm-api.onrender.com/docs`

**Next Steps:**
1. Share with your team
2. Monitor usage and performance
3. Set up custom domain (optional)
4. Configure monitoring and alerts
5. Plan feature enhancements
