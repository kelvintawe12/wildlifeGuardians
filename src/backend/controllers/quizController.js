const Joi = require('joi');

// Validation schemas
const questionSchema = Joi.object({
  text: Joi.string().min(10).required(),
  options: Joi.array().items(Joi.string()).min(2).max(6).required(),
  correct_answer: Joi.number().integer().min(0).required()
});

const quizSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).required(),
  image_url: Joi.string().uri().required(),
  questions: Joi.array().items(questionSchema).min(1).required(),
  difficulty: Joi.string().valid('easy', 'medium', 'hard').default('medium'),
  category: Joi.string().default('general'),
  time_limit: Joi.number().integer().min(30).default(300) // seconds
});

const quizResultSchema = Joi.object({
  quiz_id: Joi.string().required(),
  score: Joi.number().integer().min(0).required(),
  total_questions: Joi.number().integer().min(1).required(),
  time_taken: Joi.number().integer().min(0).optional(),
  answers: Joi.array().items(
    Joi.object({
      question_index: Joi.number().integer().min(0).required(),
      selected_answer: Joi.number().integer().min(0).required(),
      is_correct: Joi.boolean().required()
    })
  ).optional()
});

// @desc    Get all quizzes with filtering and pagination
// @route   GET /api/quizzes
// @access  Public
const getQuizzes = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 12, 
      search, 
      difficulty, 
      category,
      sort = 'created_at' 
    } = req.query;

    let query = global.supabase
      .from('quizzes')
      .select('*', { count: 'exact' });

    // Search functionality
    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }

    // Filter by difficulty
    if (difficulty) {
      query = query.eq('difficulty', difficulty);
    }

    // Filter by category
    if (category) {
      query = query.eq('category', category);
    }

    // Sorting
    const sortOrder = sort.startsWith('-') ? 'desc' : 'asc';
    const sortField = sort.replace('-', '');
    query = query.order(sortField, { ascending: sortOrder === 'asc' });

    // Pagination
    const offset = (page - 1) * limit;
    query = query.range(offset, offset + limit - 1);

    const { data: quizzes, error, count } = await query;

    if (error) {
      console.error('Get quizzes error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch quizzes'
      });
    }

    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      success: true,
      data: {
        quizzes,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalCount: count,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        },
        filters: {
          search,
          difficulty,
          category,
          sort
        }
      }
    });
  } catch (error) {
    console.error('Get quizzes error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

// @desc    Get single quiz by ID
// @route   GET /api/quizzes/:id
// @access  Public
const getQuizById = async (req, res) => {
  try {
    const { id } = req.params;
    const { include_answers } = req.query;

    let selectFields = '*';
    
    // Only include correct answers for authenticated admin users
    if (include_answers !== 'true') {
      // Remove correct answers from questions for security
      selectFields = 'id, title, description, image_url, difficulty, category, time_limit, created_at, updated_at, questions';
    }

    const { data: quiz, error } = await global.supabase
      .from('quizzes')
      .select(selectFields)
      .eq('id', id)
      .single();

    if (error || !quiz) {
      return res.status(404).json({
        success: false,
        error: 'Quiz not found'
      });
    }

    // Remove correct answers from questions if not explicitly requested
    if (include_answers !== 'true' && quiz.questions) {
      quiz.questions = quiz.questions.map(question => ({
        text: question.text,
        options: question.options
      }));
    }

    res.status(200).json({
      success: true,
      data: {
        quiz
      }
    });
  } catch (error) {
    console.error('Get quiz by ID error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch quiz'
    });
  }
};

// @desc    Create new quiz
// @route   POST /api/quizzes
// @access  Private (Admin only)
const createQuiz = async (req, res) => {
  try {
    // Validate request body
    const { error, value } = quizSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details[0].message
      });
    }

    // Validate that correct_answer indices are valid for each question
    const questions = value.questions;
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      if (question.correct_answer >= question.options.length) {
        return res.status(400).json({
          success: false,
          error: `Question ${i + 1}: correct_answer index is out of range`
        });
      }
    }

    const quizData = {
      ...value,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const { data: quiz, error: insertError } = await global.supabase
      .from('quizzes')
      .insert([quizData])
      .select()
      .single();

    if (insertError) {
      console.error('Create quiz error:', insertError);
      return res.status(500).json({
        success: false,
        error: 'Failed to create quiz'
      });
    }

    res.status(201).json({
      success: true,
      message: 'Quiz created successfully',
      data: {
        quiz
      }
    });
  } catch (error) {
    console.error('Create quiz error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

// @desc    Submit quiz answers and get results
// @route   POST /api/quizzes/:id/submit
// @access  Private
const submitQuiz = async (req, res) => {
  try {
    const { id: quizId } = req.params;
    const userId = req.user.id;
    
    // Validate request body
    const submitData = {
      quiz_id: quizId,
      ...req.body
    };
    
    const { error, value } = quizResultSchema.validate(submitData);
    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details[0].message
      });
    }

    // Get the quiz with correct answers
    const { data: quiz, error: quizError } = await global.supabase
      .from('quizzes')
      .select('*')
      .eq('id', quizId)
      .single();

    if (quizError || !quiz) {
      return res.status(404).json({
        success: false,
        error: 'Quiz not found'
      });
    }

    // Calculate score if answers are provided
    let calculatedScore = value.score;
    let detailedResults = [];
    
    if (value.answers && quiz.questions) {
      calculatedScore = 0;
      detailedResults = value.answers.map((answer, index) => {
        const question = quiz.questions[answer.question_index];
        const isCorrect = answer.selected_answer === question.correct_answer;
        if (isCorrect) calculatedScore++;
        
        return {
          question_index: answer.question_index,
          question_text: question.text,
          selected_answer: answer.selected_answer,
          correct_answer: question.correct_answer,
          is_correct: isCorrect,
          selected_option: question.options[answer.selected_answer],
          correct_option: question.options[question.correct_answer]
        };
      });
    }

    // Save quiz result
    const resultData = {
      user_id: userId,
      quiz_id: quizId,
      score: calculatedScore,
      total_questions: value.total_questions,
      time_taken: value.time_taken,
      answers: value.answers,
      completed_at: new Date().toISOString()
    };

    const { data: result, error: resultError } = await global.supabase
      .from('quiz_results')
      .insert([resultData])
      .select()
      .single();

    if (resultError) {
      console.error('Save quiz result error:', resultError);
      return res.status(500).json({
        success: false,
        error: 'Failed to save quiz result'
      });
    }

    // Check for new badges
    const newBadges = await checkAndAwardBadges(userId, calculatedScore, value.total_questions);

    // Calculate percentage
    const percentage = Math.round((calculatedScore / value.total_questions) * 100);

    res.status(200).json({
      success: true,
      message: 'Quiz submitted successfully',
      data: {
        result: {
          id: result.id,
          score: calculatedScore,
          total_questions: value.total_questions,
          percentage,
          time_taken: value.time_taken,
          detailed_results: detailedResults
        },
        new_badges: newBadges,
        quiz: {
          id: quiz.id,
          title: quiz.title,
          difficulty: quiz.difficulty
        }
      }
    });
  } catch (error) {
    console.error('Submit quiz error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

// @desc    Get user's quiz results
// @route   GET /api/quizzes/results
// @access  Public (modified to allow fetching without authentication)
const getUserQuizResults = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const offset = (page - 1) * limit;

    let query = global.supabase
      .from('quiz_results')
      .select('*, quiz:quizzes(id, title, description, image_url, difficulty)', { count: 'exact' })
      .order('completed_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // If user_id is provided as query param, filter by it
    if (req.query.user_id) {
      query = query.eq('user_id', req.query.user_id);
    }

    const { data: results, error, count } = await query;

    if (error) {
      console.error('Get user quiz results error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch quiz results'
      });
    }

    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      success: true,
      data: {
        results: results.map(result => ({
          ...result,
          percentage: Math.round((result.score / result.total_questions) * 100)
        })),
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalCount: count,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Get user quiz results error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

// @desc    Get quiz statistics
// @route   GET /api/quizzes/:id/stats
// @access  Public
const getQuizStats = async (req, res) => {
  try {
    const { id: quizId } = req.params;

    // Get quiz basic info
    const { data: quiz, error: quizError } = await global.supabase
      .from('quizzes')
      .select('id, title, difficulty, questions')
      .eq('id', quizId)
      .single();

    if (quizError || !quiz) {
      return res.status(404).json({
        success: false,
        error: 'Quiz not found'
      });
    }

    // Get quiz statistics
    const { data: results, error: statsError } = await global.supabase
      .from('quiz_results')
      .select('score, total_questions, time_taken')
      .eq('quiz_id', quizId);

    if (statsError) {
      console.error('Get quiz stats error:', statsError);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch quiz statistics'
      });
    }

    const totalAttempts = results.length;
    const averageScore = totalAttempts > 0 
      ? results.reduce((sum, result) => sum + result.score, 0) / totalAttempts 
      : 0;
    const averagePercentage = totalAttempts > 0
      ? (averageScore / quiz.questions.length) * 100
      : 0;
    const averageTime = totalAttempts > 0
      ? results.reduce((sum, result) => sum + (result.time_taken || 0), 0) / totalAttempts
      : 0;

    res.status(200).json({
      success: true,
      data: {
        quiz: {
          id: quiz.id,
          title: quiz.title,
          difficulty: quiz.difficulty,
          total_questions: quiz.questions.length
        },
        statistics: {
          total_attempts: totalAttempts,
          average_score: Math.round(averageScore * 100) / 100,
          average_percentage: Math.round(averagePercentage * 100) / 100,
          average_time: Math.round(averageTime),
          score_distribution: getScoreDistribution(results, quiz.questions.length)
        }
      }
    });
  } catch (error) {
    console.error('Get quiz stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

// Helper function to calculate score distribution
const getScoreDistribution = (results, totalQuestions) => {
  const distribution = {
    excellent: 0, // 90-100%
    good: 0,      // 70-89%
    average: 0,   // 50-69%
    poor: 0       // 0-49%
  };

  results.forEach(result => {
    const percentage = (result.score / totalQuestions) * 100;
    if (percentage >= 90) distribution.excellent++;
    else if (percentage >= 70) distribution.good++;
    else if (percentage >= 50) distribution.average++;
    else distribution.poor++;
  });

  return distribution;
};

// Helper function to check and award badges
const checkAndAwardBadges = async (userId, score, totalQuestions) => {
  try {
    const percentage = (score / totalQuestions) * 100;
    const newBadges = [];

    // Get user's existing badges
    const { data: existingBadges } = await global.supabase
      .from('badges')
      .select('type')
      .eq('user_id', userId);

    const existingBadgeTypes = existingBadges ? existingBadges.map(b => b.type) : [];

    // Check for badge criteria
    const badgeCriteria = [
      { type: 'First Quiz Completed', condition: () => true },
      { type: 'Quiz Master', condition: () => percentage === 100 },
      { type: 'Wildlife Expert', condition: () => percentage >= 80 },
      { type: 'Quick Learner', condition: () => percentage >= 70 },
    ];

    for (const criteria of badgeCriteria) {
      if (!existingBadgeTypes.includes(criteria.type) && criteria.condition()) {
        const { data: newBadge, error } = await global.supabase
          .from('badges')
          .insert([{
            user_id: userId,
            type: criteria.type,
            awarded_at: new Date().toISOString()
          }])
          .select()
          .single();

        if (!error && newBadge) {
          newBadges.push(newBadge);
        }
      }
    }

    return newBadges;
  } catch (error) {
    console.error('Badge award error:', error);
    return [];
  }
};

module.exports = {
  getQuizzes,
  getQuizById,
  createQuiz,
  submitQuiz,
  getUserQuizResults,
  getQuizStats
};
