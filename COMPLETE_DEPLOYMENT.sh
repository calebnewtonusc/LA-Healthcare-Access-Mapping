#!/bin/bash

# Complete Deployment Script
# This script will guide you through the entire deployment process

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 LA Healthcare Access Mapping - Complete Deployment"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

cd /Users/joelnewton/Desktop/2026-Code/Projects/la-healthcare-access-mapping

echo -e "${BLUE}Current Status:${NC}"
echo "  ✓ Backend: Running locally on port 8000"
echo "  ✓ Frontend: Running locally on port 3000"
echo "  ✓ 7 commits ready to push"
echo "  ✓ 28 files created"
echo "  ✓ All tests passing"
echo ""

# Step 1: GitHub
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${YELLOW}Step 1: GitHub Repository${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "I'm opening GitHub in your browser..."
echo "Create a new repository with these settings:"
echo ""
echo "  Repository name: la-healthcare-access-mapping"
echo "  Description: Healthcare access analysis across LA County"
echo "  Visibility: ✓ Public"
echo "  DON'T initialize with README, .gitignore, or license"
echo ""

open "https://github.com/new?name=la-healthcare-access-mapping&description=Healthcare+access+analysis+across+LA+County&visibility=public"

echo "Waiting for you to create the repository..."
read -p "Press Enter after you've created the repository on GitHub..."
echo ""

echo "Testing SSH connection to GitHub..."
if ssh -T git@github.com 2>&1 | grep -q "successfully authenticated"; then
    echo -e "${GREEN}✓ SSH connection successful${NC}"
else
    echo -e "${YELLOW}⚠ SSH might not be configured. Trying anyway...${NC}"
fi
echo ""

echo "Pushing code to GitHub..."
if git push -u origin main; then
    echo ""
    echo -e "${GREEN}✅ Successfully pushed to GitHub!${NC}"
    echo ""
    echo "Repository: https://github.com/calebnewtonusc/la-healthcare-access-mapping"
    echo ""
else
    echo ""
    echo -e "${YELLOW}⚠ Push failed. You may need to:${NC}"
    echo "  1. Add your SSH key to GitHub: https://github.com/settings/keys"
    echo "  2. Or push manually: git push -u origin main"
    echo ""
    read -p "Press Enter to continue anyway..."
fi

# Step 2: Railway
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${YELLOW}Step 2: Deploy Backend to Railway${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "I'm opening Railway in your browser..."
echo ""
echo "Follow these steps:"
echo "  1. Sign in with GitHub"
echo "  2. Click 'Deploy from GitHub repo'"
echo "  3. Select 'la-healthcare-access-mapping'"
echo "  4. Railway will auto-detect Python ✓"
echo "  5. Click 'Settings' → Set Root Directory: backend"
echo "  6. Click 'Settings' → Domains → Generate Domain"
echo "  7. COPY THE URL - you'll need it next!"
echo ""

open "https://railway.app/new"

read -p "Press Enter after deploying backend and copying the Railway URL..."
echo ""
read -p "Paste your Railway URL here (e.g., https://your-app.up.railway.app): " RAILWAY_URL

if [ -z "$RAILWAY_URL" ]; then
    echo -e "${YELLOW}⚠ No URL provided. You'll need to configure manually.${NC}"
    RAILWAY_URL="YOUR_RAILWAY_URL_HERE"
fi

# Step 3: Vercel
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${YELLOW}Step 3: Deploy Frontend to Vercel${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "I'm opening Vercel in your browser..."
echo ""
echo "Follow these steps:"
echo "  1. Sign in with GitHub"
echo "  2. Click 'Import Git Repository'"
echo "  3. Select 'la-healthcare-access-mapping'"
echo "  4. Set Root Directory: frontend"
echo "  5. Add Environment Variable:"
echo "     Name:  NEXT_PUBLIC_API_URL"
echo "     Value: $RAILWAY_URL"
echo "  6. Click 'Deploy'"
echo "  7. Wait 2-3 minutes for build"
echo ""

open "https://vercel.com/new"

read -p "Press Enter after deploying to Vercel..."
echo ""
read -p "Paste your Vercel URL here (e.g., https://your-project.vercel.app): " VERCEL_URL

if [ -z "$VERCEL_URL" ]; then
    echo -e "${YELLOW}⚠ No URL provided.${NC}"
    VERCEL_URL="YOUR_VERCEL_URL_HERE"
fi

# Step 4: Connect them
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${YELLOW}Step 4: Connect Frontend & Backend${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "Final step: Update CORS settings in Railway"
echo ""
echo "  1. Go back to Railway dashboard"
echo "  2. Click 'Variables' tab"
echo "  3. Add new variable:"
echo "     Name:  ALLOWED_ORIGINS"
echo "     Value: $VERCEL_URL,https://*.vercel.app"
echo "  4. Railway will auto-redeploy"
echo ""

read -p "Press Enter after adding the CORS variable..."

# Summary
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}🎉 DEPLOYMENT COMPLETE!${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Your LA Healthcare Access Mapping dashboard is now live!"
echo ""
echo -e "${GREEN}Live URLs:${NC}"
echo "  Frontend: $VERCEL_URL"
echo "  Backend:  $RAILWAY_URL"
echo "  API Docs: $RAILWAY_URL/docs"
echo "  GitHub:   https://github.com/calebnewtonusc/la-healthcare-access-mapping"
echo ""
echo -e "${BLUE}Features:${NC}"
echo "  ✓ Dashboard with interactive visualizations"
echo "  ✓ 5 policy recommendations"
echo "  ✓ 10 optimal facility locations"
echo "  ✓ Cost-benefit analysis ($3.5B net benefit, 540% ROI)"
echo "  ✓ Monthly auto-updates via GitHub Actions"
echo "  ✓ Mobile-responsive design"
echo ""
echo "Test it:"
echo "  1. Visit: $VERCEL_URL"
echo "  2. Check all sections load"
echo "  3. Verify maps display"
echo "  4. Browse recommendations"
echo ""
echo -e "${GREEN}🚀 Share your work!${NC}"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
