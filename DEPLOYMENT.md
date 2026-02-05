# Deployment Guide

## Backend Deployment (Railway)

The backend API is configured for Railway deployment.

### Railway Deployment Steps:

1. **Connect to Railway:**
   ```bash
   railway login
   ```

2. **Link to project (if exists) or create new:**
   ```bash
   railway link
   # OR
   railway init
   ```

3. **Set environment variables:**
   ```bash
   railway variables set ALLOWED_ORIGINS="https://your-frontend-url.vercel.app"
   ```

4. **Deploy:**
   ```bash
   cd backend
   railway up
   ```

5. **Get your Railway URL:**
   ```bash
   railway domain
   ```

The backend will be available at: `https://your-project.railway.app`

## Frontend Deployment (Vercel)

The frontend is a Next.js app configured for Vercel deployment.

### Vercel Deployment Steps:

1. **Install Vercel CLI (if not installed):**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy from frontend directory:**
   ```bash
   cd frontend
   vercel
   ```

4. **Set environment variable:**
   - Go to Vercel dashboard
   - Select your project
   - Go to Settings → Environment Variables
   - Add: `NEXT_PUBLIC_API_URL` = `https://your-backend.railway.app`

5. **Redeploy with environment variables:**
   ```bash
   vercel --prod
   ```

## Automatic Deployments

Both services support automatic deployments:

- **Vercel**: Automatically deploys on push to main branch (connect GitHub repo in Vercel dashboard)
- **Railway**: Automatically deploys on push to main branch (connect GitHub repo in Railway dashboard)

## Environment Variables

### Backend (Railway):
- `ALLOWED_ORIGINS`: Comma-separated list of allowed origins (e.g., "https://your-app.vercel.app,http://localhost:3000")
- `PORT`: Automatically set by Railway

### Frontend (Vercel):
- `NEXT_PUBLIC_API_URL`: Your backend API URL from Railway (e.g., "https://your-backend.railway.app")

## Quick Deploy Links

- **Vercel**: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/calebnewtonusc/la-healthcare-access-mapping)
- **Railway**: [![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/calebnewtonusc/la-healthcare-access-mapping)

## Health Checks

- Backend health: `https://your-backend.railway.app/health`
- Frontend: `https://your-app.vercel.app`

## Monitoring

- **Backend logs**: `railway logs` in backend directory
- **Frontend logs**: Vercel dashboard → Deployments → View Logs
