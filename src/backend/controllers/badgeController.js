const Joi = require('joi');

// Validation schemas
const badgeSchema = Joi.object({
  user_id: Joi.string().required(),
  type: Joi.string().min(3).max(100).required(),
  description: Joi.string().optional(),
  icon: Joi.string().optional()
});

// Badge types and their criteria
const BADGE_TYPES = {
  'First Quiz Completed': {
    description: 'Completed your first quiz',
    icon: '🎯',
    rarity: 'common'
  },
  'Quiz Master': {
    description: 'Achieved perfect score on a quiz',
    icon: '🏆',
    rarity: 'legendary'
  },
  'Wildlife Expert': {
    description: 'Scored 80% or higher on a quiz',
    icon: '🦎',
    rarity: 'rare'
  },
  'Quick Learner': {
    description: 'Scored 70% or higher on a quiz',
    icon: '⚡',
    rarity: 'uncommon'
  },
  'Explorer': {
    description: 'Viewed 10 different animals',
    icon: '🗺️',
    rarity: 'common'
  },
  'Conservation Champion': {
    description: 'Completed 5 quizzes',
    icon: '🌱',
    rarity: 'rare'
  },
  'Animal Lover': {
    description: 'Viewed 50 different animals',
    icon: '❤️',
    rarity: 'epic'
  },
  'Knowledge Seeker': {
    description: 'Completed 10 quizzes',
    icon: '📚',
    rarity: 'epic'
  }
};

