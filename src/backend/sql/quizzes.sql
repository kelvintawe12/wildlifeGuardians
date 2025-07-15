-- Quizzes table
CREATE TABLE IF NOT EXISTS quizzes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  difficulty VARCHAR(50),
  duration_minutes INTEGER DEFAULT 10,
  image_url TEXT,
  questions JSONB,
  total_questions INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert comprehensive quiz data
INSERT INTO quizzes (title, description, category, difficulty, duration_minutes, total_questions, image_url, questions) VALUES

('African Big Five Safari', 'Test your knowledge about Africa''s most iconic animals - the Big Five!', 'Wildlife', 'Intermediate', 15, 10, 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800', 
'[
  {
    "id": 1,
    "question": "Which of the Big Five is NOT actually native to Africa?",
    "options": ["Lion", "Elephant", "Rhinoceros", "All are native to Africa"],
    "correct": 3,
    "explanation": "All of the Big Five (Lion, Leopard, Rhinoceros, Elephant, and Cape Buffalo) are native to Africa."
  },
  {
    "id": 2,
    "question": "What is the main reason elephants are endangered?",
    "options": ["Climate change", "Disease", "Poaching for ivory", "Natural predators"],
    "correct": 2,
    "explanation": "Poaching for ivory tusks is the primary threat to elephant populations across Africa."
  },
  {
    "id": 3,
    "question": "How fast can a cheetah run?",
    "options": ["80 km/h", "100 km/h", "120 km/h", "140 km/h"],
    "correct": 2,
    "explanation": "Cheetahs can reach speeds of up to 120 km/h, making them the fastest land animal."
  },
  {
    "id": 4,
    "question": "What distinguishes a black rhino from a white rhino?",
    "options": ["Color", "Size", "Lip shape", "Horn number"],
    "correct": 2,
    "explanation": "Black rhinos have pointed lips for browsing, while white rhinos have square lips for grazing."
  },
  {
    "id": 5,
    "question": "Lions live in groups called:",
    "options": ["Herds", "Packs", "Prides", "Flocks"],
    "correct": 2,
    "explanation": "Lions are the only cats that live in social groups called prides."
  }
]'),

('Primate Intelligence', 'Explore the fascinating world of African primates and their remarkable intelligence.', 'Primates', 'Advanced', 20, 12, 'https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?w=800',
'[
  {
    "id": 1,
    "question": "What percentage of DNA do humans share with chimpanzees?",
    "options": ["95%", "98%", "99%", "100%"],
    "correct": 2,
    "explanation": "Humans and chimpanzees share approximately 99% of their DNA, making them our closest living relatives."
  },
  {
    "id": 2,
    "question": "Mountain gorillas are led by:",
    "options": ["The oldest female", "A silverback male", "The largest individual", "They have no leader"],
    "correct": 1,
    "explanation": "Mountain gorilla groups are led by a dominant silverback male who makes decisions for the group."
  },
  {
    "id": 3,
    "question": "Chimpanzees use tools for:",
    "options": ["Building nests only", "Fishing for termites", "Defense only", "They dont use tools"],
    "correct": 1,
    "explanation": "Chimpanzees are known to use sticks and grass to fish termites out of mounds, showing remarkable tool use."
  }
]'),

('African Bird Migration', 'Learn about the incredible journeys of African migratory birds.', 'Birds', 'Beginner', 10, 8, 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800',
'[
  {
    "id": 1,
    "question": "Which bird is known as the national bird of several African countries?",
    "options": ["Ostrich", "African Fish Eagle", "Secretary Bird", "Flamingo"],
    "correct": 1,
    "explanation": "The African Fish Eagle is the national bird of Zambia, Zimbabwe, and South Sudan."
  },
  {
    "id": 2,
    "question": "Ostriches can run at speeds of up to:",
    "options": ["40 km/h", "50 km/h", "60 km/h", "70 km/h"],
    "correct": 3,
    "explanation": "Ostriches can run at speeds of up to 70 km/h, making them the fastest-running birds."
  }
]'),

('Conservation Heroes', 'Test your knowledge about wildlife conservation efforts across Africa.', 'Conservation', 'Intermediate', 18, 15, 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800',
'[
  {
    "id": 1,
    "question": "What is the main goal of anti-poaching units?",
    "options": ["Tourism promotion", "Protecting wildlife from illegal hunting", "Research", "Education"],
    "correct": 1,
    "explanation": "Anti-poaching units work to protect wildlife from illegal hunting and trafficking."
  },
  {
    "id": 2,
    "question": "Community-based conservation programs focus on:",
    "options": ["Excluding local communities", "Involving local communities in conservation", "Government control only", "Tourism revenue only"],
    "correct": 1,
    "explanation": "Community-based conservation involves local communities as partners in protecting wildlife and their habitats."
  }
]'),

