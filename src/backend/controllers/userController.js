const User = require('../models/User');
const Badge = require('../models/Badge');
const QuizResult = require('../models/QuizResult');
// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar_url: user.avatar_url,
        created_at: user.created_at
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
// @route   PUT /api/users/profile
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
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    res.status(200).json({
      success: true,
      data: {
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
// @desc    Get user stats
// @route   GET /api/users/stats
// @access  Private
exports.getUserStats = async (req, res) => {
  try {
    // Get badges count
    const badgesCount = await Badge.countDocuments({
      user_id: req.user.id
    });
    // Get completed quizzes count
    const quizzesCount = await QuizResult.countDocuments({
      user_id: req.user.id
    });
    // Get average quiz score
    const averageScoreResult = await QuizResult.aggregate([{
      $match: {
        user_id: req.user.id
      }
    }, {
      $group: {
        _id: null,
        averageScore: {
          $avg: '$score'
        }
      }
    }]);
    const averageScore = averageScoreResult.length > 0 ? Math.round(averageScoreResult[0].averageScore) : 0;
    res.status(200).json({
      success: true,
      data: {
        badges_count: badgesCount,
        quizzes_completed: quizzesCount,
        average_score: averageScore
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};