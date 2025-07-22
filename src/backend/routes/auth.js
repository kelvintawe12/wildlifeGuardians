const express = require('express');
const {
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
router.post('/login', login);

// Protected routes
router.get('/me', getMe);
router.put('/profile', authenticateSupabase, updateProfile);
router.post('/logout', authenticateSupabase, logout);

module.exports = router;