const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
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
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/wildlife-guardians', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected')).catch(err => console.error('MongoDB connection error:', err));
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