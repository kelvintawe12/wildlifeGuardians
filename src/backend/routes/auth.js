const express = require('express');
const {
  register,
  login,
  getMe,
  updateProfile,
  logout
} = require('../controllers/authController');
const {
  authenticateSupabase
} = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', authenticateSupabase, getMe);
router.put('/profile', authenticateSupabase, updateProfile);
router.post('/logout', authenticateSupabase, logout);

module.exports = router;