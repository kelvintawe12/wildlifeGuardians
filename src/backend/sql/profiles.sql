-- Profiles table (user profile details)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  email VARCHAR(255)
);

ALTER TABLE profiles ADD COLUMN email VARCHAR(255);

UPDATE profiles
SET email = users.email
FROM users
WHERE profiles.id = users.id;
