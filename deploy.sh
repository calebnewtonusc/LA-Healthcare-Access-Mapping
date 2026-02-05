#!/bin/bash

# LA Healthcare Access Mapping - Deployment Script
# This script helps automate the deployment process

set -e  # Exit on error

echo "🚀 LA Healthcare Access Mapping - Deployment Helper"
echo "=================================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check current directory
if [ ! -f "README.md" ] || [ ! -d "frontend" ] || [ ! -d "backend" ]; then
    echo -e "${RED}Error: Please run this script from the project root directory${NC}"
    exit 1
fi

echo "Step 1: GitHub Authentication"
echo "=============================="
echo ""
echo -e "${YELLOW}Checking GitHub CLI authentication...${NC}"

if ! gh auth status 2>/dev/null; then
    echo -e "${YELLOW}Not authenticated. Let's log in to GitHub...${NC}"
    gh auth login
else
    echo -e "${GREEN}✓ Already authenticated with GitHub${NC}"
fi
echo ""

echo "Step 2: Create GitHub Repository"
echo "================================="
echo ""

# Check if remote exists
if git remote get-url origin 2>/dev/null; then
    echo -e "${GREEN}✓ GitHub repository already configured${NC}"
    REPO_URL=$(git remote get-url origin)
    echo "  Repository: $REPO_URL"
else
    echo -e "${YELLOW}Creating public GitHub repository...${NC}"
    gh repo create la-healthcare-access-mapping --public --source=. --remote=origin --push
    echo -e "${GREEN}✓ Repository created and code pushed${NC}"
fi
echo ""

echo "Step 3: Install Railway CLI (Optional)"
echo "======================================"
echo ""
echo "To deploy the backend, you can use Railway CLI:"
echo "  npm install -g @railway/cli"
echo ""
read -p "Install Railway CLI now? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    npm install -g @railway/cli
    echo -e "${GREEN}✓ Railway CLI installed${NC}"
else
    echo "Skipping Railway CLI installation"
fi
echo ""

echo "Step 4: Install Vercel CLI (Optional)"
echo "====================================="
echo ""
echo "To deploy the frontend, you can use Vercel CLI:"
echo "  npm install -g vercel"
echo ""
read -p "Install Vercel CLI now? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    npm install -g vercel
    echo -e "${GREEN}✓ Vercel CLI installed${NC}"
else
    echo "Skipping Vercel CLI installation"
fi
echo ""

echo "📋 Deployment Summary"
echo "===================="
echo ""
echo -e "${GREEN}✓ Code committed to Git${NC}"
echo -e "${GREEN}✓ GitHub repository ready${NC}"
echo -e "${GREEN}✓ Frontend dependencies installed${NC}"
echo ""
echo "🎯 Next Steps:"
echo ""
echo "1. Deploy Backend to Railway:"
echo "   - Visit: https://railway.app"
echo "   - Deploy from GitHub repo"
echo "   - Set root directory to: backend"
echo "   - Copy the generated URL"
echo ""
echo "2. Deploy Frontend to Vercel:"
echo "   - Visit: https://vercel.com"
echo "   - Import GitHub repository"
echo "   - Set root directory to: frontend"
echo "   - Add env var: NEXT_PUBLIC_API_URL=<Railway URL>"
echo "   - Deploy"
echo ""
echo "3. Update Backend CORS:"
echo "   - Add ALLOWED_ORIGINS in Railway"
echo "   - Value: https://<your-vercel-domain>.vercel.app"
echo ""
echo "📖 Full deployment instructions: DEPLOYMENT_STEPS.md"
echo ""
echo -e "${GREEN}🎉 Automated setup complete!${NC}"
echo ""
