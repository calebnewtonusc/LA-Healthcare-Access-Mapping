# Quick Deployment Guide

## 🚀 One-Click Deploy

### Option 1: Deploy via GitHub (Recommended)

1. **Fork or Push this repository to GitHub**
   ```bash
   git push origin main
   ```

2. **Deploy Backend to Render**
   - Go to [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Render will automatically detect `render.yaml` and deploy
   - Note your backend URL: `https://la-healthcare-api.onrender.com`

3. **Deploy Frontend to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Connect your GitHub repository
   - Set Root Directory: `frontend`
   - Add Environment Variable:
     - Name: `NEXT_PUBLIC_API_URL`
     - Value: `https://la-healthcare-api.onrender.com` (your Render URL)
   - Deploy!

### Option 2: Deploy via CLI

**Backend (Render):**
```bash
# Install Render CLI
npm install -g render-cli

# Deploy
cd backend
render deploy
```

**Frontend (Vercel):**
```bash
cd frontend
vercel --prod
```

## 🔧 Manual Configuration

### Backend Environment Variables (Render)
```
ALLOWED_ORIGINS=https://your-frontend.vercel.app,http://localhost:3000
PYTHON_VERSION=3.11.0
```

### Frontend Environment Variables (Vercel)
```
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
```

## ✅ Verify Deployment

- Backend Health: https://your-backend.onrender.com/health
- Frontend: https://your-frontend.vercel.app
- API Stats: https://your-backend.onrender.com/api/stats

## 🔄 Automatic Deployments

Both Render and Vercel support automatic deployments:
- Push to `main` branch → Automatic deployment
- Pull requests → Preview deployments

## 📊 Current Deployment

**Production URLs:**
- Frontend: https://frontend-eta-one-bcbtvb58hh.vercel.app
- Backend: Deploy via Render.com using instructions above

## 🆘 Troubleshooting

**Frontend shows "Connection Refused":**
- Check that `NEXT_PUBLIC_API_URL` environment variable is set correctly
- Verify backend is deployed and healthy
- Check CORS settings in backend `main.py`

**Backend fails to start:**
- Verify all files in `outputs/policy_recommendations/` exist
- Check Python version (3.11 required)
- Review logs in Render dashboard

**Maps not loading:**
- Backend must serve HTML files from `outputs/` directory
- Check that analysis has been run: `python -m impact.generate_all_outputs`
