const Quiz = require('../models/Quiz');
const QuizResult = require('../models/QuizResult');
const Badge = require('../models/Badge');
// @desc    Get all quizzes
// @route   GET /api/quizzes
// @access  Public
exports.getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().select('id title description image_url');
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
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
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
    const quiz = await Quiz.create(req.body);
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
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, {
      ...req.body,
      updated_at: Date.now()
    }, {
      new: true,
      runValidators: true
    });
    if (!quiz) {
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
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({
        success: false,
        error: 'Quiz not found'
      });
    }
    await quiz.remove();
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
    const {
      quiz_id,
      score
    } = req.body;
    const user_id = req.user.id;
    // Create quiz result
    const quizResult = await QuizResult.create({
      user_id,
      quiz_id,
      score
    });
    // Check if user should earn a badge (score >= 80%)
    if (score >= 80) {
      const quiz = await Quiz.findById(quiz_id);
      if (quiz) {
        const badgeType = `${quiz.title} Expert`;
        // Check if user already has this badge
        const existingBadge = await Badge.findOne({
          user_id,
          type: badgeType
        });
        // If not, award the badge
        if (!existingBadge) {
          await Badge.create({
            user_id,
            type: badgeType
          });
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
    const quizResults = await QuizResult.find({
      user_id: req.user.id
    }).populate('quiz_id', 'title').sort({
      completed_at: -1
    });
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