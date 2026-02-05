# 🗑️ CLEAN UP VERCEL PROJECTS

## Quick Delete Instructions

I opened your Vercel Dashboard. Here's what to do:

### **Step 1: Delete Old Projects (30 seconds each)**

For each old "healthcare" project:

1. **Click** on the project name
2. **Click** "Settings" (gear icon in top menu)
3. **Scroll** to bottom of page
4. **Find** "Delete Project" section (red danger zone)
5. **Click** "Delete"
6. **Type** the project name to confirm
7. **Click** "Delete" again

Repeat for all old healthcare projects.

---

### **Step 2: Create Fresh Deployment (5 minutes)**

After deleting old ones:

1. **Go to**: https://vercel.com/new (or click "Add New..." → "Project")

2. **Import Git Repository**
   - Find: `calebnewtonusc/la-healthcare-access-mapping`
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Next.js (auto-detected) ✅
   - **Root Directory**: `frontend` ⚠️ **IMPORTANT!**
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

4. **Environment Variables**
   - Click "Environment Variables"
   - **Name**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://web-production-325d3.up.railway.app`
   - Click "Add"

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes

6. **Get Your URL**
   - Once deployed, copy the Vercel URL
   - Example: `https://la-healthcare-access-mapping-xxxx.vercel.app`

---

## 🧪 Test Your Deployment

Once Vercel is deployed, test:

### **1. Visit Dashboard**
```
https://your-project.vercel.app
```

**Should show:**
- ✅ Header: "LA Healthcare Access Dashboard"
- ✅ Key metrics cards with numbers
- ✅ Recommendations list
- ✅ Facility map (iframe)
- ✅ Cost-benefit analysis

### **2. Check Console (F12)**
- Open browser DevTools (F12)
- Go to Console tab
- **Should NOT see:**
  - ❌ CORS errors
  - ❌ Failed to fetch errors
  - ❌ 404 errors

- **Should see:**
  - ✅ No errors (or only minor warnings)

### **3. Test API Connection**
Open DevTools Network tab and refresh. Look for:
- ✅ Requests to `web-production-325d3.up.railway.app`
- ✅ Status 200 responses
- ✅ JSON data returned

---

## 🔗 Final Step: Update Railway CORS

After Vercel is deployed:

1. **Go to Railway**: https://railway.app/project
2. **Click** your deployment
3. **Go to** "Variables" tab
4. **Add** new variable:
   - **Name**: `ALLOWED_ORIGINS`
   - **Value**: `https://your-vercel-url.vercel.app,https://*.vercel.app`
5. Railway will **auto-redeploy** ✅

---

## ✅ Success Checklist

- [ ] Deleted all old healthcare projects in Vercel
- [ ] Created new deployment from `calebnewtonusc/la-healthcare-access-mapping`
- [ ] Set Root Directory to `frontend`
- [ ] Added `NEXT_PUBLIC_API_URL` environment variable
- [ ] Deployment succeeded (green checkmark)
- [ ] Visited dashboard and it loads
- [ ] No CORS errors in console
- [ ] Data displays (metrics, recommendations, map)
- [ ] Added Vercel URL to Railway ALLOWED_ORIGINS
- [ ] Tested end-to-end (frontend → backend → data)

---

## 🎯 Expected URLs

After completion:

- **GitHub**: https://github.com/calebnewtonusc/la-healthcare-access-mapping
- **Railway Backend**: https://web-production-325d3.up.railway.app
- **Vercel Frontend**: https://la-healthcare-access-mapping-xxxx.vercel.app
- **API Docs**: https://web-production-325d3.up.railway.app/docs

---

## 🆘 Troubleshooting

### **Vercel Build Fails**
- Check that Root Directory is set to `frontend`
- Verify `NEXT_PUBLIC_API_URL` is set correctly
- Look at build logs for specific error

### **Dashboard Shows "Failed to fetch"**
- Check NEXT_PUBLIC_API_URL matches Railway URL exactly
- Verify Railway backend is running (test `/health`)
- Check ALLOWED_ORIGINS in Railway includes your Vercel URL

### **Map Doesn't Load**
- Check browser console for errors
- Verify Railway `/api/maps/facility-locations` returns HTML
- Test Railway health check shows `"outputs_available": true`

---

**Quick cleanup, then fresh deploy = working dashboard!** 🚀
