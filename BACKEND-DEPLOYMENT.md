# Wildlife Guardians Backend Deployment Guide

## Quick Backend Deployment (Recommended)

### Step 1: Prepare Backend Deployment

Run the deployment preparation script:

**Windows (PowerShell):**
```powershell
.\deploy-backend.ps1
```

**macOS/Linux (Bash):**
```bash
./deploy-backend.sh
```

This script will:
- Backup your current frontend configuration
- Set up backend deployment files (`vercel.json` and `package.json`)

### Step 2: Deploy to Vercel

1. **Commit and push changes:**
   ```bash
   git add .
   git commit -m "Setup backend deployment configuration"
   git push origin main
   ```

2. **Create new Vercel project:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - **Important:** Create this as a separate project from your frontend

3. **Set Environment Variables** in Vercel dashboard:
   ```env
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   JWT_SECRET=your_jwt_secret_key_here
   FRONTEND_URL=https://your-frontend-domain.vercel.app
   NODE_ENV=production
   ```

4. **Deploy!** Vercel will automatically build and deploy your backend

### Step 3: Update Frontend Configuration

After backend deployment, update your frontend:

1. **Get your backend URL** from Vercel (e.g., `https://your-backend.vercel.app`)

2. **Restore frontend configuration:**
   ```powershell
   .\restore-frontend.ps1
   ```

3. **Update frontend environment variables:**
   ```env
   VITE_API_BASE_URL=https://your-backend.vercel.app/api
   ```

4. **Deploy frontend** with updated API URL

## API Endpoints

Your deployed backend will provide:

- `GET /` - API information and available endpoints
- `GET /api/health` - Health check
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/quizzes` - Get all quizzes
- `GET /api/animals` - Get all animals
- `GET /api/badges` - Get user badges
- `GET /api/users/profile` - Get user profile

## Testing Your Deployment

Test your deployed backend:

```bash
# Health check
curl https://your-backend.vercel.app/api/health

# API information
curl https://your-backend.vercel.app/
```

## Troubleshooting

### CORS Issues
Make sure your `FRONTEND_URL` environment variable is set to your exact frontend domain.

### Missing Environment Variables
Check that all required environment variables are set in your Vercel dashboard.

### Module Not Found Errors
Ensure all dependencies are properly listed in `package-backend.json`.

## Architecture

```
Frontend (Vercel Project 1)          Backend (Vercel Project 2)
├── React App                        ├── Express.js API
├── Vite Build                       ├── Serverless Functions
└── Static Files                     └── Database Integration
```

This setup allows independent deployment and scaling of frontend and backend components.
