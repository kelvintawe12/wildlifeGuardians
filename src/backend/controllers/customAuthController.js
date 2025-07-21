const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const Joi = require('joi');

// Mock database - replace with your actual database
let users = [];
let userProfiles = [];
let userSessions = [];

// Validation schemas
const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(128).required()
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

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 12);
};

const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const findUserByEmail = (email) => {
  return users.find(user => user.email.toLowerCase() === email.toLowerCase());
};

const findUserById = (userId) => {
  return users.find(user => user.id === userId);
};

const createUserSession = (userId, token, req) => {
  const sessionId = uuidv4();
  const session = {
    id: sessionId,
    user_id: userId,
    token_hash: bcrypt.hashSync(token, 10),
    expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    created_at: new Date(),
    ip_address: req.ip || req.connection.remoteAddress,
    user_agent: req.get('User-Agent'),
    is_active: true
  };
  
  userSessions.push(session);
  return session;
};

// Test credentials
const initializeTestUser = async () => {
  const testUserExists = findUserByEmail('sarah.wilson@wildlifeconservation.org');
  if (!testUserExists) {
    const testUserId = uuidv4();
    const hashedPassword = await hashPassword('Conservation2024!');
    
    const testUser = {
      id: testUserId,
      email: 'sarah.wilson@wildlifeconservation.org',
      password_hash: hashedPassword,
      name: 'Dr. Sarah Wilson',
      profile_picture: 'https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=150&h=150&fit=crop&crop=face',
      created_at: new Date(),
      updated_at: new Date(),
      email_verified: true,
      is_active: true,
      last_login: null
    };
    
    const testProfile = {
      id: uuidv4(),
      user_id: testUserId,
      bio: 'Marine biologist and wildlife conservationist with over 10 years of experience protecting endangered species. Passionate about educating others on conservation efforts.',
      location: 'Kenya Wildlife Research Center',
      interests: ['Marine Biology', 'Endangered Species', 'Conservation Education', 'Ecosystem Restoration'],
      conservation_level: 'Expert',
      total_points: 2850,
      badges_earned: 12,
      quizzes_completed: 45,
      favorite_animals: ['African Elephant', 'Mountain Gorilla', 'Green Sea Turtle'],
      created_at: new Date(),
      updated_at: new Date()
    };
    
    users.push(testUser);
    userProfiles.push(testProfile);
    console.log('✅ Test user initialized: sarah.wilson@wildlifeconservation.org / Conservation2024!');
  }
};

// Initialize test user on startup
initializeTestUser();

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
    const existingUser = findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user
    const userId = uuidv4();
    const newUser = {
      id: userId,
      email: email.toLowerCase(),
      password_hash: passwordHash,
      name,
      profile_picture: null,
      created_at: new Date(),
      updated_at: new Date(),
      email_verified: false,
      is_active: true,
      last_login: null
    };

    // Create user profile
    const profileId = uuidv4();
    const newProfile = {
      id: profileId,
      user_id: userId,
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

    // Save to "database"
    users.push(newUser);
    userProfiles.push(newProfile);

    // Generate JWT token
    const token = generateToken(userId);

    // Create session
    createUserSession(userId, token, req);

    // Log successful registration
    console.log(`User registered successfully: ${email} (ID: ${userId})`);

    // Return user data (without password)
    const { password_hash, ...userWithoutPassword } = newUser;
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: userWithoutPassword,
        profile: newProfile,
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

    // Find user
    const user = findUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check if user is active
    if (!user.is_active) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated'
      });
    }

    // Verify password
    const isPasswordValid = await verifyPassword(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Update last login
    user.last_login = new Date();

    // Find user profile
    const profile = userProfiles.find(p => p.user_id === user.id);

    // Generate JWT token
    const token = generateToken(user.id);

    // Create session
    createUserSession(user.id, token, req);

    // Log successful login
    console.log(`User logged in successfully: ${email} (ID: ${user.id})`);

    // Return user data (without password)
    const { password_hash, ...userWithoutPassword } = user;
    
    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: userWithoutPassword,
        profile: profile || null,
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
