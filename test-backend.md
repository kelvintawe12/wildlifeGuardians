# Test your deployed backend

# Replace YOUR_BACKEND_URL with your actual backend URL from Vercel

# Test health endpoint
curl https://YOUR_BACKEND_URL.vercel.app/api/health

# Test API info
curl https://YOUR_BACKEND_URL.vercel.app/

# Expected response:
# {
#   "success": true,
#   "message": "Wildlife Guardians API is running",
#   "timestamp": "2025-07-16T..."
# }
