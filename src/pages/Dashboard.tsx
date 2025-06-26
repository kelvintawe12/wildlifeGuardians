import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getQuizzes, getAnimals, getUserBadges } from '../services/supabaseClient';
import { BookOpenIcon, AwardIcon, ChevronRightIcon } from 'lucide-react';
import { toast } from 'sonner';
import SearchBar from '../components/SearchBar';
import ConservationTips from '../components/ConservationTips';
import EducationalContent from '../components/EducationalContent';
import { saveQuizzesToLocalStorage, saveAnimalsToLocalStorage } from '../services/offlineStorage';
interface Quiz {
  id: string;
  title: string;
  description: string;
  image_url: string;
}
interface Animal {
  id: string;
  name: string;
  description: string;
  image_url: string;
}
interface Badge {
  id: string;
  type: string;
  awarded_at: string;
}
const Dashboard: React.FC = () => {
  const {
    user
  } = useAuth();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  // Filtered data based on search
  const filteredQuizzes = quizzes.length > 0 ? quizzes.filter(quiz => quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) || quiz.description.toLowerCase().includes(searchQuery.toLowerCase())) : sampleQuizzes.filter(quiz => quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) || quiz.description.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredAnimals = animals.length > 0 ? animals.filter(animal => animal.name.toLowerCase().includes(searchQuery.toLowerCase()) || animal.description.toLowerCase().includes(searchQuery.toLowerCase())) : sampleAnimals.filter(animal => animal.name.toLowerCase().includes(searchQuery.toLowerCase()) || animal.description.toLowerCase().includes(searchQuery.toLowerCase()));
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Fetch quizzes, animals, and user badges in parallel
        const [quizzesData, animalsData, badgesData] = await Promise.all([getQuizzes(), getAnimals(), user ? getUserBadges(user.id) : []]);
        setQuizzes(quizzesData);
        setAnimals(animalsData);
        setBadges(badgesData);
        // Save data for offline use
        saveQuizzesToLocalStorage(quizzesData);
        saveAnimalsToLocalStorage(animalsData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [user]);
  // Sample educational content
  const educationalContent = {
    title: 'Conservation Resources',
    items: [{
      title: 'Wildlife Conservation Basics',
      description: 'Learn the fundamentals of wildlife conservation and why it matters for our planet.',
      imageUrl: 'https://images.unsplash.com/photo-1541848156497-67cadcfbc7de?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      link: '#conservation-basics'
    }, {
      title: 'Habitat Protection',
      description: 'Discover why protecting natural habitats is crucial for wildlife survival.',
      imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      link: '#habitat-protection'
    }]
  };
  // For demonstration purposes, let's create some sample data
  const sampleQuizzes: Quiz[] = [{
    id: '1',
    title: 'Mountain Gorillas',
    description: "Test your knowledge about Rwanda's endangered mountain gorillas",
    image_url: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  }, {
    id: '2',
    title: 'African Elephants',
    description: 'Learn about the gentle giants of the savanna',
    image_url: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  }, {
    id: '3',
    title: 'Black Rhinos',
    description: 'Discover facts about the critically endangered black rhino',
    image_url: 'https://images.unsplash.com/photo-1589652717521-10c0d092dea9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  }];
  const sampleAnimals: Animal[] = [{
    id: '1',
    name: 'Mountain Gorilla',
    description: 'The mountain gorilla is one of the most endangered great apes',
    image_url: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  }, {
    id: '2',
    name: 'African Elephant',
    description: 'The largest land mammal on Earth, known for their intelligence',
    image_url: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  }, {
    id: '3',
    name: 'Black Rhino',
    description: 'Critically endangered due to poaching for their horns',
    image_url: 'https://images.unsplash.com/photo-1589652717521-10c0d092dea9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  }];
  return <div className="max-w-6xl mx-auto">
      {/* Welcome Section */}
      <section className="mb-10">
        <div className="bg-green-600 text-white rounded-lg p-6 shadow-md">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Welcome, {user?.user_metadata?.name || 'Wildlife Guardian'}!
          </h1>
          <p className="text-green-100">
            Explore, learn, and earn badges as you discover the amazing wildlife
            of Africa.
          </p>
        </div>
      </section>
      {/* Search Section */}
      <section className="mb-8">
        <SearchBar onSearch={setSearchQuery} placeholder="Search for animals or quizzes..." />
      </section>
      {isLoading ? <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div> : <>
          {/* Quizzes Section */}
          <section className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <BookOpenIcon className="h-5 w-5 mr-2 text-green-600" />
                Available Quizzes
              </h2>
            </div>
            {filteredQuizzes.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredQuizzes.map(quiz => <Link key={quiz.id} to={`/quiz/${quiz.id}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="h-40 overflow-hidden">
                      <img src={quiz.image_url} alt={quiz.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-1">
                        {quiz.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {quiz.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-green-600 text-sm font-medium">
                          Take Quiz
                        </span>
                        <ChevronRightIcon className="h-5 w-5 text-green-600" />
                      </div>
                    </div>
                  </Link>)}
              </div> : <div className="bg-gray-50 rounded-lg p-6 text-center">
                <p className="text-gray-600">
                  No quizzes found matching your search criteria.
                </p>
              </div>}
          </section>
          {/* Animals Section */}
          <section className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Discover Wildlife
              </h2>
            </div>
            {filteredAnimals.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAnimals.map(animal => <Link key={animal.id} to={`/animal/${animal.id}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="h-40 overflow-hidden">
                      <img src={animal.image_url} alt={animal.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-1">
                        {animal.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {animal.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-green-600 text-sm font-medium">
                          Learn More
                        </span>
                        <ChevronRightIcon className="h-5 w-5 text-green-600" />
                      </div>
                    </div>
                  </Link>)}
              </div> : <div className="bg-gray-50 rounded-lg p-6 text-center">
                <p className="text-gray-600">
                  No animals found matching your search criteria.
                </p>
              </div>}
          </section>
          {/* Conservation Tips Section */}
          {!searchQuery && <section className="mb-10">
              <ConservationTips />
            </section>}
          {/* Educational Content Section */}
          {!searchQuery && <section className="mb-10">
              <EducationalContent title={educationalContent.title} items={educationalContent.items} />
            </section>}
          {/* Your Badges Section */}
          <section className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <AwardIcon className="h-5 w-5 mr-2 text-green-600" />
                Your Badges
              </h2>
              <Link to="/badges" className="text-green-600 hover:text-green-700 text-sm font-medium">
                View All
              </Link>
            </div>
            {badges.length > 0 ? <div className="flex flex-wrap gap-4">
                {badges.map(badge => <div key={badge.id} className="flex flex-col items-center">
                    <div className="bg-yellow-100 p-3 rounded-full">
                      <AwardIcon className="h-8 w-8 text-yellow-500" />
                    </div>
                    <span className="mt-2 text-sm font-medium">
                      {badge.type}
                    </span>
                  </div>)}
              </div> : <div className="bg-gray-50 rounded-lg p-6 text-center">
                <AwardIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-700 mb-1">
                  No badges yet
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  Complete quizzes to earn your first badge!
                </p>
                <Link to={`/quiz/${sampleQuizzes[0].id}`} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
                  Start a Quiz
                </Link>
              </div>}
          </section>
        </>}
    </div>;
};
export default Dashboard;