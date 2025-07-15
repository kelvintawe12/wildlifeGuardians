const express = require('express');
const {
  getAnimals,
  getAnimalById,
  createAnimal,
  updateAnimal,
  deleteAnimal,
  getConservationStatuses,
  getFeaturedAnimals
} = require('../controllers/animalController');
const {
  authenticateSupabase,
  optionalAuth
} = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', optionalAuth, getAnimals);
router.get('/featured', getFeaturedAnimals);
router.get('/conservation-statuses', getConservationStatuses);
router.get('/:id', getAnimalById);

// Protected routes (Admin only)
router.post('/', authenticateSupabase, createAnimal);
router.put('/:id', authenticateSupabase, updateAnimal);
router.delete('/:id', authenticateSupabase, deleteAnimal);

module.exports = router;