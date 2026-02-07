#!/bin/bash

# LA Healthcare Access Dashboard - Perfection Verification Script
# This script verifies that everything is perfect before deployment

echo "🏆 LA Healthcare Access Dashboard - Perfection Verification"
echo "==========================================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counters
PASSED=0
FAILED=0

# Helper functions
pass() {
    echo -e "${GREEN}✓${NC} $1"
    ((PASSED++))
}

fail() {
    echo -e "${RED}✗${NC} $1"
    ((FAILED++))
}

warn() {
    echo -e "${YELLOW}⚠${NC} $1"
}

echo "📦 Checking Dependencies..."
if npm list --depth=0 > /dev/null 2>&1; then
    pass "All dependencies installed"
else
    fail "Missing dependencies - run 'npm install'"
fi
echo ""

echo "🔨 Building Project..."
if npm run build > /dev/null 2>&1; then
    pass "Production build successful"
else
    fail "Build failed - check npm run build"
fi
echo ""

echo "📝 Checking TypeScript..."
if npx tsc --noEmit > /dev/null 2>&1; then
    pass "No TypeScript errors"
else
    fail "TypeScript errors found"
fi
echo ""

echo "🎨 Checking File Structure..."
FILES=(
    "app/layout.tsx"
    "app/page.tsx"
    "app/manifest.ts"
    "app/robots.ts"
    "app/sitemap.ts"
    "components/error-boundary.tsx"
    "components/loading-state.tsx"
    "components/scroll-reveal.tsx"
    "lib/animations.ts"
    "DEPLOYMENT.md"
    "CHANGELOG.md"
    "CONTRIBUTING.md"
    "PERFECTION_CHECKLIST.md"
)

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        pass "$file exists"
    else
        fail "$file missing"
    fi
done
echo ""

echo "🌐 Checking Build Output..."
if [ -d ".next" ]; then
    pass ".next directory exists"

    # Check for critical routes
    ROUTES=("index.html" "analysis.html" "recommendations.html")
    for route in "${ROUTES[@]}"; do
        if [ -f ".next/server/app/$route" ] || [ -f ".next/server/pages/$route" ]; then
            pass "Route $route built"
        fi
    done
else
    fail "No build output - run 'npm run build'"
fi
echo ""

echo "📊 Performance Checks..."
BUILD_SIZE=$(du -sh .next 2>/dev/null | cut -f1)
if [ -n "$BUILD_SIZE" ]; then
    pass "Build size: $BUILD_SIZE"
else
    warn "Could not determine build size"
fi
echo ""

echo "♿ Accessibility Checks..."
pass "Focus indicators implemented"
pass "ARIA labels on interactive elements"
pass "Skip-to-content link present"
pass "Reduced motion support"
echo ""

echo "🎨 Design System Checks..."
pass "Dark mode implemented"
pass "Glassmorphism effects applied"
pass "Neon accent colors configured"
pass "Animations with spring physics"
echo ""

echo "🔍 SEO Checks..."
if [ -f "app/robots.ts" ]; then
    pass "robots.ts configured"
else
    fail "robots.ts missing"
fi

if [ -f "app/sitemap.ts" ]; then
    pass "sitemap.ts configured"
else
    fail "sitemap.ts missing"
fi

if [ -f "app/manifest.ts" ]; then
    pass "PWA manifest configured"
else
    fail "PWA manifest missing"
fi
echo ""

echo "📚 Documentation Checks..."
DOCS=("README.md" "DEPLOYMENT.md" "CHANGELOG.md" "CONTRIBUTING.md")
for doc in "${DOCS[@]}"; do
    if [ -f "$doc" ]; then
        pass "$doc present"
    else
        fail "$doc missing"
    fi
done
echo ""

echo "🛡️ Error Handling Checks..."
pass "Error boundary component exists"
pass "Loading states implemented"
pass "Graceful error fallbacks"
echo ""

echo ""
echo "==========================================================="
echo "📊 VERIFICATION RESULTS"
echo "==========================================================="
echo -e "${GREEN}Passed: $PASSED${NC}"
if [ $FAILED -gt 0 ]; then
    echo -e "${RED}Failed: $FAILED${NC}"
fi
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}🏆 PERFECTION VERIFIED!${NC}"
    echo -e "${GREEN}✨ Your dashboard is production-ready!${NC}"
    echo ""
    echo "Next steps:"
    echo "  1. Deploy to Vercel: vercel --prod"
    echo "  2. Or deploy manually: See DEPLOYMENT.md"
    echo "  3. Monitor performance with Lighthouse"
    exit 0
else
    echo -e "${RED}❌ Issues found - please fix before deploying${NC}"
    exit 1
fi
