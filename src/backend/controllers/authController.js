const { createClient } = require('@supabase/supabase-js');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// Generate JWT token
const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const { data: existingUser, error: existingUserError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(400).json({ success: false, error: 'User already exists' });
    }

    // Create user using Supabase auth
    const { user, error: signUpError } = await supabase.auth.api.createUser({
      email,
      password,
      user_metadata: { name }
    });

    if (signUpError) {
      return res.status(400).json({ success: false, error: signUpError.message });
    }

    // Return JWT token
    res.status(201).json({
      success: true,
      token: generateToken(user.id),
      user: {
        id: user.id,
        name: user.user_metadata.name,
        email: user.email,
        avatar_url: user.user_metadata.avatar_url || null
      }
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { user, error: signInError } = await supabase.auth.api.signInWithEmail(email, password);

    if (signInError || !user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    // Return JWT token
    res.status(200).json({
      success: true,
      token: generateToken(user.id),
      user: {
        id: user.id,
        name: user.user_metadata.name,
        email: user.email,
        avatar_url: user.user_metadata.avatar_url || null
      }
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', req.user.id)
      .single();

    if (error || !user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar_url: user.avatar_url || null
      }
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/updateprofile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const { name, avatar_url } = req.body;

    const updateFields = {};
    if (name) updateFields.name = name;
    if (avatar_url) updateFields.avatar_url = avatar_url;
    updateFields.updated_at = new Date().toISOString();

    const { data: user, error } = await supabase
      .from('users')
      .update(updateFields)
      .eq('id', req.user.id)
      .single();

    if (error || !user) {
      return res.status(404).json({ success: false, error: 'User not found or update failed' });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar_url: user.avatar_url || null
      }
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
