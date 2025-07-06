-- Seed data script to insert initial data into tables

-- Insert sample users (password_hashes are placeholders, replace with actual hashed passwords)
INSERT INTO users (id, email, password_hash, created_at, updated_at) VALUES
  ('11111111-1111-1111-1111-111111111111', 'user1@example.com', 'hashedpassword1', now(), now()),
  ('22222222-2222-2222-2222-222222222222', 'user2@example.com', 'hashedpassword2', now(), now());

-- Insert sample profiles
INSERT INTO profiles (id, name, avatar_url, created_at, updated_at) VALUES
  ('11111111-1111-1111-1111-111111111111', 'User One', NULL, now(), now()),
  ('22222222-2222-2222-2222-222222222222', 'User Two', NULL, now(), now());

-- Insert sample animals
INSERT INTO animals (id, name, description, image_url, created_at, updated_at) VALUES
  (gen_random_uuid(), 'Elephant', 'Large mammal with trunk', 'https://example.com/elephant.jpg', now(), now()),
  (gen_random_uuid(), 'Tiger', 'Big cat with stripes', 'https://example.com/tiger.jpg', now(), now());

-- Insert sample badges
INSERT INTO badges (id, user_id, type, awarded_at) VALUES
  (gen_random_uuid(), '11111111-1111-1111-1111-111111111111', 'First Quiz', now()),
  (gen_random_uuid(), '22222222-2222-2222-2222-222222222222', 'Animal Expert', now());

-- Insert sample quizzes
INSERT INTO quizzes (id, title, description, image_url, created_at, updated_at) VALUES
  (gen_random_uuid(), 'Wildlife Quiz', 'Test your knowledge about wildlife', NULL, now(), now());

-- Insert sample quiz_results
INSERT INTO quiz_results (id, user_id, quiz_id, score, completed_at) VALUES
  (gen_random_uuid(), '11111111-1111-1111-1111-111111111111', (SELECT id FROM quizzes LIMIT 1), 85, now());
