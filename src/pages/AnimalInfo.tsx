import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAnimalById } from '../services/supabaseClient';
import { ArrowLeftIcon, GlobeIcon, AlertTriangleIcon, HeartIcon, BookOpenIcon } from 'lucide-react';
import { toast } from 'sonner';
interface Animal {
  id: string;
  name: string;
  scientific_name: string;
  conservation_status: string;
  habitat: string;
  description: string;
  facts: string[];
  threats: string[];
  conservation_efforts: string[];
  image_url: string;
  location_map?: string;
}
const AnimalInfo: React.FC = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        setIsLoading(true);
        if (!id) return;
        const animalData = await getAnimalById(id);
        setAnimal(animalData);
      } catch (error) {
        console.error('Error fetching animal data:', error);
        toast.error('Failed to load animal information');
        // For demo purposes, use sample data if API fails
        setAnimal(sampleAnimal);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAnimal();
  }, [id]);
  // Sample animal data for demonstration
  const sampleAnimal: Animal = {
    id: '1',
    name: 'Mountain Gorilla',
    scientific_name: 'Gorilla beringei beringei',
    conservation_status: 'Endangered',
    habitat: 'Mountain forests of Rwanda, Uganda, and the Democratic Republic of Congo',
    description: 'Mountain gorillas are one of the most endangered great apes. They live in the cloud forests of the Virunga Mountains at elevations of 8,000 to 13,000 feet. These gorillas have thicker fur compared to other great apes, allowing them to live in colder temperatures.',
    facts: ['Mountain gorillas share 98% of their DNA with humans', 'They live in groups called troops, led by a dominant male silverback', 'A silverback can weigh up to 180 kg (400 lb) and stand 1.8 m (6 ft) tall', 'They are herbivores, mainly eating leaves, shoots, and stems', 'Females typically give birth to one baby every 4-6 years'],
    threats: ['Habitat loss due to human encroachment', 'Poaching and hunting', 'Civil unrest in their native regions', 'Diseases transmitted by humans', 'Climate change affecting their mountain habitats'],
    conservation_efforts: ['Protected national parks in Rwanda, Uganda, and DRC', 'Ecotourism programs that fund conservation', 'Anti-poaching patrols and monitoring', 'Community education and involvement', 'International cooperation and funding'],
    image_url: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    location_map: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Mountain_gorilla_distribution.svg/1200px-Mountain_gorilla_distribution.svg.png'
  };
  if (isLoading) {
    return <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>;
  }
  if (!animal) {
    return <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-700">
          Animal information not found
        </h2>
        <button onClick={() => navigate('/')} className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Home
        </button>
      </div>;
  }
  // Helper function to get conservation status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'extinct':
        return 'bg-black text-white';
      case 'extinct in the wild':
        return 'bg-gray-800 text-white';
      case 'critically endangered':
        return 'bg-red-600 text-white';
      case 'endangered':
        return 'bg-red-500 text-white';
      case 'vulnerable':
        return 'bg-orange-500 text-white';
      case 'near threatened':
        return 'bg-yellow-500 text-white';
      case 'least concern':
        return 'bg-green-500 text-white';
      default:
        return 'bg-blue-500 text-white';
    }
  };
  return <div className="max-w-4xl mx-auto">
      {/* Back button */}
      <button onClick={() => navigate(-1)} className="mb-4 inline-flex items-center text-green-600 hover:text-green-700">
        <ArrowLeftIcon className="h-4 w-4 mr-1" />
        <span>Back</span>
      </button>
      {/* Hero section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="h-64 md:h-80 relative">
          <img src={animal.image_url} alt={animal.name} className="w-full h-full object-cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
              {animal.name}
            </h1>
            <p className="text-gray-200 italic">{animal.scientific_name}</p>
            <div className="mt-2">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(animal.conservation_status)}`}>
                {animal.conservation_status}
              </span>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3 flex items-center">
              <BookOpenIcon className="h-5 w-5 mr-2 text-green-600" />
              About
            </h2>
            <p className="text-gray-700">{animal.description}</p>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3 flex items-center">
              <GlobeIcon className="h-5 w-5 mr-2 text-green-600" />
              Habitat
            </h2>
            <p className="text-gray-700">{animal.habitat}</p>
            {animal.location_map && <div className="mt-4">
                <img src={animal.location_map} alt={`${animal.name} distribution map`} className="w-full max-h-60 object-contain rounded-md" />
                <p className="text-sm text-gray-500 mt-1 text-center">
                  Distribution map
                </p>
              </div>}
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Interesting Facts</h2>
            <ul className="space-y-2">
              {animal.facts.map((fact, index) => <li key={index} className="flex items-start">
                  <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-green-100 text-green-600 text-xs mr-2 mt-0.5 flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{fact}</span>
                </li>)}
            </ul>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3 flex items-center">
              <AlertTriangleIcon className="h-5 w-5 mr-2 text-orange-500" />
              Threats
            </h2>
            <ul className="space-y-2">
              {animal.threats.map((threat, index) => <li key={index} className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span className="text-gray-700">{threat}</span>
                </li>)}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-3 flex items-center">
              <HeartIcon className="h-5 w-5 mr-2 text-red-500" />
              Conservation Efforts
            </h2>
            <ul className="space-y-2">
              {animal.conservation_efforts.map((effort, index) => <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span className="text-gray-700">{effort}</span>
                </li>)}
            </ul>
          </div>
        </div>
      </div>
      {/* Call to action */}
      <div className="bg-green-50 border border-green-100 rounded-lg p-6 text-center mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Help Protect {animal.name}s
        </h3>
        <p className="text-gray-600 mb-4">
          Learning is the first step. Share what you've learned with friends and
          family to raise awareness!
        </p>
        <button onClick={() => navigate('/quiz/1')} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
          Take a Quiz About {animal.name}s
        </button>
      </div>
    </div>;
};
export default AnimalInfo;