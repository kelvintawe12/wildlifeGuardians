const Animal = require('../models/Animal');
// @desc    Get all animals
// @route   GET /api/animals
// @access  Public
exports.getAnimals = async (req, res) => {
  try {
    const animals = await Animal.find().select('id name description image_url');
    res.status(200).json({
      success: true,
      data: animals
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};
// @desc    Get single animal
// @route   GET /api/animals/:id
// @access  Public
exports.getAnimalById = async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    if (!animal) {
      return res.status(404).json({
        success: false,
        error: 'Animal not found'
      });
    }
    res.status(200).json({
      success: true,
      data: animal
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};
// @desc    Create a new animal
// @route   POST /api/animals
// @access  Private (Admin only)
exports.createAnimal = async (req, res) => {
  try {
    const animal = await Animal.create(req.body);
    res.status(201).json({
      success: true,
      data: animal
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};
// @desc    Update animal
// @route   PUT /api/animals/:id
// @access  Private (Admin only)
exports.updateAnimal = async (req, res) => {
  try {
    const animal = await Animal.findByIdAndUpdate(req.params.id, {
      ...req.body,
      updated_at: Date.now()
    }, {
      new: true,
      runValidators: true
    });
    if (!animal) {
      return res.status(404).json({
        success: false,
        error: 'Animal not found'
      });
    }
    res.status(200).json({
      success: true,
      data: animal
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};
// @desc    Delete animal
// @route   DELETE /api/animals/:id
// @access  Private (Admin only)
exports.deleteAnimal = async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    if (!animal) {
      return res.status(404).json({
        success: false,
        error: 'Animal not found'
      });
    }
    await animal.remove();
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};