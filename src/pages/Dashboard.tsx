import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCustomAuth } from '../contexts/CustomAuthContext';
import { 
  getQuizzes, 
  getAnimals, 
  getUserBadges, 
  checkApiHealth
} from '../services/apiClient';
import { 
  BookOpenIcon, 
  AwardIcon, 
  ChevronRightIcon, 
  TrendingUpIcon,
  LeafIcon,
  StarIcon,
  PlayIcon,
  EyeIcon,
  ArrowRightIcon,
  WifiOffIcon
} from 'lucide-react';
import { toast } from 'sonner';

interface Quiz {
  id: string;
  title: string;
  description: string;
  image_url: string;
  difficulty?: string;
  questions?: any[];
}

interface Animal {
  id: string;
  name: string;
  description: string;
  image_url: string;
  conservation_status?: string;
  habitat?: string;
}

interface Badge {
  id: string;
  type: string;
  awarded_at: string;
}

interface DashboardStats {
  totalQuizzes: number;
  completedQuizzes: number;
  totalBadges: number;
  averageScore: number;
}

const Dashboard: React.FC = () => {
  const { user } = useCustomAuth();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [featuredAnimals, setFeaturedAnimals] = useState<Animal[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalQuizzes: 0,
    completedQuizzes: 0,
    totalBadges: 0,
    averageScore: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);

  const conservationTips = [
    {
      title: 'Reduce Plastic Usage',
      description: 'Use reusable bags, bottles, and containers to protect marine life.',
      icon: '🌊',
      impact: 'High'
    },
    {
      title: 'Support Eco-Tourism',
      description: 'Choose sustainable tourism that supports local conservation efforts.',
      icon: '🦋',
      impact: 'Medium'
    },
    {
      title: 'Plant Native Species',
      description: 'Create habitats for local wildlife by planting native plants.',
      icon: '🌱',
      impact: 'High'
    }
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setApiError(null);
        
        // Check API health first
        try {
          await checkApiHealth();
        } catch (error) {
          console.error('API health check failed:', error);
          setApiError('Backend API is not available. Please check if the server is running.');
          toast.error('Cannot connect to backend server');
          setIsLoading(false);
          return;
        }
        
        // Load all data from API
        const [quizzesData, animalsData, badgesData] = await Promise.allSettled([
          getQuizzes(),
          getAnimals(),
          user ? getUserBadges() : Promise.resolve([])
        ]);
        
        // Process quizzes
        if (quizzesData.status === 'fulfilled') {
          setQuizzes(quizzesData.value);
        } else {
          console.error('Failed to load quizzes:', quizzesData.reason);
          setQuizzes([]);
          toast.error('Failed to load quizzes');
        }
        
        // Process animals
        if (animalsData.status === 'fulfilled') {
          setAnimals(animalsData.value);
          setFeaturedAnimals(animalsData.value.slice(0, 3));
        } else {
          console.error('Failed to load animals:', animalsData.reason);
          setAnimals([]);
          setFeaturedAnimals([]);
          toast.error('Failed to load animals');
        }
        
        // Process badges
        if (badgesData.status === 'fulfilled') {
          setBadges(badgesData.value);
        } else {
          console.error('Failed to load badges:', badgesData.reason);
          setBadges([]);
          if (user) {
            toast.error('Failed to load badges');
          }
        }
        
        // Calculate stats
        const quizCount = quizzesData.status === 'fulfilled' ? quizzesData.value.length : 0;
        const badgeCount = badgesData.status === 'fulfilled' ? badgesData.value.length : 0;
        
        setStats({
          totalQuizzes: quizCount,
          completedQuizzes: 0, // TODO: Get from quiz results API
          totalBadges: badgeCount,
          averageScore: 0 // TODO: Calculate from quiz results
        });
        
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        setApiError('Failed to load dashboard data');
        toast.error('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [user]);

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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your wildlife journey...</p>
        </div>
      </div>
    );
  }

  if (apiError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <WifiOffIcon className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Connection Error</h2>
          <p className="text-gray-600 mb-4">{apiError}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
            
            <div className="relative z-10">
              <div className="flex items-center space-x-6 mb-6">
                <div className="relative">
                  <img 
                    src="/wildlife-guardians-compact.svg" 
                    alt="Wildlife Guardians Logo" 
                    className="w-20 h-20 drop-shadow-2xl"
                  />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center animate-pulse">
                    <StarIcon className="w-3 h-3 text-amber-800" />
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl font-bold font-['Playfair_Display'] mb-2">
                    Welcome back, {user?.name || 'Guardian'}!
                  </h1>
                  <p className="text-white/90 text-lg mb-2">
                    Ready to continue your wildlife conservation journey?
                  </p>
                  <p className="text-white/80 text-sm font-medium">
                    🌱 Learn • 🛡️ Conserve • ✨ Inspire
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <div className="flex items-center space-x-2">
                    <BookOpenIcon className="h-6 w-6 text-white" />
                    <span className="text-white/90">Quizzes</span>
                  </div>
                  <div className="text-2xl font-bold text-white mt-1">{stats.totalQuizzes}</div>
                </div>
                
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <div className="flex items-center space-x-2">
                    <AwardIcon className="h-6 w-6 text-white" />
                    <span className="text-white/90">Badges</span>
                  </div>
                  <div className="text-2xl font-bold text-white mt-1">{stats.totalBadges}</div>
                </div>
                
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <div className="flex items-center space-x-2">
                    <LeafIcon className="h-6 w-6 text-white" />
                    <span className="text-white/90">Animals</span>
                  </div>
                  <div className="text-2xl font-bold text-white mt-1">{animals.length}</div>
                </div>
                
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <div className="flex items-center space-x-2">
                    <TrendingUpIcon className="h-6 w-6 text-white" />
                    <span className="text-white/90">Progress</span>
                  </div>
                  <div className="text-2xl font-bold text-white mt-1">85%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Quizzes Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 font-['Playfair_Display']">Featured Quizzes</h2>
              <p className="text-gray-600 mt-1">Test your knowledge and earn badges</p>
            </div>
            <Link to="/quiz" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium group">
              View All
              <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.length > 0 ? (
              quizzes.slice(0, 3).map((quiz) => (
                <div key={quiz.id} className="card group cursor-pointer overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={quiz.image_url} 
                      alt={quiz.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800';
                      }}
                    />
                    <div className="absolute top-4 right-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(quiz.difficulty || 'Medium')}`}>
                        {quiz.difficulty || 'Medium'}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-semibold text-lg mb-1">{quiz.title}</h3>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-600 mb-4 line-clamp-2">{quiz.description}</p>
                    <Link 
                      to={`/quiz/${quiz.id}`}
                      className="inline-flex items-center justify-center w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
                    >
                      <PlayIcon className="mr-2 h-4 w-4" />
                      Start Quiz
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <BookOpenIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Quizzes Available</h3>
                <p className="text-gray-600">Check back later for new wildlife quizzes!</p>
              </div>
            )}
          </div>
        </div>

        {/* Featured Animals Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 font-['Playfair_Display']">Animal Spotlight</h2>
              <p className="text-gray-600 mt-1">Discover fascinating wildlife species</p>
            </div>
            <Link to="/animals" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium group">
              Explore All
              <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredAnimals.length > 0 ? (
              featuredAnimals.map((animal) => (
                <div key={animal.id} className="card group cursor-pointer overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={animal.image_url} 
                      alt={animal.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800';
                      }}
                    />
                    <div className="absolute top-4 right-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(animal.conservation_status || 'Least Concern')}`}>
                        {animal.conservation_status || 'Least Concern'}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-semibold text-lg mb-1">{animal.name}</h3>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-600 mb-3 line-clamp-2">{animal.description}</p>
                    {animal.habitat && (
                      <p className="text-sm text-gray-500 mb-4">
                        <span className="font-medium">Habitat:</span> {animal.habitat}
                      </p>
                    )}
                    <Link 
                      to={`/animal/${animal.id}`}
                      className="inline-flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
                    >
                      <EyeIcon className="mr-2 h-4 w-4" />
                      Learn More
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <LeafIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Animals Available</h3>
                <p className="text-gray-600">Check back later for amazing wildlife content!</p>
              </div>
            )}
          </div>
        </div>

        {/* Conservation Tips Section */}
        <div className="mb-8">
          <div className="card">
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <LeafIcon className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 font-['Playfair_Display']">Conservation Tips</h2>
                  <p className="text-gray-600 mt-1">Simple actions that make a big difference</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {conservationTips.map((tip, index) => (
                  <div key={index} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                    <div className="text-3xl mb-3">{tip.icon}</div>
                    <h3 className="font-semibold text-gray-900 mb-2">{tip.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{tip.description}</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      tip.impact === 'High' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {tip.impact} Impact
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link to="/quiz/1" className="card p-6 text-center group hover:shadow-lg transition-all duration-300">
            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <PlayIcon className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Take a Quiz</h3>
            <p className="text-gray-600">Test your wildlife knowledge and earn badges</p>
            <div className="mt-4 flex items-center justify-center text-emerald-600 font-medium">
              Start Learning
              <ChevronRightIcon className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
          
          <Link to="/animals" className="card p-6 text-center group hover:shadow-lg transition-all duration-300">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <EyeIcon className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Explore Animals</h3>
            <p className="text-gray-600">Discover amazing wildlife from around the world</p>
            <div className="mt-4 flex items-center justify-center text-blue-600 font-medium">
              Explore Now
              <ChevronRightIcon className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
          
          <Link to="/badges" className="card p-6 text-center group hover:shadow-lg transition-all duration-300">
            <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <StarIcon className="h-8 w-8 text-amber-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">View Achievements</h3>
            <p className="text-gray-600">Track your progress and collected badges</p>
            <div className="mt-4 flex items-center justify-center text-amber-600 font-medium">
              View Badges {badges.length > 0 && `(${badges.length})`}
              <ChevronRightIcon className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;