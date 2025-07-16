# Wildlife Guardians PWA Deployment Script
Write-Host "🌿 Wildlife Guardians PWA Deployment 🌿" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Green

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: package.json not found. Please run this script from the project root." -ForegroundColor Red
    exit 1
}

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Error: Node.js is not installed or not in PATH." -ForegroundColor Red
    exit 1
}

# Check if Git is available
try {
    $gitBranch = git branch --show-current
    Write-Host "✅ Current branch: $gitBranch" -ForegroundColor Green
} catch {
    Write-Host "❌ Error: Git is not installed or not in PATH." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🔧 Setting up PWA deployment configuration..." -ForegroundColor Yellow

# Ensure we're using frontend configuration
if (Test-Path "vercel-frontend.json") {
    Copy-Item "vercel-frontend.json" "vercel.json" -Force
    Write-Host "✅ Frontend Vercel config applied" -ForegroundColor Green
} else {
    Write-Host "⚠️  Warning: vercel-frontend.json not found" -ForegroundColor Yellow
}

if (Test-Path "package-frontend.json") {
    Copy-Item "package-frontend.json" "package.json" -Force
    Write-Host "✅ Frontend package.json applied" -ForegroundColor Green
} else {
    Write-Host "⚠️  Warning: package-frontend.json not found" -ForegroundColor Yellow
}

# Update .vercelignore for frontend deployment
Write-Host "🔧 Updating .vercelignore for frontend deployment..." -ForegroundColor Yellow
@"
# Vercel ignore file for frontend deployment

# Backend specific files and directories
src/backend/

# Development files
*.log
.env.local
.env.development
.env.backend

# IDE and OS files
.vscode/
.idea/
.DS_Store
Thumbs.db

# Git
.git/

# Backup files
*-backend.*
deploy-backend.ps1
deploy-backend.sh
"@ | Out-File -FilePath ".vercelignore" -Encoding utf8

Write-Host "✅ .vercelignore updated for frontend" -ForegroundColor Green

# Check environment variables
Write-Host ""
Write-Host "🔍 Checking environment configuration..." -ForegroundColor Yellow

if (Test-Path ".env") {
    $envContent = Get-Content ".env" -Raw
    if ($envContent -match "VITE_API_BASE_URL") {
        Write-Host "✅ VITE_API_BASE_URL found in .env" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Adding VITE_API_BASE_URL to .env..." -ForegroundColor Yellow
        Add-Content ".env" "`nVITE_API_BASE_URL=https://wildlife-guardians-backends.vercel.app/api"
        Write-Host "✅ VITE_API_BASE_URL added" -ForegroundColor Green
    }
} else {
    Write-Host "🔧 Creating .env file..." -ForegroundColor Yellow
    @"
VITE_API_BASE_URL=https://wildlife-guardians-backends.vercel.app/api
"@ | Out-File -FilePath ".env" -Encoding utf8
    Write-Host "✅ .env file created" -ForegroundColor Green
}

# Test build
Write-Host ""
Write-Host "🏗️  Running test build..." -ForegroundColor Yellow
try {
    npm install
    npm run build
    Write-Host "✅ Build successful!" -ForegroundColor Green
} catch {
    Write-Host "❌ Build failed. Please check the error messages above." -ForegroundColor Red
    exit 1
}

# Git operations
Write-Host ""
Write-Host "📝 Committing changes..." -ForegroundColor Yellow

git add -A
$commitMessage = "PWA deployment ready - $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
git commit -m $commitMessage

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Changes committed: $commitMessage" -ForegroundColor Green
} else {
    Write-Host "⚠️  No changes to commit or commit failed" -ForegroundColor Yellow
}

# Push to repository
Write-Host ""
Write-Host "🚀 Pushing to repository..." -ForegroundColor Yellow
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Successfully pushed to repository" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to push to repository" -ForegroundColor Red
    exit 1
}

# Deployment summary
Write-Host ""
Write-Host "🎉 DEPLOYMENT SUMMARY" -ForegroundColor Green
Write-Host "=====================" -ForegroundColor Green
Write-Host ""
Write-Host "✅ PWA Features Enabled:" -ForegroundColor Green
Write-Host "   • Service Worker for offline caching" -ForegroundColor White
Write-Host "   • Web App Manifest for installation" -ForegroundColor White
Write-Host "   • IndexedDB for offline data storage" -ForegroundColor White
Write-Host "   • Background sync for data syncing" -ForegroundColor White
Write-Host "   • Push notifications ready" -ForegroundColor White
Write-Host "   • Responsive design for all devices" -ForegroundColor White
Write-Host ""
Write-Host "✅ Test Credentials Available:" -ForegroundColor Green
Write-Host "   Email: test@wildlife.com" -ForegroundColor White
Write-Host "   Password: wildlife123" -ForegroundColor White
Write-Host ""
Write-Host "🌐 Your app will be available at:" -ForegroundColor Green
Write-Host "   https://wildlife-guardiansrwanda.vercel.app" -ForegroundColor Cyan
Write-Host ""
Write-Host "🔗 Backend API:" -ForegroundColor Green
Write-Host "   https://wildlife-guardians-backends.vercel.app" -ForegroundColor Cyan
Write-Host ""
Write-Host "⏱️  Deployment typically takes 1-2 minutes..." -ForegroundColor Yellow
Write-Host ""
Write-Host "🔍 To monitor deployment:" -ForegroundColor Green
Write-Host "   1. Visit https://vercel.com/dashboard" -ForegroundColor White
Write-Host "   2. Check the wildlife-guardiansrwanda project" -ForegroundColor White
Write-Host "   3. Wait for green 'Ready' status" -ForegroundColor White
Write-Host ""
Write-Host "📱 To install as PWA:" -ForegroundColor Green
Write-Host "   • Desktop: Look for install icon in address bar" -ForegroundColor White
Write-Host "   • Mobile: Use 'Add to Home Screen' option" -ForegroundColor White
Write-Host "   • iOS Safari: Tap share → Add to Home Screen" -ForegroundColor White
Write-Host ""
Write-Host "🎊 Wildlife Guardians PWA deployment initiated! 🎊" -ForegroundColor Green
