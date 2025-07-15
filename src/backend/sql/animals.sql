-- Animals table
CREATE TABLE IF NOT EXISTS animals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  scientific_name VARCHAR(255),
  species VARCHAR(255),
  habitat VARCHAR(255),
  conservation_status VARCHAR(100),
  description TEXT,
  image_url TEXT,
  weight_range VARCHAR(100),
  height_range VARCHAR(100),
  lifespan VARCHAR(100),
  diet VARCHAR(100),
  location TEXT[],
  interesting_facts TEXT[],
  threats TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert comprehensive animal data
INSERT INTO animals (name, scientific_name, species, habitat, conservation_status, description, image_url, weight_range, height_range, lifespan, diet, location, interesting_facts, threats) VALUES

-- African Elephants
('African Bush Elephant', 'Loxodonta africana', 'Elephant', 'Savanna, Grasslands, Forests', 'Endangered', 'The largest living terrestrial animal, African bush elephants are known for their intelligence, complex social structures, and crucial role in ecosystem maintenance.', 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800', '4,000-7,000 kg', '3-4 meters', '60-70 years', 'Herbivore', ARRAY['Kenya', 'Tanzania', 'Botswana', 'Zimbabwe', 'South Africa'], ARRAY['Can live up to 70 years', 'Have excellent memory', 'Communicate through infrasound', 'Matriarchal society'], ARRAY['Poaching for ivory', 'Habitat loss', 'Human-wildlife conflict']),

('African Forest Elephant', 'Loxodonta cyclotis', 'Elephant', 'Dense Forests', 'Critically Endangered', 'Smaller than their savanna cousins, forest elephants are crucial seed dispersers in Central African forests.', 'https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?w=800', '2,000-5,000 kg', '2-3 meters', '60-70 years', 'Herbivore', ARRAY['Cameroon', 'Central African Republic', 'Republic of the Congo', 'Democratic Republic of Congo', 'Equatorial Guinea', 'Gabon'], ARRAY['Straighter, downward-pointing tusks', 'Essential for forest regeneration', 'More elusive than bush elephants'], ARRAY['Poaching', 'Deforestation', 'Mining activities']),

-- Big Cats
('African Lion', 'Panthera leo', 'Big Cat', 'Savanna, Grasslands', 'Vulnerable', 'Known as the "King of the Jungle," lions are apex predators living in prides with complex social hierarchies.', 'https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?w=800', '120-250 kg', '1.2 meters', '10-14 years', 'Carnivore', ARRAY['Kenya', 'Tanzania', 'South Africa', 'Botswana', 'Zambia'], ARRAY['Only cats that live in groups', 'Males can eat up to 40kg in one meal', 'Roar can be heard 8km away', 'Lionesses do most hunting'], ARRAY['Habitat loss', 'Human-wildlife conflict', 'Trophy hunting']),

('African Leopard', 'Panthera pardus pardus', 'Big Cat', 'Various: Forests, Savannas, Mountains', 'Near Threatened', 'Highly adaptable and solitary cats known for their strength, stealth, and ability to drag prey up trees.', 'https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?w=800', '30-90 kg', '0.6-0.7 meters', '12-17 years', 'Carnivore', ARRAY['Throughout Africa'], ARRAY['Can drag prey twice their weight up trees', 'Excellent swimmers', 'Each has unique rosette patterns', 'Most widespread big cat'], ARRAY['Habitat fragmentation', 'Poaching', 'Prey depletion']),

('Cheetah', 'Acinonyx jubatus', 'Big Cat', 'Open Savannas, Grasslands', 'Vulnerable', 'The fastest land animal, capable of reaching speeds up to 120 km/h in short bursts.', 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800', '35-72 kg', '0.7-0.9 meters', '8-12 years', 'Carnivore', ARRAY['Namibia', 'Botswana', 'Kenya', 'Tanzania'], ARRAY['Can reach 120 km/h', 'Cannot roar, only purr', 'Semi-retractable claws for traction', 'Distinctive tear marks'], ARRAY['Habitat loss', 'Human-wildlife conflict', 'Genetic bottleneck']),

-- Rhinoceros
('Black Rhinoceros', 'Diceros bicornis', 'Rhinoceros', 'Savannas, Shrublands', 'Critically Endangered', 'Despite their name, black rhinos are actually gray. They are smaller than white rhinos and have a pointed lip for browsing.', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800', '800-1,400 kg', '1.4-1.8 meters', '35-50 years', 'Herbivore', ARRAY['Kenya', 'Tanzania', 'Namibia', 'South Africa', 'Zimbabwe'], ARRAY['Actually gray in color', 'Pointed lip for browsing', 'Can run up to 55 km/h', 'Poor eyesight but excellent hearing'], ARRAY['Poaching for horn', 'Habitat loss', 'Political instability']),

('White Rhinoceros', 'Ceratotherium simum', 'Rhinoceros', 'Grasslands, Savannas', 'Near Threatened', 'The largest rhino species with a wide, square lip adapted for grazing grass.', 'https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?w=800', '1,500-2,300 kg', '1.5-1.8 meters', '40-50 years', 'Herbivore', ARRAY['South Africa', 'Namibia', 'Zimbabwe', 'Kenya'], ARRAY['Actually gray, not white', 'Square lip for grazing', 'Social animals', 'Second largest land mammal'], ARRAY['Poaching', 'Habitat encroachment', 'Limited genetic diversity']),

-- Primates
('Mountain Gorilla', 'Gorilla beringei beringei', 'Primate', 'Mountain Forests', 'Critically Endangered', 'One of our closest relatives, mountain gorillas live in family groups led by a dominant silverback male.', 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800', '70-220 kg', '1.25-1.8 meters', '35-40 years', 'Herbivore', ARRAY['Rwanda', 'Uganda', 'Democratic Republic of Congo'], ARRAY['Share 98% DNA with humans', 'Led by silverback males', 'Communicate with over 25 sounds', 'Build new nests each night'], ARRAY['Habitat loss', 'Poaching', 'Disease transmission', 'Political instability']),

('Chimpanzee', 'Pan troglodytes', 'Primate', 'Tropical Forests', 'Endangered', 'Highly intelligent primates known for tool use, complex social behaviors, and strong family bonds.', 'https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?w=800', '32-60 kg', '1-1.7 meters', '40-50 years', 'Omnivore', ARRAY['Democratic Republic of Congo', 'Cameroon', 'Equatorial Guinea', 'Gabon'], ARRAY['Use tools for fishing termites', 'Can learn sign language', 'Live in fission-fusion societies', 'Share 99% DNA with humans'], ARRAY['Deforestation', 'Poaching', 'Disease', 'Human encroachment']),

-- Zebras
('Plains Zebra', 'Equus quagga', 'Zebra', 'Grasslands, Savannas', 'Near Threatened', 'The most common zebra species, known for their distinctive black and white stripes and migratory behavior.', 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800', '175-385 kg', '1.1-1.4 meters', '20-25 years', 'Herbivore', ARRAY['Kenya', 'Tanzania', 'Botswana', 'South Africa'], ARRAY['Each has unique stripe pattern', 'Stripes may deter flies', 'Excellent hearing and eyesight', 'Part of great migration'], ARRAY['Habitat loss', 'Competition with livestock', 'Hunting']),

('Grevy''s Zebra', 'Equus grevyii', 'Zebra', 'Semi-arid Grasslands', 'Endangered', 'The largest wild equid with the narrowest stripes and distinctive large, rounded ears.', 'https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?w=800', '350-450 kg', '1.2-1.5 meters', '20-25 years', 'Herbivore', ARRAY['Kenya', 'Ethiopia'], ARRAY['Largest wild equid', 'Narrowest stripes', 'Large rounded ears', 'White belly with no stripes'], ARRAY['Habitat degradation', 'Competition for water', 'Hunting', 'Disease']),

-- Giraffes
('Masai Giraffe', 'Giraffa camelopardalis tippelskirchii', 'Giraffe', 'Savannas, Woodlands', 'Endangered', 'The tallest mammal on Earth, with distinctive jagged-edged spots and incredible height for reaching acacia leaves.', 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800', '800-1,200 kg', '4.5-5.5 meters', '20-25 years', 'Herbivore', ARRAY['Kenya', 'Tanzania'], ARRAY['Tallest mammal on Earth', '18-inch tongue', 'Only 2 hours sleep per day', 'Heart weighs 11kg'], ARRAY['Habitat fragmentation', 'Poaching', 'Human encroachment']),

('Reticulated Giraffe', 'Giraffa camelopardalis reticulata', 'Giraffe', 'Savannas, Woodlands', 'Endangered', 'Distinguished by their liver-colored patches outlined by bright white lines, creating a net-like pattern.', 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800', '700-1,200 kg', '4.5-5.5 meters', '20-25 years', 'Herbivore', ARRAY['Kenya', 'Ethiopia', 'Somalia'], ARRAY['Net-like pattern on coat', 'Each pattern is unique', 'Can run up to 60 km/h', 'Blue-black tongue'], ARRAY['Habitat loss', 'Fragmentation', 'Civil unrest']),

-- Hippos
('Common Hippopotamus', 'Hippopotamus amphibius', 'Hippopotamus', 'Rivers, Lakes', 'Vulnerable', 'Semi-aquatic mammals that spend most of their day in water to keep cool, emerging at night to graze.', 'https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?w=800', '1,300-1,800 kg', '1.5 meters', '40-50 years', 'Herbivore', ARRAY['Throughout sub-Saharan Africa'], ARRAY['Can hold breath for 5 minutes', 'Closest relatives are whales', 'Can run 30 km/h on land', 'Skin secretes natural sunscreen'], ARRAY['Habitat loss', 'Human encroachment', 'Hunting']),

-- Crocodiles
('Nile Crocodile', 'Crocodylus niloticus', 'Crocodile', 'Rivers, Lakes, Marshes', 'Least Concern', 'Africa''s largest crocodilian and one of the continent''s most successful predators.', 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800', '225-750 kg', '4-5 meters', '45-100 years', 'Carnivore', ARRAY['Throughout Africa'], ARRAY['Can live over 100 years', 'Excellent mothers', 'Death roll hunting technique', 'Can go months without eating'], ARRAY['Habitat destruction', 'Pollution', 'Human persecution']),

-- Antelopes
('Wildebeest', 'Connochaetes taurinus', 'Antelope', 'Grasslands, Savannas', 'Least Concern', 'Key species in the great migration, traveling in massive herds across the Serengeti ecosystem.', 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800', '110-250 kg', '1.1-1.3 meters', '15-20 years', 'Herbivore', ARRAY['Kenya', 'Tanzania', 'Botswana'], ARRAY['Great migration participant', 'Travel in huge herds', 'Calves can run within minutes of birth', 'Communicate through grunting'], ARRAY['Habitat fragmentation', 'Disease', 'Drought']),

('Impala', 'Aepyceros melampus', 'Antelope', 'Woodlands, Savannas', 'Least Concern', 'Medium-sized antelopes known for their incredible leaping ability and graceful movements.', 'https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?w=800', '40-65 kg', '0.7-0.9 meters', '12-15 years', 'Herbivore', ARRAY['Eastern and Southern Africa'], ARRAY['Can jump 3 meters high', 'Can leap 10 meters far', 'Live in mixed herds', 'Excellent runners and swimmers'], ARRAY['Habitat loss', 'Hunting', 'Disease']),

-- Birds
('African Fish Eagle', 'Haliaeetus vocifer', 'Bird of Prey', 'Rivers, Lakes, Coasts', 'Least Concern', 'National bird of several African countries, known for its distinctive call and fishing prowess.', 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800', '2-3.6 kg', '0.6-0.7 meters', '12-24 years', 'Piscivore', ARRAY['Throughout sub-Saharan Africa'], ARRAY['National bird of Zambia', 'Distinctive call echoes across water', 'Mates for life', 'Symbol on many African flags'], ARRAY['Water pollution', 'Habitat destruction', 'Overfishing']),

('Ostrich', 'Struthio camelus', 'Flightless Bird', 'Savannas, Semi-deserts', 'Least Concern', 'The world''s largest bird, capable of running at speeds up to 70 km/h.', 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800', '90-130 kg', '1.7-2.8 meters', '30-40 years', 'Omnivore', ARRAY['Throughout Africa'], ARRAY['World''s largest bird', 'Can run 70 km/h', 'Eyes larger than brain', 'Males incubate eggs'], ARRAY['Habitat loss', 'Hunting', 'Egg collection']),

-- Unique African Species
('Aardvark', 'Orycteropus afer', 'Aardvark', 'Savannas, Grasslands', 'Least Concern', 'Nocturnal mammals with powerful claws for digging, feeding primarily on ants and termites.', 'https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?w=800', '40-65 kg', '0.4-0.6 meters', '18-23 years', 'Insectivore', ARRAY['Sub-Saharan Africa'], ARRAY['Can dig faster than humans with shovels', 'Excellent sense of smell', 'Solitary and nocturnal', 'Can close nostrils while digging'], ARRAY['Habitat conversion', 'Hunting', 'Agricultural expansion']),

('Pangolin', 'Manis temminckii', 'Pangolin', 'Various habitats', 'Vulnerable', 'The world''s only truly scaly mammal, highly specialized for eating ants and termites.', 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800', '5-18 kg', '0.3-0.6 meters', '12-20 years', 'Insectivore', ARRAY['Southern and Eastern Africa'], ARRAY['Only scaly mammal', 'Can roll into a ball', 'No teeth, long sticky tongue', 'Walk on hind legs'], ARRAY['Poaching for scales', 'Traditional medicine trade', 'Habitat loss']);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_animals_conservation_status ON animals(conservation_status);
CREATE INDEX IF NOT EXISTS idx_animals_species ON animals(species);
CREATE INDEX IF NOT EXISTS idx_animals_habitat ON animals(habitat);
CREATE INDEX IF NOT EXISTS idx_animals_name ON animals(name);