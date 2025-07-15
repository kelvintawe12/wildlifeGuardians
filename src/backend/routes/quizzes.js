const express = require('express');
const {
  getQuizzes,
  getQuizById,
  createQuiz,
  submitQuiz,
  getUserQuizResults,
  getQuizStats
} = require('../controllers/quizController');
const {
  authenticateSupabase,
  optionalAuth
} = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', optionalAuth, getQuizzes);
router.get('/:id', getQuizById);
router.get('/:id/stats', getQuizStats);

// Protected routes
router.post('/', authenticateSupabase, createQuiz); // Admin only
router.post('/:id/submit', authenticateSupabase, submitQuiz);
router.get('/results/user', authenticateSupabase, getUserQuizResults);

module.exports = router;