const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// @desc    Get all quizzes
// @route   GET /api/quizzes
// @access  Public
exports.getQuizzes = async (req, res) => {
  try {
    const { data: quizzes, error } = await supabase
      .from('quizzes')
      .select('id, title, description, image_url');

    if (error) {
      throw error;
    }

    res.status(200).json({
      success: true,
      data: quizzes
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get single quiz
// @route   GET /api/quizzes/:id
// @access  Public
exports.getQuizById = async (req, res) => {
  try {
    const { data: quiz, error } = await supabase
      .from('quizzes')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error || !quiz) {
      return res.status(404).json({
        success: false,
        error: 'Quiz not found'
      });
    }

    res.status(200).json({
      success: true,
      data: quiz
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Create a new quiz
// @route   POST /api/quizzes
// @access  Private (Admin only)
exports.createQuiz = async (req, res) => {
  try {
    const { data: quiz, error } = await supabase
      .from('quizzes')
      .insert([req.body])
      .single();

    if (error) {
      throw error;
    }

    res.status(201).json({
      success: true,
      data: quiz
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update quiz
// @route   PUT /api/quizzes/:id
// @access  Private (Admin only)
exports.updateQuiz = async (req, res) => {
  try {
    const { data: quiz, error } = await supabase
      .from('quizzes')
      .update({ ...req.body, updated_at: new Date().toISOString() })
      .eq('id', req.params.id)
      .single();

    if (error || !quiz) {
      return res.status(404).json({
        success: false,
        error: 'Quiz not found'
      });
    }

    res.status(200).json({
      success: true,
      data: quiz
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Delete quiz
// @route   DELETE /api/quizzes/:id
// @access  Private (Admin only)
exports.deleteQuiz = async (req, res) => {
  try {
    const { data: quiz, error } = await supabase
      .from('quizzes')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error || !quiz) {
      return res.status(404).json({
        success: false,
        error: 'Quiz not found'
      });
    }

    const { error: deleteError } = await supabase
      .from('quizzes')
      .delete()
      .eq('id', req.params.id);

    if (deleteError) {
      throw deleteError;
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Save quiz result
// @route   POST /api/quizzes/results
// @access  Private
exports.saveQuizResult = async (req, res) => {
  try {
    const { quiz_id, score } = req.body;
    const user_id = req.user.id;

    // Create quiz result
    const { data: quizResult, error } = await supabase
      .from('quiz_results')
      .insert([{ user_id, quiz_id, score }])
      .single();

    if (error) {
      throw error;
    }

    // Check if user should earn a badge (score >= 80%)
    if (score >= 80) {
      const { data: quiz, error: quizError } = await supabase
        .from('quizzes')
        .select('title')
        .eq('id', quiz_id)
        .single();

      if (!quizError && quiz) {
        const badgeType = `${quiz.title} Expert`;

        // Check if user already has this badge
        const { data: existingBadge, error: badgeError } = await supabase
          .from('badges')
          .select('*')
          .eq('user_id', user_id)
          .eq('type', badgeType)
          .single();

        // If not, award the badge
        if (!existingBadge) {
          await supabase.from('badges').insert([{ user_id, type: badgeType }]);
        }
      }
    }

    res.status(201).json({
      success: true,
      data: quizResult
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get user quiz results
// @route   GET /api/quizzes/results/user
// @access  Private
exports.getUserQuizResults = async (req, res) => {
  try {
    const { data: quizResults, error } = await supabase
      .from('quiz_results')
      .select('*, quizzes(title)')
      .eq('user_id', req.user.id)
      .order('completed_at', { ascending: false });

    if (error) {
      throw error;
    }

    res.status(200).json({
      success: true,
      data: quizResults
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};
