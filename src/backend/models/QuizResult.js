const mongoose = require('mongoose');
const QuizResultSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide a user ID']
  },
  quiz_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: [true, 'Please provide a quiz ID']
  },
  score: {
    type: Number,
    required: [true, 'Please provide a score']
  },
  completed_at: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('QuizResult', QuizResultSchema);