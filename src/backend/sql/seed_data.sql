-- Seed data script with comprehensive wildlife data

-- Insert sample animals with detailed information
INSERT INTO animals (id, name, description, image_url, conservation_status, habitat, diet, fun_facts, weight_range, length_range, lifespan, population, created_at, updated_at) VALUES
  (gen_random_uuid(), 'African Elephant', 'The African elephant is the largest living terrestrial animal and one of the most iconic species in Africa. They are known for their intelligence, complex social structures, and crucial role in their ecosystem.', 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800', 'Endangered', 'African savannas, grasslands, and forests', 'Herbivore - grasses, fruits, bark, leaves', ARRAY['Can weigh up to 6 tons', 'Have excellent memory', 'Use tools and show empathy', 'Can live up to 70 years'], '4,000-6,000 kg', '3-4 meters tall', '60-70 years', '415,000 in the wild', now(), now()),
  
  (gen_random_uuid(), 'Bengal Tiger', 'The Bengal tiger is a magnificent big cat native to the Indian subcontinent. Known for their distinctive orange coat with black stripes, they are apex predators and symbols of power and grace.', 'https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?w=800', 'Endangered', 'Tropical forests, grasslands, mangroves', 'Carnivore - deer, wild boar, water buffalo', ARRAY['Largest cat species', 'Excellent swimmers', 'Can leap up to 10 meters', 'Each tiger has unique stripe patterns'], '140-220 kg', '2.7-3.1 meters', '10-15 years', '2,500 in the wild', now(), now()),
  
  (gen_random_uuid(), 'Giant Panda', 'The giant panda is an endangered bear species endemic to central China. Famous for their distinctive black and white fur and their dependence on bamboo, they have become a global symbol of wildlife conservation.', 'https://images.unsplash.com/photo-1539732864045-c83a8af16f46?w=800', 'Vulnerable', 'Bamboo forests in central China', 'Herbivore - 99% bamboo, occasionally fish and eggs', ARRAY['Spend 14 hours a day eating', 'Have a pseudo-thumb for gripping bamboo', 'Cubs are born pink and tiny', 'Symbol of peace in Chinese culture'], '80-120 kg', '1.2-1.9 meters', '20 years', '1,864 in the wild', now(), now()),
  
  (gen_random_uuid(), 'Bald Eagle', 'The bald eagle is a bird of prey found in North America and is the national bird of the United States. Known for their distinctive white head and tail feathers, they are skilled hunters and powerful fliers.', 'https://images.unsplash.com/photo-1585338447937-7082f2e6e4e8?w=800', 'Least Concern', 'Near large bodies of water across North America', 'Carnivore - fish, waterfowl, small mammals', ARRAY['National bird of the USA', 'Can dive at speeds of 100 mph', 'Build the largest nests of any bird', 'Mate for life'], '3-6.3 kg', '70-102 cm wingspan', '20-30 years', '316,700 in North America', now(), now()),
  
  (gen_random_uuid(), 'Mountain Gorilla', 'Mountain gorillas are a critically endangered subspecies of eastern gorilla found in the volcanic mountains of central and eastern Africa. They are known for their intelligence, gentle nature, and strong family bonds.', 'https://images.unsplash.com/photo-1509149398892-d4e0b4f36ad9?w=800', 'Critically Endangered', 'Mountain forests of central Africa', 'Herbivore - leaves, stems, bark, fruit', ARRAY['Share 98% DNA with humans', 'Live in family groups led by silverbacks', 'Communicate through 25+ vocalizations', 'Can live up to 50 years'], '135-220 kg', '1.25-1.75 meters', '35-50 years', '1,000 in the wild', now(), now()),
  
  (gen_random_uuid(), 'Blue Whale', 'The blue whale is the largest animal ever known to have lived on Earth. These magnificent marine mammals can reach lengths of up to 100 feet and are known for their haunting songs that travel across ocean basins.', 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800', 'Endangered', 'All oceans worldwide', 'Carnivore - primarily krill', ARRAY['Largest animal ever lived', 'Heart alone weighs as much as a car', 'Can hold breath for 90 minutes', 'Songs can be heard 1,000 miles away'], '100,000-200,000 kg', '24-30 meters', '80-90 years', '10,000-25,000 worldwide', now(), now()),
  
  (gen_random_uuid(), 'Snow Leopard', 'The snow leopard is an elusive big cat perfectly adapted to life in the harsh, cold mountains of Central and South Asia. Known for their thick fur and incredible jumping ability, they are often called the "ghost of the mountains."', 'https://images.unsplash.com/photo-1551882822-0c3e8a15a6a9?w=800', 'Vulnerable', 'High mountain ranges of Central Asia', 'Carnivore - blue sheep, ibex, pikas', ARRAY['Can jump 50 feet in a single bound', 'Tail is almost as long as body', 'Cannot roar, only purr and chuff', 'Perfectly adapted to cold climates'], '22-55 kg', '0.9-1.3 meters', '15-18 years', '4,000-6,500 in the wild', now(), now()),
  
  (gen_random_uuid(), 'Orangutan', 'Orangutans are highly intelligent great apes found in the rainforests of Borneo and Sumatra. They are known for their distinctive reddish-brown hair, incredible intelligence, and predominantly arboreal lifestyle.', 'https://images.unsplash.com/photo-1552419290-85bf8af11e26?w=800', 'Critically Endangered', 'Tropical rainforests of Southeast Asia', 'Omnivore - fruits, leaves, bark, insects', ARRAY['Closest living relatives to humans', 'Use tools and have been observed making umbrellas', 'Share 97% of human DNA', 'Mothers teach children for 7-8 years'], '30-90 kg', '1.25-1.5 meters', '35-45 years', '104,000 in the wild', now(), now());

-- Insert comprehensive quizzes with multiple questions
INSERT INTO quizzes (id, title, description, image_url, difficulty, category, time_limit, questions, created_at, updated_at) VALUES
  (gen_random_uuid(), 'African Wildlife Safari', 'Test your knowledge about the magnificent wildlife of Africa, including elephants, lions, rhinos, and more!', 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800', 'medium', 'African Wildlife', 300, 
   '[
     {
       "text": "What is the largest land animal in Africa?",
       "options": ["African Elephant", "White Rhinoceros", "Hippopotamus", "Giraffe"],
       "correct_answer": 0
     },
     {
       "text": "How much can an adult male African elephant weigh?",
       "options": ["2-3 tons", "4-6 tons", "7-8 tons", "10-12 tons"],
       "correct_answer": 1
     },
     {
       "text": "What is the main diet of African elephants?",
       "options": ["Meat and fish", "Grasses and plants", "Fruits only", "Insects and larvae"],
       "correct_answer": 1
     },
     {
       "text": "How long is an elephant''s pregnancy?",
       "options": ["9 months", "15 months", "22 months", "30 months"],
       "correct_answer": 2
     },
     {
       "text": "What is the conservation status of African elephants?",
       "options": ["Least Concern", "Vulnerable", "Endangered", "Extinct"],
       "correct_answer": 2
     }
   ]'::jsonb, now(), now()),
   
  (gen_random_uuid(), 'Big Cats Around the World', 'Discover fascinating facts about tigers, lions, leopards, and other magnificent big cats from around the globe.', 'https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?w=800', 'hard', 'Big Cats', 420, 
   '[
     {
       "text": "Which is the largest living cat species?",
       "options": ["African Lion", "Bengal Tiger", "Jaguar", "Cougar"],
       "correct_answer": 1
     },
     {
       "text": "How fast can a tiger run?",
       "options": ["30 mph", "40 mph", "50 mph", "65 mph"],
       "correct_answer": 3
     },
     {
       "text": "What makes each tiger unique?",
       "options": ["Eye color", "Stripe pattern", "Size", "Roar sound"],
       "correct_answer": 1
     },
     {
       "text": "Where are Bengal tigers primarily found?",
       "options": ["Africa", "China", "India and Bangladesh", "Southeast Asia"],
       "correct_answer": 2
     },
     {
       "text": "How many Bengal tigers are estimated to be left in the wild?",
       "options": ["Around 500", "Around 2,500", "Around 10,000", "Around 25,000"],
       "correct_answer": 1
     },
     {
       "text": "What is the snow leopard''s conservation status?",
       "options": ["Least Concern", "Near Threatened", "Vulnerable", "Critically Endangered"],
       "correct_answer": 2
     }
   ]'::jsonb, now(), now()),
   
  (gen_random_uuid(), 'Marine Giants', 'Explore the world of ocean giants including blue whales, whale sharks, and other magnificent marine creatures.', 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800', 'easy', 'Marine Life', 240, 
   '[
     {
       "text": "What is the largest animal ever known to have lived on Earth?",
       "options": ["Sperm Whale", "Blue Whale", "Megalodon", "Diplodocus"],
       "correct_answer": 1
     },
     {
       "text": "What do blue whales primarily eat?",
       "options": ["Large fish", "Squid", "Krill", "Seaweed"],
       "correct_answer": 2
     },
     {
       "text": "How long can a blue whale grow?",
       "options": ["15-20 meters", "24-30 meters", "35-40 meters", "45-50 meters"],
       "correct_answer": 1
     },
     {
       "text": "How far can blue whale songs travel?",
       "options": ["10 miles", "100 miles", "1,000 miles", "5,000 miles"],
       "correct_answer": 2
     }
   ]'::jsonb, now(), now()),
   
  (gen_random_uuid(), 'Endangered Species Crisis', 'Learn about critically endangered animals and the conservation efforts working to save them from extinction.', 'https://images.unsplash.com/photo-1509149398892-d4e0b4f36ad9?w=800', 'hard', 'Conservation', 360, 
   '[
     {
       "text": "How many mountain gorillas are estimated to be left in the wild?",
       "options": ["Around 100", "Around 500", "Around 1,000", "Around 5,000"],
       "correct_answer": 2
     },
     {
       "text": "What percentage of DNA do humans share with mountain gorillas?",
       "options": ["95%", "98%", "99%", "100%"],
       "correct_answer": 1
     },
     {
       "text": "Which of these animals is classified as Critically Endangered?",
       "options": ["Giant Panda", "Bengal Tiger", "Mountain Gorilla", "Snow Leopard"],
       "correct_answer": 2
     },
     {
       "text": "What is the main threat to orangutan populations?",
       "options": ["Climate change", "Hunting", "Deforestation", "Disease"],
       "correct_answer": 2
     },
     {
       "text": "How long do orangutan mothers care for their young?",
       "options": ["2-3 years", "4-5 years", "7-8 years", "10-12 years"],
       "correct_answer": 2
     }
   ]'::jsonb, now(), now());

-- Additional comprehensive seed data for enhanced platform functionality

-- Conservation organizations and partners
CREATE TABLE IF NOT EXISTS conservation_organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  website VARCHAR(255),
  focus_areas TEXT[],
  established_year INTEGER,
  headquarters VARCHAR(255),
  contact_email VARCHAR(255),
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

INSERT INTO conservation_organizations (name, description, website, focus_areas, established_year, headquarters, contact_email) VALUES
('African Wildlife Foundation', 'Leading conservation organization working to protect African wildlife and wild lands', 'https://www.awf.org', ARRAY['Wildlife Protection', 'Community Conservation', 'Anti-Poaching'], 1961, 'Nairobi, Kenya', 'contact@awf.org'),
('Save the Rhino International', 'Protecting all five rhino species across Africa and Asia', 'https://www.savetherhino.org', ARRAY['Rhino Conservation', 'Anti-Poaching', 'Community Engagement'], 1992, 'London, UK', 'info@savetherhino.org'),
('Panthera', 'Global wild cat conservation organization', 'https://www.panthera.org', ARRAY['Big Cat Conservation', 'Anti-Poaching', 'Corridor Protection'], 2006, 'New York, USA', 'info@panthera.org'),
('WildCRU', 'Wildlife Conservation Research Unit at Oxford University', 'https://www.wildcru.org', ARRAY['Research', 'Lion Conservation', 'Human-Wildlife Conflict'], 1986, 'Oxford, UK', 'wildcru@zoo.ox.ac.uk'),
('Dian Fossey Gorilla Fund', 'Protecting mountain gorillas and their habitats', 'https://gorillafund.org', ARRAY['Gorilla Conservation', 'Research', 'Community Development'], 1967, 'Atlanta, USA', 'info@gorillafund.org');

-- Educational content and conservation tips
CREATE TABLE IF NOT EXISTS educational_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  content TEXT,
  category VARCHAR(100),
  difficulty VARCHAR(50),
  reading_time INTEGER, -- in minutes
  tags TEXT[],
  author VARCHAR(255),
  image_url TEXT,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

INSERT INTO educational_content (title, content, category, difficulty, reading_time, tags, author) VALUES
('Understanding Elephant Communication', 'Elephants communicate through infrasound - low-frequency sounds below human hearing range. These calls can travel several kilometers and help coordinate herd movements, warn of danger, and maintain family bonds. Scientists have identified over 70 different vocalizations in elephant communication, from rumbles and trumpets to snorts and roars. Each sound serves a specific purpose in their complex social structure.', 'Behavior', 'Intermediate', 5, ARRAY['elephants', 'communication', 'behavior'], 'Dr. Sarah Johnson'),
('The Great Migration: Nature''s Greatest Journey', 'Every year, over 2 million wildebeest, zebras, and gazelles embark on a 1,800-mile circular journey through the Serengeti-Mara ecosystem. This ancient migration follows rainfall patterns and fresh grass growth, creating one of the most spectacular wildlife events on Earth. The journey is fraught with danger - river crossings with crocodiles, predator attacks, and harsh weather conditions test the endurance of these remarkable animals.', 'Migration', 'Beginner', 7, ARRAY['migration', 'wildebeest', 'serengeti'], 'Prof. Michael Roberts'),
('Poaching Crisis: Understanding the Threat', 'Wildlife poaching remains one of the greatest threats to African wildlife. Driven by illegal trade in ivory, rhino horn, and other animal parts, poaching has devastated populations of elephants, rhinos, and other species. Understanding this crisis is crucial for effective conservation. Modern anti-poaching efforts combine technology, community engagement, and international cooperation to combat this threat.', 'Conservation', 'Advanced', 10, ARRAY['poaching', 'conservation', 'illegal-trade'], 'Dr. Amara Okonkwo'),
('Community-Based Conservation: A Success Story', 'Local communities are the frontline defenders of wildlife. Community-based conservation programs in Kenya, Tanzania, and other African countries have shown remarkable success in protecting wildlife while improving local livelihoods. These programs train community members as wildlife guardians, provide economic incentives for conservation, and create sustainable tourism opportunities.', 'Conservation', 'Intermediate', 8, ARRAY['community', 'conservation', 'sustainability'], 'Maria Gonzalez'),
('Climate Change and Wildlife: Adapting to a Changing World', 'Climate change poses unprecedented challenges for African wildlife. Changing rainfall patterns, rising temperatures, and habitat shifts force animals to adapt or face extinction. Conservation strategies must now consider climate resilience, corridor protection, and assisted migration to help species survive in a changing world.', 'Climate Change', 'Advanced', 12, ARRAY['climate-change', 'adaptation', 'conservation'], 'Dr. James Ochieng');

-- Daily conservation tips
CREATE TABLE IF NOT EXISTS daily_tips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tip_text TEXT NOT NULL,
  category VARCHAR(100),
  difficulty VARCHAR(50),
  source VARCHAR(255),
  related_species VARCHAR(255),
  action_items TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

INSERT INTO daily_tips (tip_text, category, difficulty, source, related_species, action_items) VALUES
('Did you know? Elephants can live up to 70 years and have memories that span decades. They remember migration routes, water sources, and even individual elephants they haven''t seen for years!', 'Animal Facts', 'Beginner', 'African Wildlife Foundation', 'African Elephant', ARRAY['Learn more about elephant behavior', 'Support elephant conservation']),
('Conservation tip: When visiting wildlife areas, always maintain a safe distance from animals. Use binoculars or zoom lenses for close-up viewing instead of approaching animals directly.', 'Wildlife Tourism', 'Beginner', 'Responsible Tourism Guide', 'All Species', ARRAY['Plan responsible wildlife trips', 'Educate others about wildlife etiquette']),
('Poaching fact: Advanced technology like thermal cameras and drones are revolutionizing anti-poaching efforts, helping rangers protect wildlife 24/7.', 'Conservation Technology', 'Intermediate', 'Conservation Technology Review', 'Rhino, Elephant', ARRAY['Support technology-based conservation', 'Learn about modern conservation methods']),
('Habitat tip: Creating wildlife corridors that connect protected areas allows animals to migrate safely and maintains genetic diversity in populations.', 'Habitat Conservation', 'Advanced', 'Conservation Biology Journal', 'Multiple Species', ARRAY['Support corridor projects', 'Learn about landscape conservation']),
('Community fact: Indigenous and local communities manage or have rights over 25% of the world''s land surface and support about 80% of global biodiversity.', 'Community Conservation', 'Intermediate', 'UN Environment Programme', 'All Species', ARRAY['Support indigenous rights', 'Learn about traditional conservation']);

-- Success stories to inspire users
CREATE TABLE IF NOT EXISTS success_stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  species VARCHAR(255),
  location VARCHAR(255),
  organization VARCHAR(255),
  impact_metrics JSONB,
  story_url TEXT,
  image_url TEXT,
  year INTEGER,
  category VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

INSERT INTO success_stories (title, description, species, location, organization, impact_metrics, category, year) VALUES
('Mountain Gorilla Population Recovery', 'Mountain gorilla numbers have increased from 620 in 1989 to over 1,000 today through dedicated conservation efforts including anti-poaching patrols, veterinary care, and community engagement programs.', 'Mountain Gorilla', 'Rwanda, Uganda, DRC', 'Dian Fossey Gorilla Fund', '{"population_increase": "60%", "protected_areas": 3, "tourism_revenue": "$500M", "communities_involved": 25}', 'Population Recovery', 2020),
('Black Rhino Conservation Success', 'Kenya''s black rhino population has grown from 20 in the 1980s to over 750 today through intensive protection, breeding programs, and translocation efforts.', 'Black Rhinoceros', 'Kenya', 'Kenya Wildlife Service', '{"population_growth": "3600%", "sanctuaries": 8, "translocations": 150, "births": 200}', 'Population Recovery', 2019),
('Anti-Poaching Technology Success', 'Advanced tracking and surveillance technology has reduced elephant poaching by 80% in key reserves, saving hundreds of elephants annually.', 'African Elephant', 'Tanzania', 'African Wildlife Foundation', '{"poaching_reduction": "80%", "technology_deployed": 50, "rangers_trained": 300, "elephants_saved": 500}', 'Anti-Poaching', 2021),
('Community Conservancy Growth', 'Northern Kenya conservancies have grown from 2 in 1995 to over 40 today, covering 11 million acres and supporting both wildlife and local communities.', 'Multiple Species', 'Northern Kenya', 'Northern Rangelands Trust', '{"conservancies": 40, "area_protected": "11M acres", "households_benefiting": 300000, "wildlife_increase": "40%"}', 'Community Conservation', 2022),
('Cheetah Reintroduction Program', 'Successful reintroduction of cheetahs to Malawi after 20 years of local extinction, with the first cubs born in the wild marking a conservation milestone.', 'Cheetah', 'Malawi', 'African Parks', '{"cheetahs_reintroduced": 7, "cubs_born": 4, "survival_rate": "85%", "territory_established": "200km2"}', 'Species Reintroduction', 2023);

-- Learning paths for structured education
CREATE TABLE IF NOT EXISTS learning_paths (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  difficulty VARCHAR(50),
  estimated_duration INTEGER, -- in hours
  quiz_sequence TEXT[], -- array of quiz titles in recommended order
  prerequisites TEXT[],
  learning_objectives TEXT[],
  completion_reward JSONB,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

INSERT INTO learning_paths (name, description, difficulty, estimated_duration, quiz_sequence, learning_objectives, completion_reward) VALUES
('African Big Five Explorer', 'Complete journey through learning about Africa''s most iconic animals - the Big Five and their conservation stories.', 'Beginner', 3, ARRAY['African Big Five Safari', 'Conservation Heroes', 'Savanna Ecosystem'], ARRAY['Identify Big Five species', 'Understand conservation status', 'Learn habitat requirements', 'Recognize conservation threats'], '{"badge": "Big Five Expert", "points": 300, "certificate": true}'),
('Conservation Champion Track', 'Comprehensive understanding of wildlife conservation principles, practices, and modern approaches to protecting endangered species.', 'Advanced', 8, ARRAY['Conservation Heroes', 'Endangered Species Crisis', 'Conservation Technology', 'Community Conservation'], ARRAY['Understand conservation biology', 'Learn about ecosystem management', 'Study human-wildlife conflict', 'Explore conservation technology', 'Understand policy and governance'], '{"badge": "Conservation Champion", "points": 800, "certificate": true, "expert_status": true}'),
('Primate Specialist Path', 'Deep dive into the fascinating world of African primates, their behavior, intelligence, and conservation challenges.', 'Intermediate', 4, ARRAY['Primate Intelligence', 'Great Apes of Africa', 'Primate Conservation'], ARRAY['Study primate behavior', 'Learn about social structures', 'Understand conservation challenges', 'Explore research methods', 'Learn about human-primate relationships'], '{"badge": "Primate Specialist", "points": 400, "certificate": true}'),
('Marine Conservation Explorer', 'Explore the marine ecosystems around Africa and the conservation efforts protecting ocean wildlife.', 'Intermediate', 5, ARRAY['African Marine Life', 'Coastal Conservation', 'Ocean Pollution'], ARRAY['Understand marine ecosystems', 'Learn about coastal species', 'Study ocean conservation', 'Explore marine protected areas'], '{"badge": "Marine Biologist", "points": 350, "certificate": true}');

-- User engagement analytics
CREATE TABLE IF NOT EXISTS user_engagement (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  action_type VARCHAR(100) NOT NULL,
  action_data JSONB,
  session_id VARCHAR(255),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Platform achievements and milestones
CREATE TABLE IF NOT EXISTS platform_milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  milestone_type VARCHAR(100) NOT NULL,
  description TEXT,
  target_value INTEGER,
  current_value INTEGER DEFAULT 0,
  achieved BOOLEAN DEFAULT FALSE,
  achieved_date TIMESTAMP WITH TIME ZONE,
  reward JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

INSERT INTO platform_milestones (milestone_type, description, target_value, current_value, achieved) VALUES
('Total Users', 'Reach 10,000 registered users', 10000, 1250, FALSE),
('Quizzes Completed', 'Achieve 100,000 quiz completions', 100000, 25680, FALSE),
('Conservation Impact', 'Raise $100,000 for conservation', 100000, 15000, FALSE),
('Educational Content', 'Publish 500 educational articles', 500, 45, FALSE),
('Community Engagement', 'Foster 1,000 active community discussions', 1000, 156, FALSE);

-- Sample user activity for demonstration
INSERT INTO user_engagement (user_id, action_type, action_data) 
SELECT 
  u.id,
  (ARRAY['quiz_completed', 'badge_earned', 'content_read', 'tip_shared', 'profile_updated'])[floor(random() * 5 + 1)],
  '{"engagement_score": ' || (random() * 100)::integer || ', "time_spent": ' || (random() * 3600)::integer || '}'
FROM users u, generate_series(1, 5) -- 5 activities per user

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_conservation_organizations_focus ON conservation_organizations USING GIN(focus_areas);
CREATE INDEX IF NOT EXISTS idx_educational_content_category ON educational_content(category);
CREATE INDEX IF NOT EXISTS idx_educational_content_tags ON educational_content USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_daily_tips_category ON daily_tips(category);
CREATE INDEX IF NOT EXISTS idx_success_stories_species ON success_stories(species);
CREATE INDEX IF NOT EXISTS idx_success_stories_year ON success_stories(year);
CREATE INDEX IF NOT EXISTS idx_learning_paths_difficulty ON learning_paths(difficulty);
CREATE INDEX IF NOT EXISTS idx_user_engagement_user_id ON user_engagement(user_id);
CREATE INDEX IF NOT EXISTS idx_user_engagement_timestamp ON user_engagement(timestamp);
CREATE INDEX IF NOT EXISTS idx_platform_milestones_achieved ON platform_milestones(achieved);

-- Update statistics
UPDATE platform_stats SET 
  total_users = (SELECT COUNT(*) FROM users),
  active_users = (SELECT COUNT(*) FROM users WHERE last_login > now() - interval '30 days'),
  quizzes_completed_today = (SELECT COUNT(*) FROM quiz_results WHERE completed_at::date = CURRENT_DATE),
  badges_awarded_today = (SELECT COUNT(*) FROM badges WHERE awarded_at::date = CURRENT_DATE)
WHERE stat_date = CURRENT_DATE;
