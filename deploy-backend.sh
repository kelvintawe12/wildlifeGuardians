#!/bin/bash

# Wildlife Guardians Backend Deployment Preparation Script

echo "🚀 Preparing Wildlife Guardians Backend for Deployment..."

# Create backup of current files
echo "📁 Creating backup of current configuration..."
cp vercel.json vercel-frontend.json 2>/dev/null || echo "No frontend vercel.json found"
cp package.json package-frontend.json 2>/dev/null || echo "No frontend package.json found"

# Setup backend deployment files
echo "🔧 Setting up backend deployment configuration..."
cp vercel-backend.json vercel.json
cp package-backend.json package.json

echo "✅ Backend deployment files are ready!"
echo ""
echo "📋 Next steps:"
echo "1. Commit and push these changes to your repository"
echo "2. Deploy to Vercel (new project for backend)"
echo "3. Set environment variables in Vercel:"
echo "   - SUPABASE_URL"
echo "   - SUPABASE_SERVICE_ROLE_KEY"
echo "   - JWT_SECRET"
echo "   - FRONTEND_URL"
echo "   - NODE_ENV=production"
echo ""
echo "🔄 To switch back to frontend deployment:"
echo "   ./restore-frontend.sh"
