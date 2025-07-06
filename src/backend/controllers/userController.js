const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
exports.getProfile = async (req, res) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', req.user.id)
      .single();

    if (error || !user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar_url: user.avatar_url || null,
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
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar_url: user.avatar_url || null
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
    const { count: badgesCount, error: badgesError } = await supabase
      .from('badges')
      .select('user_id', { count: 'exact', head: true })
      .eq('user_id', req.user.id);

    if (badgesError) {
      throw badgesError;
    }

    // Get completed quizzes count
    const { count: quizzesCount, error: quizzesError } = await supabase
      .from('quiz_results')
      .select('user_id', { count: 'exact', head: true })
      .eq('user_id', req.user.id);

    if (quizzesError) {
      throw quizzesError;
    }

    // Get average quiz score
    const { data: averageScoreResult, error: avgError } = await supabase
      .from('quiz_results')
      .select('score')
      .eq('user_id', req.user.id);

    if (avgError) {
      throw avgError;
    }

    const scores = averageScoreResult.map(r => r.score);
    const averageScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;

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
