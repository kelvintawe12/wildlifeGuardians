const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// @desc    Get all animals
// @route   GET /api/animals
// @access  Public
exports.getAnimals = async (req, res) => {
  try {
    const { data: animals, error } = await supabase
      .from('animals')
      .select('id, name, description, image_url');

    if (error) {
      throw error;
    }

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
    const { data: animal, error } = await supabase
      .from('animals')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error || !animal) {
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
    const { data: animal, error } = await supabase
      .from('animals')
      .insert([req.body])
      .single();

    if (error) {
      throw error;
    }

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
    const { data: animal, error } = await supabase
      .from('animals')
      .update({ ...req.body, updated_at: new Date().toISOString() })
      .eq('id', req.params.id)
      .single();

    if (error || !animal) {
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
    const { data: animal, error } = await supabase
      .from('animals')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error || !animal) {
      return res.status(404).json({
        success: false,
        error: 'Animal not found'
      });
    }

    const { error: deleteError } = await supabase
      .from('animals')
      .delete()
      .eq('id', req.params.id);

    if (deleteError) {
      throw deleteError;
    }

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
