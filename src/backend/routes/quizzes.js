const express = require('express');
const {
  getQuizzes,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  saveQuizResult,
  getUserQuizResults
} = require('../controllers/quizController');
const {
  protect
} = require('../middleware/auth');
const router = express.Router();
router.get('/', getQuizzes);
router.get('/:id', getQuizById);
router.post('/', protect, createQuiz); // Admin only
router.put('/:id', protect, updateQuiz); // Admin only
router.delete('/:id', protect, deleteQuiz); // Admin only
router.post('/results', protect, saveQuizResult);
router.get('/results/user', protect, getUserQuizResults);
module.exports = router;