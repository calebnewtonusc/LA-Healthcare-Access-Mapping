# Deployment Guide

This guide walks you through deploying the LA Healthcare Access Mapping web application.

## Architecture Overview

```
Frontend (Vercel)          Backend (Railway)          GitHub Actions
     │                           │                          │
     │                           │                          │
Next.js Dashboard  ────────►  FastAPI Server  ◄────────  Monthly Updates
     │                           │                          │
     │                           │                          │
  User Browser              Analysis Outputs           Auto-commit
```

## Prerequisites

- GitHub account
- Vercel account (free tier)
- Railway account (or Render.com)
- Git installed locally

## Step 1: Push to GitHub

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: LA Healthcare Access Mapping"

# Create GitHub repository (via GitHub UI or CLI)
gh repo create la-healthcare-access-mapping --public --source=. --remote=origin

# Push to GitHub
git push -u origin main
```

## Step 2: Deploy Backend to Railway

### Option A: Via Railway Dashboard

1. Go to [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select `la-healthcare-access-mapping` repository
4. Configure:
   - **Root Directory**: `backend`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Health Check Path**: `/health`
5. Add environment variables (if needed):
   - `ALLOWED_ORIGINS`: Your Vercel domain (set after frontend deployment)
6. Click "Deploy"
7. Wait for deployment (2-3 minutes)
8. Copy the generated URL (e.g., `https://your-app.up.railway.app`)

### Option B: Via Railway CLI

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Initialize project
cd backend
railway init

# Deploy
railway up

# Get the URL
railway domain
```

### Alternative: Deploy to Render.com

1. Go to [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect GitHub repository
4. Configure:
   - **Name**: `la-healthcare-backend`
   - **Root Directory**: `backend`
   - **Environment**: Python 3.11
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Click "Create Web Service"
6. Copy the generated URL

## Step 3: Deploy Frontend to Vercel

### Option A: Via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Import `la-healthcare-access-mapping` repository
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
5. Add Environment Variables:
   - `NEXT_PUBLIC_API_URL`: Your Railway backend URL (from Step 2)
6. Click "Deploy"
7. Wait for deployment (2-3 minutes)
8. Visit your live site at `https://your-project.vercel.app`

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from frontend directory
cd frontend
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? la-healthcare-access-mapping
# - Directory? ./
# - Override settings? No

# Add environment variable
vercel env add NEXT_PUBLIC_API_URL

# Production deployment
vercel --prod
```

## Step 4: Update Backend CORS

After deploying the frontend, update your backend's allowed origins:

### Railway

1. Go to your Railway project
2. Click "Variables"
3. Add/update `ALLOWED_ORIGINS`:
   ```
   https://your-project.vercel.app,https://*.vercel.app
   ```
4. Redeploy the service

### Render

1. Go to your Render service
2. Click "Environment"
3. Add environment variable `ALLOWED_ORIGINS`
4. Service will automatically redeploy

## Step 5: Test the Deployment

1. Visit your Vercel frontend URL
2. Check that the dashboard loads
3. Verify all data displays correctly:
   - Key metrics cards
   - Recommendations list
   - Facility map (iframe should load)
   - Cost-benefit analysis

4. Test API endpoints directly:
   ```bash
   curl https://your-backend.railway.app/api/stats
   curl https://your-backend.railway.app/api/recommendations
   curl https://your-backend.railway.app/api/facilities
   ```

## Step 6: Enable GitHub Actions (Optional)

The repository includes a GitHub Actions workflow for monthly automated updates.

### Enable Workflow

1. Go to your GitHub repository
2. Click "Actions" tab
3. Enable workflows if prompted
4. The workflow will run:
   - **Automatically**: Monthly on the 1st at 2am UTC
   - **Manually**: Click "Run workflow" button

### Test Manual Run

1. Go to Actions tab
2. Select "Update Healthcare Analysis"
3. Click "Run workflow" → "Run workflow"
4. Monitor the run (takes ~5-10 minutes)
5. Check that outputs/ directory was updated

### Workflow Permissions

If the workflow fails to push commits:

1. Go to Settings → Actions → General
2. Scroll to "Workflow permissions"
3. Select "Read and write permissions"
4. Check "Allow GitHub Actions to create and approve pull requests"
5. Click "Save"

## Step 7: Set Up Custom Domain (Optional)

### Vercel

1. Go to your Vercel project
2. Click "Settings" → "Domains"
3. Add your custom domain (e.g., `healthcare-la.org`)
4. Follow DNS configuration instructions
5. Wait for SSL certificate (automatic)

### Railway

1. Go to your Railway project
2. Click "Settings" → "Domains"
3. Add custom domain
4. Update DNS records as instructed

## Local Development

### Backend

```bash
cd backend

# Install dependencies
pip install -r requirements.txt
pip install -e ..

# Run development server
uvicorn main:app --reload --port 8000

# Visit http://localhost:8000/docs for API documentation
```

### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Create .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local

# Run development server
npm run dev

# Visit http://localhost:3000
```

### Run Both Concurrently

```bash
# Terminal 1
cd backend && uvicorn main:app --reload

# Terminal 2
cd frontend && npm run dev
```

## Monitoring and Maintenance

### View Logs

**Railway**:
- Go to project → "Deployments" → Click latest deployment
- View logs in real-time

**Vercel**:
- Go to project → "Deployments" → Click latest deployment
- View build and function logs

### Monitoring

Consider adding:
- **Sentry** for error tracking
- **Vercel Analytics** for usage stats
- **Uptime monitoring** (UptimeRobot, Better Uptime)

### Update Data

**Manual Update**:
1. Go to GitHub Actions
2. Run "Update Healthcare Analysis" workflow

**Automatic Update**:
- Runs monthly automatically
- Check Actions tab for status

## Troubleshooting

### Frontend: "Failed to fetch data"

- Check that `NEXT_PUBLIC_API_URL` environment variable is set correctly
- Verify backend is running and accessible
- Check browser console for CORS errors

### Backend: CORS errors

- Add Vercel domain to `ALLOWED_ORIGINS` in Railway environment variables
- Format: `https://your-project.vercel.app,https://*.vercel.app`

### GitHub Actions: Permission denied on push

- Enable "Read and write permissions" in Settings → Actions → General

### Maps not loading

- Check that backend `/api/maps/facility-locations` endpoint returns HTML
- Verify iframe src URL is correct
- Check browser console for CSP errors

## Cost Estimates

- **GitHub**: Free (public repository)
- **Vercel**: Free tier (sufficient for this project)
  - 100 GB bandwidth
  - Unlimited deployments
- **Railway**: ~$5-10/month
  - Pay-as-you-go
  - $5 free credit monthly
  - Alternative: Render.com free tier (with cold starts)
- **GitHub Actions**: Free (2000 minutes/month for public repos)

**Total Monthly Cost**: $0-10 (depending on backend choice)

## Next Steps

After successful deployment:

1. Add authentication for admin endpoints
2. Set up monitoring and alerts
3. Add user analytics (optional)
4. Create "About" and "Methodology" pages
5. Add SEO metadata
6. Set up error tracking (Sentry)

## Support

For issues or questions:
- Check GitHub Issues
- Review API documentation at `/docs` endpoint
- Contact project maintainers
