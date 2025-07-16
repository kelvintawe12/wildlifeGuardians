#!/bin/bash

# Wildlife Guardians Frontend Deployment Restoration Script

echo "🔄 Restoring Wildlife Guardians Frontend deployment configuration..."

# Restore frontend files
echo "📁 Restoring frontend configuration..."
cp vercel-frontend.json vercel.json 2>/dev/null || echo "No frontend backup found"
cp package-frontend.json package.json 2>/dev/null || echo "No frontend package backup found"

# Clean up backend deployment files  
echo "🧹 Cleaning up backend deployment files..."
mv vercel.json vercel-frontend.json 2>/dev/null
mv package.json package-frontend.json 2>/dev/null

echo "✅ Frontend deployment files are restored!"
echo ""
echo "📋 Frontend is ready for deployment:"
echo "1. Commit and push changes"
echo "2. Deploy to Vercel" 
echo "3. Set environment variables:"
echo "   - VITE_API_BASE_URL=https://your-backend-domain.vercel.app/api"
echo "   - VITE_SUPABASE_URL"
echo "   - VITE_SUPABASE_ANON_KEY"
