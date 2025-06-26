const mongoose = require('mongoose');
const QuestionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Please provide a question text']
  },
  options: {
    type: [String],
    required: [true, 'Please provide answer options'],
    validate: [val => val.length >= 2, 'At least two options are required']
  },
  correctAnswer: {
    type: Number,
    required: [true, 'Please specify the correct answer index']
  }
});
const QuizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a quiz title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a quiz description']
  },
  image_url: {
    type: String,
    required: [true, 'Please provide an image URL']
  },
  questions: {
    type: [QuestionSchema],
    required: [true, 'Please provide quiz questions'],
    validate: [val => val.length > 0, 'At least one question is required']
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: null
  }
});
module.exports = mongoose.model('Quiz', QuizSchema);