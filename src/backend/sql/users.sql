-- Users table (authentication and basic user info)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  username VARCHAR(100) UNIQUE,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  avatar_url TEXT,
  bio TEXT,
  location VARCHAR(255),
  website VARCHAR(255),
  date_of_birth DATE,
  phone VARCHAR(20),
  timezone VARCHAR(50) DEFAULT 'UTC',
  language VARCHAR(10) DEFAULT 'en',
  email_verified BOOLEAN DEFAULT FALSE,
  phone_verified BOOLEAN DEFAULT FALSE,
  two_factor_enabled BOOLEAN DEFAULT FALSE,
  last_login TIMESTAMP WITH TIME ZONE,
  login_count INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- User statistics table
CREATE TABLE IF NOT EXISTS user_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  total_quizzes_completed INTEGER DEFAULT 0,
  total_score INTEGER DEFAULT 0,
  average_score DECIMAL(5,2) DEFAULT 0,
  best_score INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  total_time_spent INTEGER DEFAULT 0, -- in minutes
  badges_earned INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  experience_points INTEGER DEFAULT 0,
  last_quiz_date TIMESTAMP WITH TIME ZONE,
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- User preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  theme VARCHAR(50) DEFAULT 'light',
  notifications_enabled BOOLEAN DEFAULT TRUE,
  email_notifications BOOLEAN DEFAULT TRUE,
  push_notifications BOOLEAN DEFAULT FALSE,
  quiz_reminders BOOLEAN DEFAULT TRUE,
  conservation_updates BOOLEAN DEFAULT TRUE,
  achievement_alerts BOOLEAN DEFAULT TRUE,
  weekly_digest BOOLEAN DEFAULT TRUE,
  sound_enabled BOOLEAN DEFAULT TRUE,
  auto_save BOOLEAN DEFAULT TRUE,
  difficulty_preference VARCHAR(20) DEFAULT 'intermediate',
  privacy_level VARCHAR(20) DEFAULT 'public',
  show_progress BOOLEAN DEFAULT TRUE,
  show_badges BOOLEAN DEFAULT TRUE,
  allow_messaging BOOLEAN DEFAULT TRUE,
  data_sharing BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert sample users (for development/testing)
INSERT INTO users (email, password_hash, username, first_name, last_name, bio, location) VALUES
('john.doe@example.com', '$2b$10$sample.hash.for.development', 'johndoe', 'John', 'Doe', 'Wildlife enthusiast and conservation advocate from Kenya', 'Nairobi, Kenya'),
('jane.smith@example.com', '$2b$10$sample.hash.for.development', 'janesmith', 'Jane', 'Smith', 'Marine biologist passionate about African coastal ecosystems', 'Cape Town, South Africa'),
('alex.wilson@example.com', '$2b$10$sample.hash.for.development', 'alexwilson', 'Alex', 'Wilson', 'Student researcher focusing on primate behavior', 'Kampala, Uganda'),
('maria.garcia@example.com', '$2b$10$sample.hash.for.development', 'mariagarcia', 'Maria', 'Garcia', 'Conservation photographer documenting African wildlife', 'Arusha, Tanzania'),
('david.chen@example.com', '$2b$10$sample.hash.for.development', 'davidchen', 'David', 'Chen', 'Environmental educator working with local communities', 'Gaborone, Botswana');

-- Insert corresponding user stats
INSERT INTO user_stats (user_id, total_quizzes_completed, total_score, average_score, best_score, current_streak, longest_streak, badges_earned, level, experience_points)
SELECT 
  id,
  FLOOR(RANDOM() * 25 + 5)::INTEGER as total_quizzes,
  FLOOR(RANDOM() * 2000 + 500)::INTEGER as total_score,
  ROUND((RANDOM() * 30 + 65)::NUMERIC, 2) as avg_score,
  FLOOR(RANDOM() * 20 + 80)::INTEGER as best_score,
  FLOOR(RANDOM() * 7 + 1)::INTEGER as current_streak,
  FLOOR(RANDOM() * 15 + 5)::INTEGER as longest_streak,
  FLOOR(RANDOM() * 10 + 3)::INTEGER as badges_earned,
  FLOOR(RANDOM() * 5 + 1)::INTEGER as level,
  FLOOR(RANDOM() * 1000 + 200)::INTEGER as experience_points
FROM users;

-- Insert user preferences with default values
INSERT INTO user_preferences (user_id)
SELECT id FROM users;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);
CREATE INDEX IF NOT EXISTS idx_users_last_login ON users(last_login);
CREATE INDEX IF NOT EXISTS idx_user_stats_user_id ON user_stats(user_id);
CREATE INDEX IF NOT EXISTS idx_user_stats_level ON user_stats(level);
CREATE INDEX IF NOT EXISTS idx_user_stats_experience ON user_stats(experience_points);
CREATE INDEX IF NOT EXISTS idx_user_preferences_user_id ON user_preferences(user_id);
