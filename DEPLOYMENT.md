# Wildlife Guardians Deployment Guide

## Frontend Deployment to Vercel

This project is configured for deployment to Vercel with the following setup:

### Configuration Files

- **vercel.json**: Configures Vercel deployment settings
- **.npmrc**: Handles npm dependency resolution
- **.vercelignore**: Excludes unnecessary files from deployment

### Build Process

The build uses Vite and outputs to the `dist` directory:

```bash
npm run build
```

### Deployment Steps

1. **Push to GitHub**: Make sure all changes are committed and pushed to your repository

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect the configuration
   - Deploy!

### Environment Variables

Make sure to set these environment variables in Vercel:

- `VITE_API_BASE_URL`: Your backend API URL
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

### Project Structure

```
dist/                 # Built files (auto-generated)
src/                  # Source code
  pages/              # React pages
  components/         # React components
  services/           # API and data services
  types/              # TypeScript type definitions
  backend/            # Backend API (not deployed with frontend)
```

### Notes

- The backend (`src/backend/`) is excluded from frontend deployment
- Make sure your backend is deployed separately and accessible via the API URL
- All TypeScript errors have been resolved for production build

## Backend Deployment

The backend should be deployed separately (e.g., to a separate Vercel project or other hosting service) and the frontend should be configured to point to it via the `VITE_API_BASE_URL` environment variable.
