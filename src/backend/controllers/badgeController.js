const Badge = require('../models/Badge');
const User = require('../models/User');
// @desc    Get user badges
// @route   GET /api/badges/user
// @access  Private
exports.getUserBadges = async (req, res) => {
  try {
    const badges = await Badge.find({
      user_id: req.user.id
    });
    res.status(200).json({
      success: true,
      data: badges
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};
// @desc    Award badge to user
// @route   POST /api/badges
// @access  Private (could be restricted to admin or system)
exports.awardBadge = async (req, res) => {
  try {
    const {
      user_id,
      type
    } = req.body;
    // Check if user exists
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    // Check if user already has this badge
    const existingBadge = await Badge.findOne({
      user_id,
      type
    });
    if (existingBadge) {
      return res.status(400).json({
        success: false,
        error: 'User already has this badge'
      });
    }
    // Create badge
    const badge = await Badge.create({
      user_id,
      type
    });
    res.status(201).json({
      success: true,
      data: badge
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};
// @desc    Get leaderboard
// @route   GET /api/badges/leaderboard
// @access  Public
exports.getLeaderboard = async (req, res) => {
  try {
    // Aggregate to count badges per user and join with user data
    const leaderboard = await Badge.aggregate([{
      $group: {
        _id: '$user_id',
        count: {
          $sum: 1
        }
      }
    }, {
      $sort: {
        count: -1
      }
    }, {
      $limit: 10
    }, {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'user'
      }
    }, {
      $unwind: '$user'
    }, {
      $project: {
        _id: 0,
        id: '$_id',
        name: '$user.name',
        avatar_url: '$user.avatar_url',
        badges: {
          count: '$count'
        }
      }
    }]);
    res.status(200).json({
      success: true,
      data: leaderboard
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};