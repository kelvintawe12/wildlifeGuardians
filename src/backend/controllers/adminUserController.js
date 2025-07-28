// Admin User Management Controller
const Joi = require('joi');
const { v4: uuidv4 } = require('uuid');

const userSchema = Joi.object({
  username: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  role: Joi.string().valid('admin', 'user').default('user'),
});

// GET /api/admin/users?search=foo
async function getUsers(req, res) {
  try {
    const { search = '' } = req.query;
    const { data: users, error } = await global.supabase
      .from('profiles')
      .select('id, name:username, email, role, created_at')
      .ilike('username', `%${search}%`);
    if (error) throw error;
    res.json(users);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

// POST /api/admin/users
async function createUser(req, res) {
  try {
    const { error, value } = userSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    const { data, error: insertError } = await global.supabase
      .from('profiles')
      .insert([{ ...value, id: uuidv4(), created_at: new Date().toISOString() }])
      .select()
      .single();
    if (insertError) throw insertError;
    res.status(201).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

// PUT /api/admin/users/:id
async function updateUser(req, res) {
  try {
    const { error, value } = userSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    const { id } = req.params;
    const { data, error: updateError } = await global.supabase
      .from('profiles')
      .update({ ...value, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (updateError) throw updateError;
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

// DELETE /api/admin/users/:id
async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const { error } = await global.supabase
      .from('profiles')
      .delete()
      .eq('id', id);
    if (error) throw error;
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
