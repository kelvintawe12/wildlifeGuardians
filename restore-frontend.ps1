# Wildlife Guardians Frontend Deployment Restoration Script

Write-Host "🔄 Restoring Wildlife Guardians Frontend deployment configuration..." -ForegroundColor Green

# Restore frontend files
Write-Host "📁 Restoring frontend configuration..." -ForegroundColor Yellow
if (Test-Path "vercel-frontend.json") { Copy-Item "vercel-frontend.json" "vercel.json" -Force }
if (Test-Path "package-frontend.json") { Copy-Item "package-frontend.json" "package.json" -Force }
if (Test-Path ".vercelignore-frontend") { Copy-Item ".vercelignore-frontend" ".vercelignore" -Force }

Write-Host "✅ Frontend deployment files are restored!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Frontend is ready for deployment:" -ForegroundColor Cyan
Write-Host "1. Commit and push changes"
Write-Host "2. Deploy to Vercel"
Write-Host "3. Set environment variables:"
Write-Host "   - VITE_API_BASE_URL=https://your-backend-domain.vercel.app/api"
Write-Host "   - VITE_SUPABASE_URL"
Write-Host "   - VITE_SUPABASE_ANON_KEY"
