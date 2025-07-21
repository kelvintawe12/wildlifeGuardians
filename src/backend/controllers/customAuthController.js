const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const Joi = require('joi');
const User = require('../models/User');

// Validation schemas
const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(128).required(),
  confirmPassword: Joi.any().optional()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const updateProfileSchema = Joi.object({
  name: Joi.string().min(2).max(50),
  bio: Joi.string().max(500),
  location: Joi.string().max(100),
  interests: Joi.array().items(Joi.string()),
  conservation_level: Joi.string().valid('Beginner', 'Intermediate', 'Advanced', 'Expert'),
  favorite_animals: Joi.array().items(Joi.string())
});

// Helper functions
const generateToken = (userId) => {
  return jwt.sign(
    { userId, type: 'access' },
    process.env.JWT_SECRET || 'wildlife_guardians_secret_key_2025',
    { expiresIn: '7d' }
  );
};

const createUserSession = (userId, token, req) => {
  // Session management can be implemented here if needed
  return null;
};

// Controllers
const register = async (req, res) => {
  try {
    // Validate input
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map(detail => detail.message)
      });
    }

    const { name, email, password } = value;

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Create user document
    const newUser = new User({
      name,
      email: email.toLowerCase(),
      password
    });

    // Save user to database (password will be hashed by pre-save hook)
    await newUser.save();

    // Generate JWT token
    const token = generateToken(newUser._id);

    // Create session if needed
    createUserSession(newUser._id, token, req);

    // Return user data (without password)
    const userWithoutPassword = {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      avatar_url: newUser.avatar_url,
      created_at: newUser.created_at,
      updated_at: newUser.updated_at
    };

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: userWithoutPassword,
        token
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during registration'
    });
  }
};

const login = async (req, res) => {
  try {
    // Validate input
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map(detail => detail.message)
      });
    }

    const { email, password } = value;

    // Find user by email and select password field
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Verify password using model method
    const isPasswordValid = await user.matchPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate JWT token
    const token = generateToken(user._id);

    // Create session if needed
    createUserSession(user._id, token, req);

    // Return user data (without password)
    const userWithoutPassword = {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar_url: user.avatar_url,
      created_at: user.created_at,
      updated_at: user.updated_at
    };

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: userWithoutPassword,
        token
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during login'
    });
  }
};

const logout = async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (token) {
      // Deactivate session
      const session = userSessions.find(s => 
        s.user_id === req.user.userId && s.is_active
      );
      if (session) {
        session.is_active = false;
      }
    }

    res.json({
      success: true,
      message: 'Logout successful'
    });

  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during logout'
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = findUserById(req.user.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const profile = userProfiles.find(p => p.user_id === user.id);
    const { password_hash, ...userWithoutPassword } = user;

    res.json({
      success: true,
      data: {
        user: userWithoutPassword,
        profile: profile || null
      }
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    // Validate input
    const { error, value } = updateProfileSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map(detail => detail.message)
      });
    }

    const user = findUserById(req.user.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update user basic info
    if (value.name) {
      user.name = value.name;
      user.updated_at = new Date();
    }

    // Update or create profile
    let profile = userProfiles.find(p => p.user_id === user.id);
    if (!profile) {
      profile = {
        id: uuidv4(),
        user_id: user.id,
        bio: null,
        location: null,
        interests: [],
        conservation_level: 'Beginner',
        total_points: 0,
        badges_earned: 0,
        quizzes_completed: 0,
        favorite_animals: [],
        created_at: new Date(),
        updated_at: new Date()
      };
      userProfiles.push(profile);
    }

    // Update profile fields
    Object.keys(value).forEach(key => {
      if (key !== 'name' && value[key] !== undefined) {
        profile[key] = value[key];
      }
    });
    profile.updated_at = new Date();

    const { password_hash, ...userWithoutPassword } = user;

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        user: userWithoutPassword,
        profile
      }
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    // Validate input
    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'All password fields are required'
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'New passwords do not match'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters long'
      });
    }

    const user = findUserById(req.user.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Verify current password
    const isCurrentPasswordValid = await verifyPassword(currentPassword, user.password_hash);
    if (!isCurrentPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Hash new password
    user.password_hash = await hashPassword(newPassword);
    user.updated_at = new Date();

    // Invalidate all existing sessions except current one
    userSessions.forEach(session => {
      if (session.user_id === user.id) {
        session.is_active = false;
      }
    });

    res.json({
      success: true,
      message: 'Password changed successfully'
    });

  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: 'Password is required to delete account'
      });
    }

    const user = findUserById(req.user.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Verify password
    const isPasswordValid = await verifyPassword(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Password is incorrect'
      });
    }

    // Remove user data
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex > -1) {
      users.splice(userIndex, 1);
    }

    // Remove profile
    const profileIndex = userProfiles.findIndex(p => p.user_id === user.id);
    if (profileIndex > -1) {
      userProfiles.splice(profileIndex, 1);
    }

    // Remove sessions
    userSessions = userSessions.filter(s => s.user_id !== user.id);

    res.json({
      success: true,
      message: 'Account deleted successfully'
    });

  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Export all functions
module.exports = {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
  changePassword,
  deleteAccount,
  generateToken,
  findUserById
};
