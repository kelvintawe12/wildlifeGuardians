const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

// Validation schemas
const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().min(2).max(50).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d'
  });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    // Validate request body
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details[0].message
      });
    }

    const { email, password, name } = value;

    // Create user in Supabase Auth using regular signup
    const { data: authData, error: authError } = await global.supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name
        }
      }
    });

    if (authError) {
      console.error('Supabase auth error:', authError);
      
      // Check for existing user error
      if (authError.message.includes('already registered')) {
        return res.status(400).json({
          success: false,
          error: 'User already exists with this email'
        });
      }
      
      return res.status(400).json({
        success: false,
        error: authError.message
      });
    }

    if (!authData.user) {
      return res.status(400).json({
        success: false,
        error: 'Failed to create user'
      });
    }

    // Create user profile in profiles table
    const { data: profile, error: profileError } = await global.supabase
      .from('profiles')
      .insert([
        {
          id: authData.user.id,
          name,
          email,
          avatar_url: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (profileError) {
      console.error('Profile creation error:', profileError);
      // Try to clean up auth user if profile creation fails
      await global.supabase.auth.admin.deleteUser(authData.user.id);
      return res.status(500).json({
        success: false,
        error: 'Failed to create user profile'
      });
    }

    // Generate JWT token
    const token = generateToken(authData.user.id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          avatar_url: profile.avatar_url
        },
        token
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error during registration'
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    // Validate request body
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details[0].message
      });
    }

    const { email, password } = value;

    // Sign in with Supabase
    const { data: authData, error: authError } = await global.supabase.auth
      .signInWithPassword({
        email,
        password
      });

    if (authError) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Get user profile
    const { data: profile, error: profileError } = await global.supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (profileError) {
      console.error('Profile fetch error:', profileError);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch user profile'
      });
    }

    // Generate custom JWT token
    const token = generateToken(authData.user.id);

    res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      data: {
        user: {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          avatar_url: profile.avatar_url
        },
        token,
        supabaseToken: authData.session.access_token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error during login'
    });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = req.user;
    
    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar_url: user.avatar_url,
          created_at: user.created_at
        }
      }
    });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user information'
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const { name, avatar_url } = req.body;
    const userId = req.user.id;

    const updateData = { updated_at: new Date().toISOString() };
    if (name) updateData.name = name;
    if (avatar_url !== undefined) updateData.avatar_url = avatar_url;

    const { data: profile, error } = await global.supabase
      .from('profiles')
      .update(updateData)
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      console.error('Profile update error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to update profile'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        user: profile
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error during profile update'
    });
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
const logout = async (req, res) => {
  try {
    // Sign out from Supabase (if using Supabase session)
    if (req.authUser) {
      await global.supabase.auth.signOut();
    }

    res.status(200).json({
      success: true,
      message: 'User logged out successfully'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to logout'
    });
  }
};

module.exports = {
  register,
  login,
  getMe,
  updateProfile,
  logout
};
