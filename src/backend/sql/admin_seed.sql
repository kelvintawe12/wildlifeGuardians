-- Seed script to add a demo admin user for testing

INSERT INTO admin_users (id, email, password_hash, username, created_at)
VALUES (
  gen_random_uuid(),
  'demo.admin@example.com',
  '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZGHFQW1Yy1Q9wQ7ZrQ7ZrQ7ZrQ7Zr', -- bcrypt hash for 'password123'
  'DemoAdmin',
  now()
)
ON CONFLICT (email) DO NOTHING;
