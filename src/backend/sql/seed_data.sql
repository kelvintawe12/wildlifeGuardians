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

-- Note: Users and profiles will be created through the authentication system
-- Badge and quiz result data will be generated through user interactions