// @desc    Get user badges
// @route   GET /api/badges/user
// @access  Private
const getUserBadges = async (req, res) => {
  try {
    // For stateless demo: get user by email from query string
    const email = req.query.email;
    if (!email) {
      return res.status(400).json({ success: false, error: 'Email is required' });
    }
    // Get user id from profiles table
    const { data: user, error: userError } = await global.supabase
      .from('profiles')
      .select('id')
      .eq('email', email)
      .single();
    if (userError || !user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    const userId = user.id;
    const { data: badges, error } = await global.supabase
      .from('badges')
      .select('*')
      .eq('user_id', userId)
      .order('awarded_at', { ascending: false });
    if (error) {
      console.error('Get user badges error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch user badges'
      });
    }
    // Enrich badges with additional information
    const enrichedBadges = badges.map(badge => ({
      ...badge,
      ...BADGE_TYPES[badge.type],
      awarded_date: new Date(badge.awarded_at).toLocaleDateString()
    }));
    // Get badge statistics
    const stats = {
      total_badges: badges.length,
      common: badges.filter(b => BADGE_TYPES[b.type]?.rarity === 'common').length,
      uncommon: badges.filter(b => BADGE_TYPES[b.type]?.rarity === 'uncommon').length,
      rare: badges.filter(b => BADGE_TYPES[b.type]?.rarity === 'rare').length,
      epic: badges.filter(b => BADGE_TYPES[b.type]?.rarity === 'epic').length,
      legendary: badges.filter(b => BADGE_TYPES[b.type]?.rarity === 'legendary').length
    };
    res.status(200).json({
      success: true,
      data: {
        badges: enrichedBadges,
        statistics: stats,
        available_badges: Object.keys(BADGE_TYPES).length
      }
    });
  } catch (error) {
    console.error('Get user badges error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

// @desc    Get all available badge types
// @route   GET /api/badges/types
// @access  Public
const getBadgeTypes = async (req, res) => {
  try {
    const badgeTypes = Object.entries(BADGE_TYPES).map(([type, info]) => ({
      type,
      ...info
    }));

    res.status(200).json({
      success: true,
      data: {
        badge_types: badgeTypes
      }
    });
  } catch (error) {
    console.error('Get badge types error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

// @desc    Award badge to user
// @route   POST /api/badges
// @access  Private (System use only)
const awardBadge = async (req, res) => {
  try {
    // Validate request body
    const { error, value } = badgeSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details[0].message
      });
    }

    const { user_id, type, description, icon } = value;

    // Validate badge type
    if (!BADGE_TYPES[type]) {
      return res.status(400).json({
        success: false,
        error: 'Invalid badge type'
      });
    }

    // Check if user exists
    const { data: user, error: userError } = await global.supabase
      .from('profiles')
      .select('id, name')
      .eq('id', user_id)
      .single();

    if (userError || !user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Check if user already has this badge
    const { data: existingBadge, error: checkError } = await global.supabase
      .from('badges')
      .select('*')
      .eq('user_id', user_id)
      .eq('type', type)
      .single();

    if (existingBadge) {
      return res.status(400).json({
        success: false,
        error: 'User already has this badge'
      });
    }

    // Award the badge
    const badgeData = {
      user_id,
      type,
      description: description || BADGE_TYPES[type].description,
      icon: icon || BADGE_TYPES[type].icon,
      awarded_at: new Date().toISOString()
    };

    const { data: badge, error: insertError } = await global.supabase
      .from('badges')
      .insert([badgeData])
      .select()
      .single();

    if (insertError) {
      console.error('Award badge error:', insertError);
      return res.status(500).json({
        success: false,
        error: 'Failed to award badge'
      });
    }

    res.status(201).json({
      success: true,
      message: 'Badge awarded successfully',
      data: {
        badge: {
          ...badge,
          ...BADGE_TYPES[type]
        }
      }
    });
  } catch (error) {
    console.error('Award badge error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

// @desc    Get badge leaderboard
// @route   GET /api/badges/leaderboard
// @access  Public
const getBadgeLeaderboard = async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    // Get badge counts per user
    const { data: badgeCounts, error } = await global.supabase
      .rpc('get_badge_leaderboard', { limit_count: parseInt(limit) });

    if (error) {
      console.error('Get badge leaderboard error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch badge leaderboard'
      });
    }

    // If RPC doesn't exist, fallback to manual query
    if (!badgeCounts) {
      const { data: badges, error: fallbackError } = await global.supabase
        .from('badges')
        .select(`
          user_id,
          profiles(name, avatar_url)
        `);

      if (fallbackError) {
        console.error('Fallback leaderboard error:', fallbackError);
        return res.status(500).json({
          success: false,
          error: 'Failed to fetch badge leaderboard'
        });
      }

      // Manual aggregation
      const userBadgeCounts = {};
      badges.forEach(badge => {
        if (!userBadgeCounts[badge.user_id]) {
          userBadgeCounts[badge.user_id] = {
            user_id: badge.user_id,
            user_name: badge.profiles?.name || 'Unknown',
            avatar_url: badge.profiles?.avatar_url,
            badge_count: 0
          };
        }
        userBadgeCounts[badge.user_id].badge_count++;
      });

      const leaderboard = Object.values(userBadgeCounts)
        .sort((a, b) => b.badge_count - a.badge_count)
        .slice(0, parseInt(limit));

      return res.status(200).json({
        success: true,
        data: {
          leaderboard
        }
      });
    }

    res.status(200).json({
      success: true,
      data: {
        leaderboard: badgeCounts
      }
    });
  } catch (error) {
    console.error('Get badge leaderboard error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

// @desc    Check and award progress badges
// @route   POST /api/badges/check-progress
// @access  Private
const checkProgressBadges = async (req, res) => {
  try {
    const userId = req.user.id;
    const newBadges = [];

    // Get user's current badges
    const { data: existingBadges } = await global.supabase
      .from('badges')
      .select('type')
      .eq('user_id', userId);

    const existingBadgeTypes = existingBadges ? existingBadges.map(b => b.type) : [];

    // Get user's quiz results count
    const { count: quizCount } = await global.supabase
      .from('quiz_results')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    // Check for quiz completion badges
    const quizBadges = [
      { type: 'Conservation Champion', threshold: 5 },
      { type: 'Knowledge Seeker', threshold: 10 }
    ];

    for (const badge of quizBadges) {
      if (quizCount >= badge.threshold && !existingBadgeTypes.includes(badge.type)) {
        const { data: newBadge, error } = await global.supabase
          .from('badges')
          .insert([{
            user_id: userId,
            type: badge.type,
            awarded_at: new Date().toISOString()
          }])
          .select()
          .single();

        if (!error && newBadge) {
          newBadges.push({
            ...newBadge,
            ...BADGE_TYPES[badge.type]
          });
        }
      }
    }

    res.status(200).json({
      success: true,
      data: {
        new_badges: newBadges,
        message: newBadges.length > 0 
          ? `Congratulations! You earned ${newBadges.length} new badge(s)!` 
          : 'No new badges at this time. Keep exploring!'
      }
    });
  } catch (error) {
    console.error('Check progress badges error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

module.exports = {
  getUserBadges,
  getBadgeTypes,
  awardBadge,
  getBadgeLeaderboard,
  checkProgressBadges
};
