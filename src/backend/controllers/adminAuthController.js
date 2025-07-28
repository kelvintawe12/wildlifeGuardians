// Admin authentication controller
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().min(2).max(50).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// POST /api/admin/signup
exports.signup = async (req, res) => {
  try {
    const { error, value } = signupSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    const { email, password, name } = value;
    // Check if admin exists
    const { data: existing, error: findErr } = await global.supabase
      .from('admin_users')
      .select('id')
      .eq('email', email)
      .single();
    if (existing) return res.status(409).json({ error: 'Admin already exists' });
    // Hash password
    const password_hash = await bcrypt.hash(password, 10);
    const { data, error: insertErr } = await global.supabase
      .from('admin_users')
      .insert([{ email, password_hash, username: name, created_at: new Date().toISOString() }])
      .select()
      .single();
    if (insertErr) throw insertErr;
    res.status(201).json({ id: data.id, email: data.email, username: data.username });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// POST /api/admin/login
exports.login = async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    const { email, password } = value;
    const { data: admin, error: findErr } = await global.supabase
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .single();
    if (!admin) return res.status(401).json({ error: 'Invalid credentials' });
    const valid = await bcrypt.compare(password, admin.password_hash);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
    // Generate JWT (optional)
    const token = jwt.sign({ id: admin.id, email: admin.email, role: admin.role }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '7d' });
    res.json({ token, admin: { id: admin.id, email: admin.email, username: admin.username, role: admin.role } });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
