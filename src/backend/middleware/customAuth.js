const jwt = require('jsonwebtoken');
const { findUserById } = require('../controllers/customAuthController');

// Rate limiting storage (in production, use Redis)
const rateLimitStore = new Map();

// JWT Authentication Middleware
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.startsWith('Bearer ') 
      ? authHeader.substring(7) 
      : null;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token is required'
      });
    }

    // Verify JWT token
    const decoded = jwt.verify(
      token, 
      process.env.JWT_SECRET || 'wildlife_guardians_secret_key_2025'
    );

    // Check if user still exists
    const user = findUserById(decoded.userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if user is active
    if (!user.is_active) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated'
      });
    }

    // Add user info to request
    req.user = {
      userId: decoded.userId,
      email: user.email,
      name: user.name
    };

    next();

  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid access token'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Access token has expired'
      });
    }

    console.error('Authentication error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error during authentication'
    });
  }
};

// Optional Authentication Middleware (for public endpoints that can benefit from user context)
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.startsWith('Bearer ') 
      ? authHeader.substring(7) 
      : null;

    if (token) {
      try {
        const decoded = jwt.verify(
          token, 
          process.env.JWT_SECRET || 'wildlife_guardians_secret_key_2025'
        );

        const user = findUserById(decoded.userId);
        if (user && user.is_active) {
          req.user = {
            userId: decoded.userId,
            email: user.email,
            name: user.name
          };
        }
      } catch (error) {
        // Ignore token errors for optional auth
        console.log('Optional auth token error:', error.message);
      }
    }

    next();

  } catch (error) {
    console.error('Optional authentication error:', error);
    next(); // Continue without authentication
  }
};

// Rate Limiting Middleware
const rateLimiter = (maxRequests = 5, windowMs = 15 * 60 * 1000) => {
  return (req, res, next) => {
    const key = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    
    // Clean old entries
    for (const [ip, data] of rateLimitStore.entries()) {
      if (now - data.windowStart > windowMs) {
        rateLimitStore.delete(ip);
      }
    }
    
    // Check current IP
    const clientData = rateLimitStore.get(key) || {
      count: 0,
      windowStart: now
    };
    
    // Reset window if expired
    if (now - clientData.windowStart > windowMs) {
      clientData.count = 0;
      clientData.windowStart = now;
    }
    
    clientData.count++;
    rateLimitStore.set(key, clientData);
    
    // Add rate limit headers
    res.set({
      'X-RateLimit-Limit': maxRequests,
      'X-RateLimit-Remaining': Math.max(0, maxRequests - clientData.count),
      'X-RateLimit-Reset': new Date(clientData.windowStart + windowMs).toISOString()
    });
    
    if (clientData.count > maxRequests) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests. Please try again later.',
        retryAfter: Math.ceil((clientData.windowStart + windowMs - now) / 1000)
      });
    }
    
    next();
  };
};

// Login Rate Limiting (stricter)
const loginRateLimiter = rateLimiter(5, 15 * 60 * 1000); // 5 attempts per 15 minutes

// Registration Rate Limiting
const registerRateLimiter = rateLimiter(3, 60 * 60 * 1000); // 3 attempts per hour

// General API Rate Limiting
const apiRateLimiter = rateLimiter(100, 15 * 60 * 1000); // 100 requests per 15 minutes

// Validation Middleware
const validateRegistration = (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  
  const errors = [];
  
  if (!name || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }
  
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    errors.push('Valid email address is required');
  }
  
  if (!password || password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }
  
  if (password !== confirmPassword) {
    errors.push('Passwords do not match');
  }
  
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }
  
  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required'
    });
  }
  
  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Valid email address is required'
    });
  }
  
  next();
};

// Security Headers Middleware
const securityHeaders = (req, res, next) => {
  res.set({
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;"
  });
  next();
};

// CORS Configuration for Authentication
const allowedOrigins = [
  'http://localhost:3000',
  process.env.FRONTEND_URL || 'https://wildlife-guardiansrwanda.vercel.app'
];

const corsOptions = {
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['X-RateLimit-Limit', 'X-RateLimit-Remaining', 'X-RateLimit-Reset']
};

module.exports = {
  authenticateToken,
  optionalAuth,
  rateLimiter,
  loginRateLimiter,
  registerRateLimiter,
  apiRateLimiter,
  validateRegistration,
  validateLogin,
  securityHeaders,
  corsOptions
};
