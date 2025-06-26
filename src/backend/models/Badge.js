const mongoose = require('mongoose');
const BadgeSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide a user ID']
  },
  type: {
    type: String,
    required: [true, 'Please provide a badge type']
  },
  awarded_at: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('Badge', BadgeSchema);