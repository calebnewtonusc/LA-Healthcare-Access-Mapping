# Final Deployment Steps

## ✅ Completed Automatically

1. ✅ **Frontend Dependencies Installed** - All npm packages installed and vulnerabilities fixed
2. ✅ **Git Repository Initialized** - Committed all deployment infrastructure
3. ✅ **Deployment Files Created** - Backend API, Frontend app, GitHub Actions workflow

## 🚀 Next Steps (Manual)

### Step 1: Push to GitHub (5 minutes)

Your code is committed locally. Now push it to GitHub:

```bash
# Navigate to project
cd /Users/joelnewton/Desktop/2026-Code/Projects/la-healthcare-access-mapping

# Authenticate with GitHub CLI
gh auth login
# Follow prompts:
# - Select "GitHub.com"
# - Select "Login with a web browser"
# - Copy the code and press Enter
# - Authorize in browser

# Create public GitHub repository
gh repo create la-healthcare-access-mapping --public --source=. --remote=origin --push

# This will:
# - Create repo on GitHub
# - Add it as remote "origin"
# - Push your main branch
```

**Alternative (without gh CLI)**:
```bash
# 1. Go to github.com and create a new repository named "la-healthcare-access-mapping"
# 2. Set it to Public
# 3. Don't initialize with README (you already have one)
# 4. Copy the repository URL
# 5. Run these commands:

git remote add origin https://github.com/YOUR_USERNAME/la-healthcare-access-mapping.git
git push -u origin main
```

---

### Step 2: Deploy Backend to Railway (10 minutes)

