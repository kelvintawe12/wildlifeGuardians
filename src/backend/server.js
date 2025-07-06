const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();
// Initialize Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
// Import routes
const authRoutes = require('./routes/auth');
const quizRoutes = require('./routes/quizzes');
const animalRoutes = require('./routes/animals');
const badgeRoutes = require('./routes/badges');
const userRoutes = require('./routes/users');
// Initialize express app
const app = express();
// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/animals', animalRoutes);
app.use('/api/badges', badgeRoutes);
app.use('/api/users', userRoutes);
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
