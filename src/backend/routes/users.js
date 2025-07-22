const express = require('express');
const {
  getProfile,
  updateProfile
} = require('../controllers/userController');
const {
  authenticateSupabase
} = require('../middleware/auth');

const router = express.Router();

// Public stateless routes for demo
router.get('/profile', getProfile);
router.put('/profile', updateProfile);

module.exports = router;