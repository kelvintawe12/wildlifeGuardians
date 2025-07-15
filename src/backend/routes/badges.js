const express = require('express');
const {
  getUserBadges,
  getBadgeTypes,
  awardBadge,
  getBadgeLeaderboard,
  checkProgressBadges
} = require('../controllers/badgeController');
const {
  authenticateSupabase,
  optionalAuth
} = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/types', getBadgeTypes);
router.get('/leaderboard', getBadgeLeaderboard);

// Protected routes
router.get('/user', authenticateSupabase, getUserBadges);
router.post('/', authenticateSupabase, awardBadge); // System or admin only
router.post('/check-progress', authenticateSupabase, checkProgressBadges);

module.exports = router;