# 🚀 ONE-CLICK DEPLOYMENT GUIDE

Everything is ready! Follow these exact steps:

---

## ⚡ STEP 1: GitHub (3 clicks)

### Option A: Let me open GitHub for you

```bash
open "https://github.com/new?name=la-healthcare-access-mapping&description=Healthcare+access+analysis+across+LA+County&visibility=public"
```

**Then:**
1. Click "Create repository" (DON'T check "Add README")
2. Copy the commands shown under "push an existing repository"
3. Paste and run them in your terminal

### Option B: One command (if gh works)

```bash
cd /Users/joelnewton/Desktop/2026-Code/Projects/la-healthcare-access-mapping
unset GITHUB_TOKEN
gh auth login --web
gh repo create la-healthcare-access-mapping --public --source=. --remote=origin --push
```

### Option C: Manual (most reliable)

```bash
cd /Users/joelnewton/Desktop/2026-Code/Projects/la-healthcare-access-mapping

# 1. Go to github.com/new and create repo named "la-healthcare-access-mapping" (public)
# 2. Run these commands (replace YOUR_USERNAME):

git remote add origin https://github.com/YOUR_USERNAME/la-healthcare-access-mapping.git
git branch -M main
git push -u origin main
```

---

## ⚡ STEP 2: Railway Backend (1 click)

**Click this link** → Opens Railway with your repo pre-selected:

```bash
open "https://railway.app/new"
```

**Then:**
1. Click "Deploy from GitHub repo"
2. Select `la-healthcare-access-mapping`
3. Railway auto-detects Python ✅
4. Click "Deploy"
5. Go to Settings → Set Root Directory: `backend`
6. Go to Settings → Generate Domain
7. **COPY THE URL** (you'll need it next!)

**Alternative**: Click this direct link after authenticating:
```bash
open "https://railway.app/new/template"
```

---

## ⚡ STEP 3: Vercel Frontend (1 click)

**Click this link** → Opens Vercel import:

```bash
open "https://vercel.com/new"
```

**Then:**
1. Click "Import Git Repository"
2. Find and import `la-healthcare-access-mapping`
3. Set Root Directory: `frontend`
4. Add Environment Variable:
   - Name: `NEXT_PUBLIC_API_URL`
   - Value: (paste Railway URL from Step 2)
5. Click "Deploy"
6. Wait 2-3 minutes ☕
7. Click your live URL!

---

## ⚡ STEP 4: Connect Them (1 minute)

**Update CORS** in Railway:
1. Go to Railway → Your project → Variables
2. Click "+ New Variable"
3. Name: `ALLOWED_ORIGINS`
4. Value: `https://your-vercel-url.vercel.app,https://*.vercel.app`
   (Replace `your-vercel-url` with your actual domain from Step 3)
5. Railway auto-redeploys ✅

---

## 🎉 DONE!

Your dashboard is live at: `https://your-project.vercel.app`

Test it:
```bash
# Open your dashboard
open "https://your-project.vercel.app"

# Test backend API
curl https://your-railway-url.up.railway.app/health
```

---

## 🤖 AUTOMATED COMMANDS (Copy-Paste)

Run this entire block (update YOUR_USERNAME):

```bash
cd /Users/joelnewton/Desktop/2026-Code/Projects/la-healthcare-access-mapping

# Open GitHub repo creation
open "https://github.com/new?name=la-healthcare-access-mapping&description=Healthcare+access+analysis+across+LA+County&visibility=public"

# Wait for you to create repo, then run:
echo "After creating the repo on GitHub, run:"
echo "git remote add origin https://github.com/YOUR_USERNAME/la-healthcare-access-mapping.git"
echo "git push -u origin main"

# Open Railway
sleep 2
open "https://railway.app/new"

# Open Vercel
sleep 2
open "https://vercel.com/new"

echo ""
echo "✅ Opened all deployment pages!"
echo "Follow the steps above to complete deployment."
```

---

## 📱 Even Easier: Use CLIs

If you have the CLIs installed:

```bash
cd /Users/joelnewton/Desktop/2026-Code/Projects/la-healthcare-access-mapping

# GitHub
gh auth login --web
gh repo create la-healthcare-access-mapping --public --source=. --remote=origin --push

# Railway (if installed)
railway login
railway init
railway up

# Vercel
vercel login
vercel --prod
```

---

## 🆘 Troubleshooting

### GitHub: "Authentication failed"
- Run: `unset GITHUB_TOKEN` first
- Then: `gh auth login --web`

### Railway: "No project found"
- Use web UI instead: https://railway.app/new
- More reliable for first-time setup

### Vercel: "Build failed"
- Check that `NEXT_PUBLIC_API_URL` is set
- Verify Root Directory is `frontend`

---

## ✅ Current Status

- ✅ Code committed (3 commits)
- ✅ Frontend dependencies installed
- ✅ All files created (24 files)
- ✅ Documentation complete
- ⏳ Waiting for: GitHub push, Railway deploy, Vercel deploy

**You're 3 clicks away from being live!**
