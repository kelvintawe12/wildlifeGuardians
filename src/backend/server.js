const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Initialize Supabase client (keeping for backward compatibility with existing data)
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let supabase = null;
if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
  global.supabase = supabase;
  console.log('✅ Supabase client initialized (for legacy data)');
} else {
  console.log('⚠️ Supabase not configured - using custom authentication only');
}

// Import routes
const authRoutes = require('./routes/auth');
const customAuthRoutes = require('./routes/customAuth'); // New custom auth
const quizRoutes = require('./routes/quizzes');
const animalRoutes = require('./routes/animals');
const badgeRoutes = require('./routes/badges');
const userRoutes = require('./routes/users');
const indexRoutes = require('./routes/index');
const testRoutes = require('./routes/test');

// Import custom auth middleware
const { corsOptions, securityHeaders } = require('./middleware/customAuth');

// Initialize express app
const app = express();

// Security headers
app.use(securityHeaders);

// CORS with custom options
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use(morgan('combined'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Wildlife Guardians API is running',
    timestamp: new Date().toISOString(),
    authentication: {
      custom: true,
      supabase: !!supabase
    },
    environment: process.env.NODE_ENV || 'development'
  });
});

// Authentication routes (both custom and legacy)
app.use('/api/auth', customAuthRoutes); // Primary custom auth
app.use('/api/auth/legacy', authRoutes); // Legacy Supabase auth
app.use('/api/quizzes', quizRoutes);
app.use('/api/animals', animalRoutes);
app.use('/api/badges', badgeRoutes);
app.use('/api/users', userRoutes);
app.use('/api', indexRoutes);
app.use('/api/test', testRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  
  // Handle Supabase errors
  if (err.code && err.message) {
    return res.status(400).json({
      success: false,
      error: err.message,
      code: err.code
    });
  }
  
  res.status(500).json({
    success: false,
    error: 'Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Start server
const PORT = process.env.PORT || 5000;

// For Vercel deployment, export the app
if (process.env.NODE_ENV === 'production' && process.env.VERCEL) {
  module.exports = app;
} else {
  const server = app.listen(PORT, () => {
    console.log(`🚀 Wildlife Guardians Backend running on port ${PORT}`);
    console.log(`📱 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
    console.log(`🗄️ Supabase URL: ${supabaseUrl}`);
  });

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`❌ Port ${PORT} is already in use. Please free the port or use a different one.`);
      process.exit(1);
    } else {
      console.error('Server error:', error);
    }
  });
}
