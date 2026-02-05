#!/bin/bash

# Push to GitHub - Final Step
# Run this after creating the repository on GitHub

set -e

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 Pushing LA Healthcare Access Mapping to GitHub"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check if we're in the right directory
if [ ! -f "README.md" ] || [ ! -d "frontend" ] || [ ! -d "backend" ]; then
    echo "❌ Error: Please run from project root"
    exit 1
fi

echo "📋 Step 1: Create GitHub Repository"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Go to: https://github.com/new"
echo ""
echo "Settings:"
echo "  • Repository name: la-healthcare-access-mapping"
echo "  • Description: Healthcare access analysis across LA County"
echo "  • Visibility: Public"
echo "  • DON'T check 'Add a README file'"
echo "  • DON'T check 'Add .gitignore'"
echo "  • DON'T check 'Choose a license'"
echo ""
read -p "Press Enter after creating the repository..."
echo ""

echo "📤 Step 2: Push to GitHub"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Remote already added by Claude
echo "✓ Remote already configured: git@github.com:calebnewtonusc/la-healthcare-access-mapping.git"
echo ""

echo "Pushing to main branch..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "✅ SUCCESS! Code pushed to GitHub!"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "🌐 Repository: https://github.com/calebnewtonusc/la-healthcare-access-mapping"
    echo ""
    echo "📋 Next Steps:"
    echo ""
    echo "  1. Deploy Backend to Railway:"
    echo "     → https://railway.app/new"
    echo "     → Deploy from GitHub repo"
    echo "     → Select: la-healthcare-access-mapping"
    echo "     → Set Root Directory: backend"
    echo "     → Generate domain"
    echo ""
    echo "  2. Deploy Frontend to Vercel:"
    echo "     → https://vercel.com/new"
    echo "     → Import from GitHub"
    echo "     → Select: la-healthcare-access-mapping"
    echo "     → Set Root Directory: frontend"
    echo "     → Add env: NEXT_PUBLIC_API_URL = (Railway URL)"
    echo ""
    echo "  3. Connect them:"
    echo "     → In Railway, add variable: ALLOWED_ORIGINS"
    echo "     → Value: https://your-vercel-url.vercel.app"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""

    # Open deployment pages
    echo "Opening deployment pages in browser..."
    sleep 1
    open "https://railway.app/new"
    sleep 2
    open "https://vercel.com/new"

else
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "❌ Push failed"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "Troubleshooting:"
    echo "  1. Make sure you created the repository on GitHub"
    echo "  2. Check SSH key is added to GitHub: https://github.com/settings/keys"
    echo "  3. Test SSH: ssh -T git@github.com"
    echo ""
fi