1. **Sign up for Railway**
   - Go to [railway.app](https://railway.app)
   - Click "Login with GitHub"
   - Authorize Railway

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose `la-healthcare-access-mapping`
   - Railway will auto-detect Python

3. **Configure Backend**
   - Click "Settings"
   - Set **Root Directory**: `backend`
   - Set **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - Set **Health Check Path**: `/health`
   - Click "Deploy"

4. **Get Backend URL**
   - Go to "Settings" → "Domains"
   - Click "Generate Domain"
   - Copy the URL (e.g., `https://your-backend.up.railway.app`)
   - **Save this URL - you'll need it for the frontend!**

5. **Test Backend**
   ```bash
   # Replace with your Railway URL
   curl https://your-backend.up.railway.app/health
   # Should return: {"status":"healthy"}

   curl https://your-backend.up.railway.app/api/stats
   # Should return JSON with statistics
   ```

**Alternative: Deploy to Render.com (Free)**
1. Go to [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect GitHub repository
4. Configure:
   - Name: `la-healthcare-backend`
   - Root Directory: `backend`
   - Environment: Python 3.11
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Click "Create Web Service"
6. Copy the generated URL

---

### Step 3: Deploy Frontend to Vercel (10 minutes)

1. **Sign up for Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Sign Up" → "Continue with GitHub"
   - Authorize Vercel

2. **Import Project**
   - Click "Add New..." → "Project"
   - Find and import `la-healthcare-access-mapping`
   - Vercel will auto-detect Next.js

3. **Configure Frontend**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

4. **Add Environment Variable**
   - Click "Environment Variables"
   - Add variable:
     - **Name**: `NEXT_PUBLIC_API_URL`
     - **Value**: Your Railway backend URL (from Step 2)
     - **Example**: `https://your-backend.up.railway.app`
   - Click "Add"

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build
   - Vercel will provide your live URL

6. **Copy Frontend URL**
   - Your site is live at: `https://your-project.vercel.app`
   - Click the URL to visit your dashboard!

---

### Step 4: Update Backend CORS (5 minutes)

Now that you have your Vercel URL, update the backend to allow requests from it:

1. **Go to Railway Dashboard**
   - Select your backend service
   - Click "Variables"

2. **Add Environment Variable**
   - Click "New Variable"
   - Name: `ALLOWED_ORIGINS`
   - Value: `https://your-project.vercel.app,https://*.vercel.app,http://localhost:3000`
   - (Replace `your-project` with your actual Vercel domain)

3. **Redeploy**
   - Railway will automatically redeploy with new settings
   - Wait ~1 minute

---

### Step 5: Update README URLs (2 minutes)

Update the placeholder URLs in your README:

```bash
cd /Users/joelnewton/Desktop/2026-Code/Projects/la-healthcare-access-mapping

# Edit README.md and replace:
# - Line 15: https://your-project.vercel.app → your actual Vercel URL
# - Line 33: https://your-project.vercel.app → your actual Vercel URL
# - Line 478: https://your-project.vercel.app → your actual Vercel URL

# Commit and push
git add README.md
git commit -m "docs: update README with live deployment URLs"
git push origin main
```

---

### Step 6: Test Everything (5 minutes)

1. **Visit your live dashboard**
   ```
   https://your-project.vercel.app
   ```

2. **Check that everything loads**:
   - ✅ Key metrics cards display numbers
   - ✅ Recommendations list shows 5 policies
   - ✅ Facility map iframe loads (interactive map)
   - ✅ Cost-benefit analysis shows charts
   - ✅ Page is responsive on mobile

3. **Test API endpoints directly**:
   ```bash
   # Replace with your Railway URL
   curl https://your-backend.up.railway.app/api/stats
   curl https://your-backend.up.railway.app/api/recommendations
   curl https://your-backend.up.railway.app/api/facilities
   ```

4. **Check browser console** (F12)
   - No CORS errors
   - No failed requests

---

### Step 7: Enable GitHub Actions (5 minutes)

Set up monthly automated data updates:

1. **Enable Workflow**
   - Go to your GitHub repository
   - Click "Actions" tab
   - Click "I understand my workflows, go ahead and enable them"

2. **Test Manual Run**
   - Click "Update Healthcare Analysis"
   - Click "Run workflow" → "Run workflow"
   - Monitor the run (takes ~5-10 minutes)
   - Check that outputs/ directory was updated

3. **Set Workflow Permissions**
   - Go to Settings → Actions → General
   - Scroll to "Workflow permissions"
   - Select "Read and write permissions"
   - Check "Allow GitHub Actions to create and approve pull requests"
   - Click "Save"

---

## 🎉 You're Done!

Your LA Healthcare Access Mapping dashboard is now live!

### Live URLs

- **Frontend Dashboard**: https://your-project.vercel.app
- **Backend API**: https://your-backend.up.railway.app
- **API Docs**: https://your-backend.up.railway.app/docs
- **GitHub Repo**: https://github.com/YOUR_USERNAME/la-healthcare-access-mapping

### What Happens Next

- 🔄 **Monthly Updates**: GitHub Actions runs on the 1st of each month at 2am UTC
- 📊 **Data Refresh**: Automatically fetches latest census and facility data
- 🔨 **Rebuild**: Regenerates all analysis outputs
- 🚀 **Redeploy**: Commits changes and triggers Vercel rebuild

### Costs

- **GitHub**: Free (public repository)
- **Vercel**: Free tier (100 GB bandwidth/month)
- **Railway**: ~$5-10/month
  - First $5/month free
  - Pay only for usage above that
  - **Alternative**: Use Render.com free tier (with cold starts)

**Total**: $0-10/month

---

## 📱 Share Your Work

Your project is now public! Share it with:

```
🏥 LA Healthcare Access Mapping Dashboard

Interactive web application analyzing healthcare access across LA County.

🔗 https://your-project.vercel.app
📊 Covers 9.9M residents, 2,498 census tracts, 4,512 facilities
💰 $3.5B net benefit, 540% ROI
📍 10 optimal locations for new facilities

Built with Next.js, FastAPI, and Python data science stack.
```

---

## 🆘 Troubleshooting

### Frontend shows "Failed to fetch"

- Check that `NEXT_PUBLIC_API_URL` is set correctly in Vercel
- Verify backend is running: visit `https://your-backend.up.railway.app/health`
- Check CORS: ensure `ALLOWED_ORIGINS` includes your Vercel URL

### Backend shows CORS errors

- Add your Vercel domain to Railway environment variable `ALLOWED_ORIGINS`
- Format: `https://your-project.vercel.app,https://*.vercel.app`

### Maps not loading

- Check that backend endpoint returns HTML: visit `/api/maps/facility-locations`
- Verify iframe src URL is correct in browser DevTools
- Check for CSP errors in console

### GitHub Actions fails to push

- Enable "Read and write permissions" in Settings → Actions → General
- Check workflow run logs for specific errors

---

## 📚 Resources

- **Complete Guide**: [DEPLOYMENT.md](DEPLOYMENT.md)
- **API Documentation**: Visit `https://your-backend.up.railway.app/docs`
- **Railway Docs**: https://docs.railway.app
- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs

---

**Need Help?** Check the DEPLOYMENT.md file or open an issue on GitHub!
