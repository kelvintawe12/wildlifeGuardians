const express = require('express');
const {
  getUserBadges,
  awardBadge,
  getLeaderboard
} = require('../controllers/badgeController');
const {
  protect
} = require('../middleware/auth');
const router = express.Router();
router.get('/user', protect, getUserBadges);
router.post('/', protect, awardBadge); // System or admin only
router.get('/leaderboard', getLeaderboard);
module.exports = router;