-- Quiz results table
CREATE TABLE IF NOT EXISTS quiz_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  correct_answers INTEGER NOT NULL,
  percentage DECIMAL(5,2) GENERATED ALWAYS AS (ROUND((correct_answers::DECIMAL / total_questions::DECIMAL) * 100, 2)) STORED,
  time_taken INTEGER, -- in seconds
  answers JSONB, -- detailed answers and explanations viewed
  hints_used INTEGER DEFAULT 0,
  attempts INTEGER DEFAULT 1,
  is_perfect_score BOOLEAN GENERATED ALWAYS AS (correct_answers = total_questions) STORED,
  difficulty VARCHAR(50),
  category VARCHAR(100),
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Quiz attempts tracking
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
  attempt_number INTEGER NOT NULL,
  current_question INTEGER DEFAULT 1,
  answers_so_far JSONB DEFAULT '{}',
  time_started TIMESTAMP WITH TIME ZONE DEFAULT now(),
  time_paused INTEGER DEFAULT 0, -- total paused time in seconds
  status VARCHAR(20) DEFAULT 'in_progress', -- in_progress, completed, abandoned
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, quiz_id, attempt_number)
);

-- Daily learning streaks
CREATE TABLE IF NOT EXISTS learning_streaks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  streak_date DATE NOT NULL,
  quizzes_completed INTEGER DEFAULT 0,
  total_score INTEGER DEFAULT 0,
  time_spent INTEGER DEFAULT 0, -- in minutes
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, streak_date)
);

-- Generate sample quiz results for development users
DO $$
DECLARE
    user_record RECORD;
    quiz_record RECORD;
    result_count INTEGER;
    random_score INTEGER;
    random_time INTEGER;
BEGIN
    -- For each user, create some quiz results
    FOR user_record IN SELECT id FROM users LOOP
        result_count := FLOOR(RANDOM() * 15 + 5)::INTEGER; -- 5-20 results per user
        
        FOR i IN 1..result_count LOOP
            -- Select a random quiz
            SELECT id, total_questions, difficulty, category INTO quiz_record 
            FROM quizzes 
            ORDER BY RANDOM() 
            LIMIT 1;
            
            -- Generate realistic score (weighted towards higher scores)
            random_score := CASE 
                WHEN RANDOM() < 0.1 THEN FLOOR(RANDOM() * 5 + 1)::INTEGER -- 10% poor scores (1-5)
                WHEN RANDOM() < 0.3 THEN FLOOR(RANDOM() * 3 + 6)::INTEGER -- 20% medium scores (6-8)
                ELSE FLOOR(RANDOM() * 2 + quiz_record.total_questions - 1)::INTEGER -- 70% good scores
            END;
            
            -- Ensure score doesn't exceed total questions
            IF random_score > quiz_record.total_questions THEN
                random_score := quiz_record.total_questions;
            END IF;
            
            -- Generate realistic time (1-30 minutes)
            random_time := FLOOR(RANDOM() * 1800 + 60)::INTEGER; -- 60-1860 seconds
            
            INSERT INTO quiz_results (
                user_id, 
                quiz_id, 
                score, 
                total_questions, 
                correct_answers, 
                time_taken,
                difficulty,
                category,
                completed_at
            ) VALUES (
                user_record.id,
                quiz_record.id,
                random_score,
                quiz_record.total_questions,
                random_score, -- assuming score equals correct answers for simplicity
                random_time,
                quiz_record.difficulty,
                quiz_record.category,
                now() - (RANDOM() * INTERVAL '30 days') -- Random time in last 30 days
            );
        END LOOP;
    END LOOP;
    
    -- Generate learning streaks for the last 30 days
    FOR user_record IN SELECT id FROM users LOOP
        FOR i IN 0..29 LOOP
            -- 70% chance of activity each day
            IF RANDOM() < 0.7 THEN
                INSERT INTO learning_streaks (user_id, streak_date, quizzes_completed, total_score, time_spent)
                VALUES (
                    user_record.id,
                    CURRENT_DATE - i,
                    FLOOR(RANDOM() * 3 + 1)::INTEGER, -- 1-3 quizzes per day
                    FLOOR(RANDOM() * 200 + 50)::INTEGER, -- 50-250 points per day
                    FLOOR(RANDOM() * 60 + 15)::INTEGER -- 15-75 minutes per day
                );
            END IF;
        END LOOP;
    END LOOP;
END $$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_quiz_results_user_id ON quiz_results(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_results_quiz_id ON quiz_results(quiz_id);
CREATE INDEX IF NOT EXISTS idx_quiz_results_completed_at ON quiz_results(completed_at);
CREATE INDEX IF NOT EXISTS idx_quiz_results_score ON quiz_results(score);
CREATE INDEX IF NOT EXISTS idx_quiz_results_percentage ON quiz_results(percentage);
CREATE INDEX IF NOT EXISTS idx_quiz_results_category ON quiz_results(category);
CREATE INDEX IF NOT EXISTS idx_quiz_results_difficulty ON quiz_results(difficulty);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user_quiz ON quiz_attempts(user_id, quiz_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_status ON quiz_attempts(status);
CREATE INDEX IF NOT EXISTS idx_learning_streaks_user_date ON learning_streaks(user_id, streak_date);
CREATE INDEX IF NOT EXISTS idx_learning_streaks_date ON learning_streaks(streak_date);
