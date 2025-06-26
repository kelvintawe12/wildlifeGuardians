const express = require('express');
const {
  getAnimals,
  getAnimalById,
  createAnimal,
  updateAnimal,
  deleteAnimal
} = require('../controllers/animalController');
const {
  protect
} = require('../middleware/auth');
const router = express.Router();
router.get('/', getAnimals);
router.get('/:id', getAnimalById);
router.post('/', protect, createAnimal); // Admin only
router.put('/:id', protect, updateAnimal); // Admin only
router.delete('/:id', protect, deleteAnimal); // Admin only
module.exports = router;