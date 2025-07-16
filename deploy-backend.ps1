# Wildlife Guardians Backend Deployment Preparation Script

Write-Host "🚀 Preparing Wildlife Guardians Backend for Deployment..." -ForegroundColor Green

# Create backup of current files
Write-Host "📁 Creating backup of current configuration..." -ForegroundColor Yellow
if (Test-Path "vercel.json") { Copy-Item "vercel.json" "vercel-frontend.json" }
if (Test-Path "package.json") { Copy-Item "package.json" "package-frontend.json" }
if (Test-Path ".vercelignore") { Copy-Item ".vercelignore" ".vercelignore-frontend" }

# Setup backend deployment files
Write-Host "🔧 Setting up backend deployment configuration..." -ForegroundColor Yellow
Copy-Item "vercel-backend.json" "vercel.json" -Force
Copy-Item "package-backend.json" "package.json" -Force
Copy-Item ".vercelignore-backend" ".vercelignore" -Force

Write-Host "✅ Backend deployment files are ready!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Cyan
Write-Host "1. Commit and push these changes to your repository"
Write-Host "2. Deploy to Vercel (new project for backend)"
Write-Host "3. Set environment variables in Vercel:"
Write-Host "   - SUPABASE_URL"
Write-Host "   - SUPABASE_SERVICE_ROLE_KEY"
Write-Host "   - JWT_SECRET"
Write-Host "   - FRONTEND_URL"
Write-Host "   - NODE_ENV=production"
Write-Host ""
Write-Host "🔄 To switch back to frontend deployment:" -ForegroundColor Magenta
Write-Host "   .\restore-frontend.ps1"