('Savanna Ecosystem', 'Discover the complex relationships in African savanna ecosystems.', 'Ecosystems', 'Advanced', 25, 18, 'https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?w=800',
'[
  {
    "id": 1,
    "question": "Which animal is considered a keystone species in savanna ecosystems?",
    "options": ["Zebra", "Elephant", "Antelope", "Lion"],
    "correct": 1,
    "explanation": "Elephants are keystone species because they modify habitats in ways that benefit many other species."
  },
  {
    "id": 2,
    "question": "The Great Migration primarily involves:",
    "options": ["Elephants", "Lions", "Wildebeest and zebras", "Giraffes"],
    "correct": 2,
    "explanation": "The Great Migration is the annual movement of over 2 million wildebeest, zebras, and gazelles."
  }
]'),

('Reptiles of Africa', 'Explore the diverse world of African reptiles and their adaptations.', 'Reptiles', 'Intermediate', 12, 10, 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800',
'[
  {
    "id": 1,
    "question": "Nile crocodiles can live for:",
    "options": ["20-30 years", "40-50 years", "60-80 years", "Over 100 years"],
    "correct": 3,
    "explanation": "Nile crocodiles can live for over 100 years, making them one of the longest-living reptiles."
  },
  {
    "id": 2,
    "question": "What hunting technique are crocodiles famous for?",
    "options": ["Ambush hunting", "Pack hunting", "Death roll", "Speed chasing"],
    "correct": 2,
    "explanation": "Crocodiles use the death roll technique to disorient and subdue their prey."
  }
]'),

('African Marine Life', 'Dive into the marine ecosystems around the African continent.', 'Marine', 'Beginner', 15, 12, 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800',
'[
  {
    "id": 1,
    "question": "Which ocean borders the western coast of Africa?",
    "options": ["Indian Ocean", "Atlantic Ocean", "Pacific Ocean", "Arctic Ocean"],
    "correct": 1,
    "explanation": "The Atlantic Ocean borders the western coast of Africa."
  },
  {
    "id": 2,
    "question": "Great White Sharks can be found off the coast of:",
    "options": ["South Africa", "Morocco", "Egypt", "All of the above"],
    "correct": 0,
    "explanation": "South Africa, particularly around Cape Town, is famous for its Great White Shark populations."
  }
]'),

('Nocturnal African Wildlife', 'Learn about the amazing animals that come alive after dark in Africa.', 'Nocturnal', 'Advanced', 20, 14, 'https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?w=800',
'[
  {
    "id": 1,
    "question": "Which animal is known for its excellent digging abilities?",
    "options": ["Hyena", "Aardvark", "Jackal", "Serval"],
    "correct": 1,
    "explanation": "Aardvarks are exceptional diggers, capable of digging faster than humans with shovels."
  },
  {
    "id": 2,
    "question": "Pangolins are unique because they are:",
    "options": ["The only flying mammals", "The only scaly mammals", "The largest mammals", "The smallest mammals"],
    "correct": 1,
    "explanation": "Pangolins are the world''s only truly scaly mammals, covered in keratin scales."
  }
]'),

('Endangered Species Crisis', 'Understanding the threats facing Africa''s most vulnerable wildlife.', 'Conservation', 'Advanced', 22, 16, 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800',
'[
  {
    "id": 1,
    "question": "Which rhino subspecies was declared extinct in 2018?",
    "options": ["Black rhino", "White rhino", "Northern white rhino", "Southern white rhino"],
    "correct": 2,
    "explanation": "The northern white rhinoceros was declared functionally extinct in 2018 with only two females remaining."
  },
  {
    "id": 2,
    "question": "The main threat to mountain gorillas is:",
    "options": ["Climate change", "Habitat loss", "Disease", "All of the above"],
    "correct": 3,
    "explanation": "Mountain gorillas face multiple threats including habitat loss, disease transmission, and climate change."
  }
]'),

('African Antelope Diversity', 'Explore the incredible diversity of African antelopes and their adaptations.', 'Wildlife', 'Intermediate', 16, 12, 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800',
'[
  {
    "id": 1,
    "question": "Impalas are known for their ability to:",
    "options": ["Swim long distances", "Jump incredible heights", "Run backwards", "Change color"],
    "correct": 1,
    "explanation": "Impalas can jump up to 3 meters high and 10 meters in distance, helping them escape predators."
  },
  {
    "id": 2,
    "question": "Which antelope participates in the Great Migration?",
    "options": ["Impala", "Kudu", "Wildebeest", "Waterbuck"],
    "correct": 2,
    "explanation": "Wildebeest are the primary participants in the Great Migration across the Serengeti-Mara ecosystem."
  }
]');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_quizzes_category ON quizzes(category);
CREATE INDEX IF NOT EXISTS idx_quizzes_difficulty ON quizzes(difficulty);
CREATE INDEX IF NOT EXISTS idx_quizzes_duration ON quizzes(duration_minutes);
