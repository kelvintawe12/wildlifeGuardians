const Joi = require('joi');

// Validation schemas
const animalSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().min(10).required(),
  image_url: Joi.string().uri().required(),
  conservation_status: Joi.string().valid(
    'Least Concern', 
    'Near Threatened', 
    'Vulnerable', 
    'Endangered', 
    'Critically Endangered', 
    'Extinct in the Wild', 
    'Extinct'
  ).required(),
  habitat: Joi.string().min(5).required(),
  diet: Joi.string().min(5).required(),
  fun_facts: Joi.array().items(Joi.string()).default([]),
  weight_range: Joi.string().optional(),
  length_range: Joi.string().optional(),
  lifespan: Joi.string().optional(),
  population: Joi.string().optional()
});

// @desc    Get all animals with filtering and pagination
// @route   GET /api/animals
// @access  Public
const getAnimals = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 12, 
      search, 
      conservation_status, 
      habitat,
      sort = 'name' 
    } = req.query;

    let query = global.supabase
      .from('animals')
      .select('*', { count: 'exact' });

    // Search functionality
    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%,habitat.ilike.%${search}%`);
    }

    // Filter by conservation status
    if (conservation_status) {
      query = query.eq('conservation_status', conservation_status);
    }

    // Filter by habitat
    if (habitat) {
      query = query.ilike('habitat', `%${habitat}%`);
    }

    // Sorting
    const sortOrder = sort.startsWith('-') ? 'desc' : 'asc';
    const sortField = sort.replace('-', '');
    query = query.order(sortField, { ascending: sortOrder === 'asc' });

    // Pagination
    const offset = (page - 1) * limit;
    query = query.range(offset, offset + limit - 1);

    const { data: animals, error, count } = await query;

    if (error) {
      console.error('Get animals error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch animals'
      });
    }

    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      success: true,
      data: {
        animals,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalCount: count,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        },
        filters: {
          search,
          conservation_status,
          habitat,
          sort
        }
      }
    });
  } catch (error) {
    console.error('Get animals error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

// @desc    Get single animal by ID
// @route   GET /api/animals/:id
// @access  Public
const getAnimalById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: animal, error } = await global.supabase
      .from('animals')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !animal) {
      return res.status(404).json({
        success: false,
        error: 'Animal not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        animal
      }
    });
  } catch (error) {
    console.error('Get animal by ID error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch animal'
    });
  }
};

// @desc    Create new animal
// @route   POST /api/animals
// @access  Private (Admin only)
const createAnimal = async (req, res) => {
  try {
    // Validate request body
    const { error, value } = animalSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details[0].message
      });
    }

    const animalData = {
      ...value,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const { data: animal, error: insertError } = await global.supabase
      .from('animals')
      .insert([animalData])
      .select()
      .single();

    if (insertError) {
      console.error('Create animal error:', insertError);
      return res.status(500).json({
        success: false,
        error: 'Failed to create animal'
      });
    }

    res.status(201).json({
      success: true,
      message: 'Animal created successfully',
      data: {
        animal
      }
    });
  } catch (error) {
    console.error('Create animal error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

// @desc    Update animal
// @route   PUT /api/animals/:id
// @access  Private (Admin only)
const updateAnimal = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate request body (allow partial updates)
    const updateSchema = animalSchema.fork(
      ['name', 'description', 'image_url', 'conservation_status', 'habitat', 'diet'],
      (schema) => schema.optional()
    );

    const { error, value } = updateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details[0].message
      });
    }

    const updateData = {
      ...value,
      updated_at: new Date().toISOString()
    };

    const { data: animal, error: updateError } = await global.supabase
      .from('animals')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (updateError) {
      if (updateError.code === 'PGRST116') {
        return res.status(404).json({
          success: false,
          error: 'Animal not found'
        });
      }
      console.error('Update animal error:', updateError);
      return res.status(500).json({
        success: false,
        error: 'Failed to update animal'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Animal updated successfully',
      data: {
        animal
      }
    });
  } catch (error) {
    console.error('Update animal error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

// @desc    Delete animal
// @route   DELETE /api/animals/:id
// @access  Private (Admin only)
const deleteAnimal = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await global.supabase
      .from('animals')
      .delete()
      .eq('id', id);

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({
          success: false,
          error: 'Animal not found'
        });
      }
      console.error('Delete animal error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to delete animal'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Animal deleted successfully'
    });
  } catch (error) {
    console.error('Delete animal error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

// @desc    Get conservation statuses
// @route   GET /api/animals/conservation-statuses
// @access  Public
const getConservationStatuses = async (req, res) => {
  try {
    const statuses = [
      'Least Concern',
      'Near Threatened',
      'Vulnerable',
      'Endangered',
      'Critically Endangered',
      'Extinct in the Wild',
      'Extinct'
    ];

    // Get count for each status
    const statusCounts = await Promise.all(
      statuses.map(async (status) => {
        const { count, error } = await global.supabase
          .from('animals')
          .select('*', { count: 'exact', head: true })
          .eq('conservation_status', status);

        return {
          status,
          count: error ? 0 : count,
          description: getStatusDescription(status)
        };
      })
    );

    res.status(200).json({
      success: true,
      data: {
        statuses: statusCounts
      }
    });
  } catch (error) {
    console.error('Get conservation statuses error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch conservation statuses'
    });
  }
};

// Helper function to get status descriptions
const getStatusDescription = (status) => {
  const descriptions = {
    'Least Concern': 'Species with a low risk of extinction',
    'Near Threatened': 'Species that may become threatened in the near future',
    'Vulnerable': 'Species facing a high risk of extinction in the wild',
    'Endangered': 'Species facing a very high risk of extinction in the wild',
    'Critically Endangered': 'Species facing an extremely high risk of extinction',
    'Extinct in the Wild': 'Species surviving only in captivity',
    'Extinct': 'Species with no known living individuals'
  };
  return descriptions[status] || '';
};

// @desc    Get random featured animals
// @route   GET /api/animals/featured
// @access  Public
const getFeaturedAnimals = async (req, res) => {
  try {
    const { limit = 3 } = req.query;

    // Get total count first
    const { count } = await global.supabase
      .from('animals')
      .select('*', { count: 'exact', head: true });

    if (!count || count === 0) {
      return res.status(200).json({
        success: true,
        data: {
          animals: []
        }
      });
    }

    // Generate random offset
    const randomOffset = Math.floor(Math.random() * Math.max(0, count - limit));

    const { data: animals, error } = await global.supabase
      .from('animals')
      .select('*')
      .range(randomOffset, randomOffset + limit - 1);

    if (error) {
      console.error('Get featured animals error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch featured animals'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        animals
      }
    });
  } catch (error) {
    console.error('Get featured animals error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

module.exports = {
  getAnimals,
  getAnimalById,
  createAnimal,
  updateAnimal,
  deleteAnimal,
  getConservationStatuses,
  getFeaturedAnimals
};
