const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// @desc    Get user badges
// @route   GET /api/badges/user
// @access  Private
exports.getUserBadges = async (req, res) => {
  try {
    const { data: badges, error } = await supabase
      .from('badges')
      .select('*')
      .eq('user_id', req.user.id);

    if (error) {
      throw error;
    }

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
    const { user_id, type } = req.body;

    // Check if user exists
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user_id)
      .single();

    if (userError || !user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Check if user already has this badge
    const { data: existingBadge, error: badgeError } = await supabase
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

    // Create badge
    const { data: badge, error: createError } = await supabase
      .from('badges')
      .insert([{ user_id, type }])
      .single();

    if (createError) {
      throw createError;
    }

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
    // Get badges count per user
    const { data: badgesCount, error: countError } = await supabase
      .from('badges')
      .select('user_id, count:user_id', { count: 'exact', head: false })
      .group('user_id')
      .order('count', { ascending: false })
      .limit(10);

    if (countError) {
      throw countError;
    }

    // Fetch user details for leaderboard
    const userIds = badgesCount.map(badge => badge.user_id);
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id, name, avatar_url')
      .in('id', userIds);

    if (usersError) {
      throw usersError;
    }

    // Map badges count to users
    const leaderboard = users.map(user => {
      const badge = badgesCount.find(b => b.user_id === user.id);
      return {
        id: user.id,
        name: user.name,
        avatar_url: user.avatar_url,
        badges: {
          count: badge ? badge.count : 0
        }
      };
    });

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
