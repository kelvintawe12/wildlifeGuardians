const express = require('express');
const router = express.Router();

// Import controllers
const {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
  changePassword,
  deleteAccount
} = require('../controllers/customAuthController');

// Import middleware
const {
  authenticateToken,
  loginRateLimiter,
  registerRateLimiter,
  apiRateLimiter,
  validateRegistration,
  validateLogin,
  securityHeaders
} = require('../middleware/customAuth');

// Apply security headers to all routes
router.use(securityHeaders);

// Public routes (no authentication required)

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 * @rateLimit 3 requests per hour
 */
router.post('/register', 
  registerRateLimiter,
  validateRegistration,
  register
);

/**
 * @route POST /api/auth/login
 * @desc Login user
 * @access Public
 * @rateLimit 5 requests per 15 minutes
 */
router.post('/login', 
  loginRateLimiter,
  validateLogin,
  login
);

/**
 * @route POST /api/auth/test-login
 * @desc Quick test user login (for development/demo)
 * @access Public
 * @rateLimit 5 requests per 15 minutes
 */
router.post('/test-login', loginRateLimiter, async (req, res) => {
  try {
    // Auto-fill test credentials
    req.body = {
      email: 'test@wildlife.com',
      password: 'wildlife123'
    };
    
    // Call the login function
    await login(req, res);
  } catch (error) {
    console.error('Test login error:', error);
    res.status(500).json({
      success: false,
      message: 'Test login failed'
    });
  }
});

// Protected routes (authentication required)

/**
 * @route POST /api/auth/logout
 * @desc Logout user
 * @access Private
 */
router.post('/logout',
  apiRateLimiter,
  authenticateToken,
  logout
);

/**
 * @route GET /api/auth/profile
 * @desc Get user profile
 * @access Private
 */
router.get('/profile',
  apiRateLimiter,
  authenticateToken,
  getProfile
);

/**
 * @route PUT /api/auth/profile
 * @desc Update user profile
 * @access Private
 */
router.put('/profile',
  apiRateLimiter,
  authenticateToken,
  updateProfile
);

/**
 * @route PUT /api/auth/change-password
 * @desc Change user password
 * @access Private
 */
router.put('/change-password',
  apiRateLimiter,
  authenticateToken,
  changePassword
);

/**
 * @route DELETE /api/auth/delete-account
 * @desc Delete user account
 * @access Private
 */
router.delete('/delete-account',
  apiRateLimiter,
  authenticateToken,
  deleteAccount
);

/**
 * @route GET /api/auth/verify-token
 * @desc Verify if token is valid
 * @access Private
 */
router.get('/verify-token',
  apiRateLimiter,
  authenticateToken,
  (req, res) => {
    res.json({
      success: true,
      message: 'Token is valid',
      data: {
        user: req.user
      }
    });
  }
);

/**
 * @route GET /api/auth/status
 * @desc Get authentication status and rate limit info
 * @access Public
 */
router.get('/status', apiRateLimiter, (req, res) => {
  res.json({
    success: true,
    message: 'Authentication service is running',
    data: {
      timestamp: new Date().toISOString(),
      rateLimit: {
        remaining: res.get('X-RateLimit-Remaining'),
        limit: res.get('X-RateLimit-Limit'),
        reset: res.get('X-RateLimit-Reset')
      },
      testCredentials: {
        email: 'test@wildlife.com',
        password: 'wildlife123',
        note: 'Use these credentials for testing'
      }
    }
  });
});

// Error handling middleware for auth routes
router.use((error, req, res, next) => {
  console.error('Auth route error:', error);
  
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: Object.values(error.errors).map(err => err.message)
    });
  }
  
  if (error.code === 11000) {
    return res.status(409).json({
      success: false,
      message: 'Email already exists'
    });
  }
  
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
});

module.exports = router;
