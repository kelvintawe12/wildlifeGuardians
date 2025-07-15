const express = require('express');
const {
  getProfile,
  updateProfile
} = require('../controllers/userController');
const {
  authenticateSupabase
} = require('../middleware/auth');

const router = express.Router();

// Protected routes
router.get('/profile', authenticateSupabase, getProfile);
router.put('/profile', authenticateSupabase, updateProfile);

module.exports = router;