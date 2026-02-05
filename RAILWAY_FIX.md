# ✅ RAILWAY DEPLOYMENT FIX

## 🔧 Issue Fixed

The "Error creating build plan with roadpack" error has been fixed!

**Problem**: Railway couldn't find the outputs directory when deploying only the backend folder.

**Solution**: Added proper nixpacks configuration to deploy from project root.

---

## 🚀 HOW TO DEPLOY TO RAILWAY (Updated Instructions)

### Option 1: Deploy from Root (RECOMMENDED)

1. **Go to Railway**: https://railway.app/new
2. **Sign in** with GitHub
3. **Click** "Deploy from GitHub repo"
4. **Select**: `calebnewtonusc/la-healthcare-access-mapping`
5. **IMPORTANT**: Leave "Root Directory" EMPTY (or set to `/`)
   - Railway will use the nixpacks.toml at root
   - This gives access to both backend/ and outputs/
6. **Click** "Deploy"
7. **Wait** 2-3 minutes for build
8. **Go to** Settings → Domains → Generate Domain
9. **Copy the URL**

### Option 2: Manual Configuration

If Option 1 doesn't work, try this:

1. Deploy as above but:
2. Go to **Settings** → **Build**
3. Set **Build Command**: `cd backend && pip install -r requirements.txt`
4. Set **Start Command**: `cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Redeploy

---

## 🧪 Testing Your Railway Deployment

Once deployed, test:

```bash
# Replace YOUR_URL with your Railway URL

# Health check
curl https://YOUR_URL.up.railway.app/health

# Should return:
# {"status":"healthy","service":"la-healthcare-api"}

# Stats endpoint
curl https://YOUR_URL.up.railway.app/api/stats

# Should return JSON with population data

# API docs (open in browser)
https://YOUR_URL.up.railway.app/docs
```

---

## 📁 What Changed

Files added to fix the issue:

1. **`nixpacks.toml`** (root) - Tells Railway how to build
2. **`Procfile`** (root) - Backup deployment config
3. **`backend/nixpacks.toml`** - Backend-specific config
4. **`backend/Procfile`** - Backend backup config

All changes pushed to GitHub ✅

---

## 🔍 Why This Happened

Your FastAPI backend looks for files in:
```python
BASE_DIR = Path(__file__).parent.parent  # Goes up to project root
OUTPUTS_DIR = BASE_DIR / "outputs" / "policy_recommendations"
```

When Railway deployed only the `backend/` folder, it couldn't find `outputs/` (which is in the parent).

Now Railway deploys the whole project and runs the backend from within it!

---

## 🎯 Expected Result

After deployment, you should see:

**Railway Dashboard**:
- ✅ Build logs showing successful pip install
- ✅ Deployment logs showing "Uvicorn running on 0.0.0.0:XXXX"
- ✅ Health check passing
- ✅ Domain generated

**Testing URLs**:
- ✅ `/health` returns healthy status
- ✅ `/api/stats` returns JSON data
- ✅ `/docs` shows Swagger UI
- ✅ `/api/recommendations` returns 5 policies
- ✅ `/api/facilities` returns 10 locations

---

## 🆘 If It Still Fails

### Check Logs

In Railway:
1. Click on your deployment
2. Click "View Logs"
3. Look for errors

Common issues:

**"Module not found"**
- Make sure Root Directory is empty or `/`
- Check that requirements.txt is being read

**"Port already in use"**
- Railway sets $PORT automatically
- Make sure start command uses $PORT

**"Cannot find outputs"**
- Verify you deployed from root (not backend/)
- Check that outputs/ folder is in the repo

### Get Help

Post the error logs and I can help debug!

---

## ✅ Next: Vercel Frontend

Once Railway is deployed:

1. Go to: https://vercel.com/new
2. Import: `calebnewtonusc/la-healthcare-access-mapping`
3. Set Root Directory: `frontend`
4. Add Environment Variable:
   - Name: `NEXT_PUBLIC_API_URL`
   - Value: `https://YOUR_RAILWAY_URL.up.railway.app`
5. Deploy!

---

**The fix is live on GitHub! Try deploying to Railway again with the updated instructions above.** 🚀
