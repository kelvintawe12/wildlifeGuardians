const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to the Wildlife Guardians API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      quizzes: '/api/quizzes',
      animals: '/api/animals',
      badges: '/api/badges',
      users: '/api/users'
    }
  });
});

module.exports = router;
