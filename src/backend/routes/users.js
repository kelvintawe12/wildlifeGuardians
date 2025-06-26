const express = require('express');
const {
  getProfile,
  updateProfile,
  getUserStats
} = require('../controllers/userController');
const {
  protect
} = require('../middleware/auth');
const router = express.Router();
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.get('/stats', protect, getUserStats);
module.exports = router;