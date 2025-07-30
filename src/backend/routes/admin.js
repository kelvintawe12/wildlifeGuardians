const express = require('express');
const bcrypt = require('bcryptjs');
const pool = require('../db'); // Your PostgreSQL pool/connection
const router = express.Router();

// --- Admin CRUD ---
router.get('/admins', async (req, res) => {
  const result = await pool.query('SELECT * FROM admin_users');
  res.json(result.rows);
});

router.post('/admins', async (req, res) => {
  const { name, email, role, phone, notes, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const result = await pool.query(
    'INSERT INTO admin_users (id, name, email, role, phone, notes, password_hash, created_at) VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, now()) RETURNING *',
    [name, email, role, phone, notes, hash]
  );
  res.json(result.rows[0]);
});

router.put('/admins/:id', async (req, res) => {
  const { name, email, role, phone, notes } = req.body;
  const { id } = req.params;
  const result = await pool.query(
    'UPDATE admin_users SET name=$1, email=$2, role=$3, phone=$4, notes=$5 WHERE id=$6 RETURNING *',
    [name, email, role, phone, notes, id]
  );
  res.json(result.rows[0]);
});

router.delete('/admins/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM admin_users WHERE id=$1', [id]);
  res.json({ success: true });
});

// --- Admin Signup ---
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const result = await pool.query(
    'INSERT INTO admin_users (id, name, email, password_hash, created_at) VALUES (gen_random_uuid(), $1, $2, $3, now()) RETURNING *',
    [name, email, hash]
  );
  res.json({ admin: result.rows[0] });
});

// --- Admin Login ---
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const result = await pool.query('SELECT * FROM admin_users WHERE email=$1', [email]);
  if (result.rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });
  const admin = result.rows[0];
  const match = await bcrypt.compare(password, admin.password_hash);
  if (!match) return res.status(401).json({ error: 'Invalid credentials' });
  const { password_hash, ...adminSafe } = admin;
  res.json({ admin: adminSafe });
});

// --- Users CRUD ---
router.get('/users', async (req, res) => {
  const search = req.query.search || '';
  const result = await pool.query(
    'SELECT * FROM users WHERE name ILIKE $1 OR email ILIKE $1',
    [`%${search}%`]
  );
  res.json(result.rows);
});

router.post('/users', async (req, res) => {
  const { name, email } = req.body;
  const result = await pool.query(
    'INSERT INTO users (id, name, email, created_at) VALUES (gen_random_uuid(), $1, $2, now()) RETURNING *',
    [name, email]
  );
  res.json(result.rows[0]);
});

router.put('/users/:id', async (req, res) => {
  const { name, email } = req.body;
  const { id } = req.params;
  const result = await pool.query(
    'UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *',
    [name, email, id]
  );
  res.json(result.rows[0]);
});

router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM users WHERE id=$1', [id]);
  res.json({ success: true });
});

// --- Audit Logs ---
router.get('/audit-logs', async (req, res) => {
  const { action, search } = req.query;
  let query = 'SELECT * FROM audit_logs WHERE 1=1';
  const params = [];
  if (action && action !== 'ALL') {
    params.push(action);
    query += ` AND action = $${params.length}`;
  }
  if (search) {
    params.push(`%${search}%`);
    query += ` AND (user ILIKE $${params.length} OR details ILIKE $${params.length})`;
  }
  query += ' ORDER BY timestamp DESC LIMIT 100';
  const result = await pool.query(query, params);
  res.json(result.rows);
});

// --- Add similar CRUD for badges, quizzes, etc. as needed ---

module.exports = router;
