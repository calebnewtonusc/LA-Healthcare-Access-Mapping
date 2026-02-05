# GitHub Setup Guide

Your local git repository is ready! Follow these steps to push it to GitHub.

## Option 1: Using GitHub CLI (Recommended)

1. **Authenticate with GitHub**:
```bash
gh auth login
```
Follow the prompts to authenticate.

2. **Create repository and push**:
```bash
cd /Users/joelnewton/Desktop/2026-Code/Projects/la-healthcare-access-mapping
gh repo create la-healthcare-access-mapping --public --source=. --description="Mapping healthcare access gaps across Los Angeles to identify underserved communities" --push
```

## Option 2: Using GitHub Web Interface

1. **Create repository on GitHub**:
   - Go to https://github.com/new
   - Repository name: `la-healthcare-access-mapping`
   - Description: `Mapping healthcare access gaps across Los Angeles to identify underserved communities`
   - Choose: Public
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
   - Click "Create repository"

2. **Push your code**:
```bash
cd /Users/joelnewton/Desktop/2026-Code/Projects/la-healthcare-access-mapping

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/la-healthcare-access-mapping.git

# Push code
git branch -M main
git push -u origin main
```

## After Pushing to GitHub

### Add Collaborators

1. Go to your repository on GitHub
2. Click "Settings" → "Collaborators"
3. Click "Add people"
4. Enter your friends' GitHub usernames
5. They'll receive invitations to collaborate

### Set Up Project Board (Optional)

1. Go to "Projects" tab
2. Create new project
3. Choose "Board" template
4. Add columns: "To Do", "In Progress", "Done"
5. Use for tracking tasks from PROJECT_PLAN.md

### Enable GitHub Issues

Issues are great for tracking tasks, bugs, and discussions:
1. Go to "Settings"
2. Check "Issues" under Features
3. Create issues for Phase 1 tasks

### Set Up Branch Protection (Recommended)

To ensure code quality:
1. Go to "Settings" → "Branches"
2. Add rule for `main` branch
3. Enable:
   - Require pull request reviews before merging
   - Require conversation resolution before merging

## Team Workflow

### Creating a Feature Branch
```bash
# Create and switch to new branch
git checkout -b feature/your-feature-name

# Make changes, then commit
git add .
git commit -m "Description of changes"

# Push to GitHub
git push -u origin feature/your-feature-name
```

### Creating a Pull Request
1. Push your feature branch to GitHub
2. Go to repository on GitHub
3. Click "Pull requests" → "New pull request"
4. Select your feature branch
5. Add description of changes
6. Request review from teammates
7. Merge after approval

### Staying Updated
```bash
# Get latest changes from main
git checkout main
git pull origin main

# Update your feature branch
git checkout feature/your-feature-name
git merge main
```

## Troubleshooting

### Authentication Issues
If you have authentication problems:
```bash
# Re-authenticate
gh auth login

# Or use SSH instead of HTTPS
git remote set-url origin git@github.com:YOUR_USERNAME/la-healthcare-access-mapping.git
```

### Large Files
If you accidentally add large data files:
```bash
# Remove from staging
git reset HEAD path/to/large/file

# Add to .gitignore
echo "path/to/large/file" >> .gitignore
```

## Repository URL

After pushing, your repository will be at:
```
https://github.com/YOUR_USERNAME/la-healthcare-access-mapping
```

Share this URL with your teammates!
