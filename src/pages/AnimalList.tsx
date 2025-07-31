import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAnimals } from '../services/apiClient';
import { EyeIcon } from 'lucide-react';
import { toast } from 'sonner';

interface Animal {
  id: string;
  name: string;
  description: string;
  image_url: string;
  conservation_status?: string;
}

const AnimalList: React.FC = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        setIsLoading(true);
        const data = await getAnimals();
        setAnimals(data);
      } catch (error) {
        console.error('Failed to load animals:', error);
        toast.error('Failed to load animals');
      } finally {
        setIsLoading(false);
      }
    };
    fetchAnimals();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Critically Endangered':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Endangered':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Vulnerable':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Near Threatened':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
      <div className="container mx-auto px-4 lg:px-6">
        <h1 className="text-3xl font-bold mb-6 font-['Playfair_Display']">All Animals</h1>
        {animals.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No animals available at the moment. Please check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {animals.map((animal) => (
              <div key={animal.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={animal.image_url}
                    alt={animal.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800';
                    }}
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(animal.conservation_status || 'Least Concern')}`}>
                      {animal.conservation_status || 'Least Concern'}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{animal.name}</h3>
                  <p className="text-gray-600 mb-4 flex-grow line-clamp-3">{animal.description}</p>
                  <Link
                    to={`/animal/${animal.id}`}
                    className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors mt-auto"
                  >
                    <EyeIcon className="mr-2 h-4 w-4" />
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimalList;
