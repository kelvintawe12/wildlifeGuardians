const User = require('../models/User');
const jwt = require('jsonwebtoken');
// Generate JWT token
const generateToken = id => {
  return jwt.sign({
    id
  }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};
// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const {
      name,
      email,
      password
    } = req.body;
    // Check if user already exists
    const userExists = await User.findOne({
      email
    });
    if (userExists) {
      return res.status(400).json({
        success: false,
        error: 'User already exists'
      });
    }
    // Create user
    const user = await User.create({
      name,
      email,
      password
    });
    // Return JWT token
    res.status(201).json({
      success: true,
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar_url: user.avatar_url
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};
// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;
    // Check for user
    const user = await User.findOne({
      email
    }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }
    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }
    // Return JWT token
    res.status(200).json({
      success: true,
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar_url: user.avatar_url
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};
// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar_url: user.avatar_url
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};
// @desc    Update user profile
// @route   PUT /api/auth/updateprofile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const {
      name,
      avatar_url
    } = req.body;
    // Build update object
    const updateFields = {};
    if (name) updateFields.name = name;
    if (avatar_url) updateFields.avatar_url = avatar_url;
    updateFields.updated_at = Date.now();
    // Update user
    const user = await User.findByIdAndUpdate(req.user.id, updateFields, {
      new: true
    });
    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar_url: user.avatar_url
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};