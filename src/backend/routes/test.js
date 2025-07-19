const express = require('express');
const router = express.Router();
const { login, register, logout } = require('../controllers/customAuthController');

// Test route for registration
router.post('/register', async (req, res) => {
  try {
    await register(req, res);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Registration test failed', error: error.message });
  }
});

// Test route for login
router.post('/login', async (req, res) => {
  try {
    await login(req, res);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Login test failed', error: error.message });
  }
});

// Test route for logout
router.post('/logout', async (req, res) => {
  try {
    await logout(req, res);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Logout test failed', error: error.message });
  }
});

module.exports = router;
