-- Badge definitions table
CREATE TABLE IF NOT EXISTS badge_definitions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  icon VARCHAR(100),
  color VARCHAR(50),
  category VARCHAR(100),
  criteria JSONB,
  points INTEGER DEFAULT 0,
  rarity VARCHAR(50) DEFAULT 'common',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- User badges table
CREATE TABLE IF NOT EXISTS badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  badge_id UUID REFERENCES badge_definitions(id) ON DELETE CASCADE,
  awarded_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  progress JSONB DEFAULT '{}',
  UNIQUE(user_id, badge_id)
);

-- Insert badge definitions
INSERT INTO badge_definitions (name, description, icon, color, category, criteria, points, rarity) VALUES

-- Learning Badges
('First Steps', 'Complete your first quiz on wildlife conservation', 'graduation-cap', 'emerald', 'learning', '{"quizzes_completed": 1}', 10, 'common'),
('Knowledge Seeker', 'Complete 5 quizzes with at least 70% score', 'book-open', 'blue', 'learning', '{"quizzes_completed": 5, "min_score": 70}', 50, 'common'),
('Quiz Master', 'Complete 20 quizzes with at least 80% score', 'trophy', 'purple', 'learning', '{"quizzes_completed": 20, "min_score": 80}', 200, 'rare'),
('Perfect Score', 'Achieve 100% on any quiz', 'star', 'gold', 'achievement', '{"perfect_scores": 1}', 100, 'uncommon'),
('Streak Champion', 'Complete quizzes for 7 consecutive days', 'zap', 'orange', 'dedication', '{"daily_streak": 7}', 150, 'uncommon'),

-- Species Expert Badges
('Big Five Expert', 'Complete all quizzes about the Big Five animals', 'crown', 'gold', 'expertise', '{"category_quizzes": {"big_five": 5}}', 300, 'rare'),
('Primate Specialist', 'Demonstrate expertise in primate knowledge', 'brain', 'indigo', 'expertise', '{"category_quizzes": {"primates": 3}, "min_score": 85}', 250, 'rare'),
('Bird Watcher', 'Complete all bird-related quizzes', 'eye', 'sky', 'expertise', '{"category_quizzes": {"birds": 4}}', 200, 'uncommon'),
('Reptile Expert', 'Master knowledge about African reptiles', 'shield', 'green', 'expertise', '{"category_quizzes": {"reptiles": 3}, "min_score": 80}', 180, 'uncommon'),
('Marine Biologist', 'Complete all marine life quizzes', 'waves', 'blue', 'expertise', '{"category_quizzes": {"marine": 2}}', 150, 'uncommon'),

-- Conservation Badges
('Conservation Advocate', 'Complete all conservation-focused quizzes', 'heart', 'red', 'conservation', '{"category_quizzes": {"conservation": 5}}', 400, 'epic'),
('Ecosystem Guardian', 'Demonstrate understanding of ecosystem relationships', 'globe', 'emerald', 'conservation', '{"category_quizzes": {"ecosystems": 3}, "min_score": 85}', 300, 'rare'),
('Anti-Poaching Supporter', 'Learn about anti-poaching efforts', 'shield-check', 'red', 'conservation', '{"specific_topics": ["anti-poaching"]}', 200, 'uncommon'),
('Habitat Protector', 'Complete quizzes about habitat conservation', 'tree-pine', 'green', 'conservation', '{"topics_learned": ["habitat_protection"]}', 180, 'uncommon'),

-- Engagement Badges
('Early Bird', 'Complete a quiz before 8 AM', 'sunrise', 'yellow', 'engagement', '{"early_completion": 1}', 50, 'common'),
('Night Owl', 'Complete a quiz after 10 PM', 'moon', 'purple', 'engagement', '{"late_completion": 1}', 50, 'common'),
('Weekend Warrior', 'Complete quizzes on both Saturday and Sunday', 'calendar', 'blue', 'engagement', '{"weekend_days": 2}', 100, 'uncommon'),
('Social Learner', 'Share quiz results 5 times', 'share', 'pink', 'social', '{"shares": 5}', 75, 'common'),

-- Achievement Badges
('Speed Demon', 'Complete a quiz in under 2 minutes', 'timer', 'red', 'achievement', '{"completion_time": 120}', 100, 'uncommon'),
('Thorough Learner', 'Read all explanations in a quiz', 'magnifying-glass', 'amber', 'achievement', '{"explanations_read": "all"}', 80, 'common'),
('Comeback King', 'Improve score by 30% on retaken quiz', 'trending-up', 'green', 'achievement', '{"score_improvement": 30}', 120, 'uncommon'),
('Explorer', 'Complete quizzes from all available categories', 'compass', 'purple', 'achievement', '{"categories_completed": "all"}', 500, 'legendary'),

-- Milestone Badges
('Wildlife Enthusiast', 'Complete 10 quizzes with 60% or higher', 'heart-handshake', 'emerald', 'milestone', '{"quizzes_completed": 10, "min_score": 60}', 150, 'uncommon'),
('Conservation Champion', 'Complete 50 quizzes with 70% or higher', 'medal', 'gold', 'milestone', '{"quizzes_completed": 50, "min_score": 70}', 800, 'epic'),
('Wildlife Guardian', 'Complete 100 quizzes with 75% or higher', 'shield-check', 'platinum', 'milestone', '{"quizzes_completed": 100, "min_score": 75}', 1500, 'legendary'),

-- Special Event Badges
('Earth Day Champion', 'Complete special Earth Day quiz', 'earth', 'green', 'special', '{"special_event": "earth_day"}', 200, 'rare'),
('World Wildlife Day', 'Participate in World Wildlife Day activities', 'paw-print', 'brown', 'special', '{"special_event": "world_wildlife_day"}', 200, 'rare'),
('Endangered Species Day', 'Complete endangered species awareness quiz', 'alert-triangle', 'red', 'special', '{"special_event": "endangered_species_day"}', 250, 'rare'),

-- Community Badges
('Helpful Peer', 'Help other users 10 times', 'helping-hand', 'blue', 'community', '{"help_count": 10}', 200, 'uncommon'),
('Discussion Leader', 'Start 5 meaningful discussions', 'message-circle', 'indigo', 'community', '{"discussions_started": 5}', 180, 'uncommon'),
('Mentor', 'Guide 3 new users through their first week', 'graduation-cap', 'purple', 'community', '{"mentored_users": 3}', 300, 'rare');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_badge_definitions_category ON badge_definitions(category);
CREATE INDEX IF NOT EXISTS idx_badge_definitions_rarity ON badge_definitions(rarity);
CREATE INDEX IF NOT EXISTS idx_badges_user_id ON badges(user_id);
CREATE INDEX IF NOT EXISTS idx_badges_badge_id ON badges(badge_id);
CREATE INDEX IF NOT EXISTS idx_badges_awarded_at ON badges(awarded_at);
