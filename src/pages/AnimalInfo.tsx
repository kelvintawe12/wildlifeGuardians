import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAnimalById } from '../services/supabaseClient';
import { ArrowLeftIcon, GlobeIcon, AlertTriangleIcon, HeartIcon, BookOpenIcon } from 'lucide-react';
import { toast } from 'sonner';
interface Animal {
  id: string;
  name: string;
  scientific_name: string | null;
  species: string | null;
  habitat: string | null;
  conservation_status: string | null;
  description: string | null;
  facts?: string[];
  fun_facts?: string[];
  threats?: string[];
  conservation_efforts?: string[];
  image_url: string;
  location: string[] | null;
  weight_range: string | null;
  height_range: string | null;
  lifespan: string | null;
  diet: string | null;
  interesting_facts?: string[];
  // Remove created_at and updated_at from interface as they are not used in component
  // created_at?: string;
  // updated_at?: string;
  location_map?: string;
}
const AnimalInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
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
        setAnimal(null); // No fallback to sampleAnimal
      } finally {
        setIsLoading(false);
      }
    };
    fetchAnimal();
  }, [id]);

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
  const getStatusColor = (status: string | null | undefined) => {
    if (!status) return 'bg-blue-500 text-white';
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
              {(animal.facts || animal.fun_facts || []).map((fact, index) => <li key={index} className="flex items-start">
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
              {(animal.threats || []).map((threat, index) => <li key={index} className="flex items-start">
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
              {(animal.conservation_efforts || []).map((effort, index) => <li key={index} className="flex items-start">
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
        <button
          onClick={() => navigate(`/quiz/${animal.id}`)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
        >
          Take a Quiz About {animal.name}s
        </button>
      </div>
    </div>;
};
export default AnimalInfo;