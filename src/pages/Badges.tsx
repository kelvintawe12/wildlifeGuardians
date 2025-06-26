import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getUserBadges, getLeaderboard } from '../services/supabaseClient';
import { AwardIcon, TrophyIcon, UserIcon } from 'lucide-react';
import { toast } from 'sonner';
interface Badge {
  id: string;
  type: string;
  awarded_at: string;
}
interface LeaderboardUser {
  id: string;
  name: string;
  avatar_url: string | null;
  badges: {
    count: number;
  };
}
const Badges: React.FC = () => {
  const {
    user
  } = useAuth();
  const [badges, setBadges] = useState<Badge[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        if (user) {
          // Fetch user badges and leaderboard in parallel
          const [badgesData, leaderboardData] = await Promise.all([getUserBadges(user.id), getLeaderboard()]);
          setBadges(badgesData);
          setLeaderboard(leaderboardData);
        }
      } catch (error) {
        console.error('Error fetching badges data:', error);
        toast.error('Failed to load badges');
        // For demo purposes, use sample data
        setBadges(sampleBadges);
        setLeaderboard(sampleLeaderboard);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [user]);
  // Sample badge data for demonstration
  const sampleBadges: Badge[] = [{
    id: '1',
    type: 'Mountain Gorilla Expert',
    awarded_at: '2023-05-15T10:30:00Z'
  }, {
    id: '2',
    type: 'Wildlife Explorer',
    awarded_at: '2023-05-10T14:20:00Z'
  }, {
    id: '3',
    type: 'Conservation Champion',
    awarded_at: '2023-05-05T09:15:00Z'
  }];
  // Sample leaderboard data
  const sampleLeaderboard: LeaderboardUser[] = [{
    id: '1',
    name: 'Jane Doe',
    avatar_url: null,
    badges: {
      count: 8
    }
  }, {
    id: '2',
    name: 'John Smith',
    avatar_url: null,
    badges: {
      count: 7
    }
  }, {
    id: '3',
    name: 'Alex Johnson',
    avatar_url: null,
    badges: {
      count: 5
    }
  }, {
    id: '4',
    name: 'Sam Wilson',
    avatar_url: null,
    badges: {
      count: 4
    }
  }, {
    id: '5',
    name: 'Taylor Brown',
    avatar_url: null,
    badges: {
      count: 3
    }
  }];
  // Badge colors for variety
  const badgeColors = [{
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    icon: 'text-yellow-500'
  }, {
    bg: 'bg-green-100',
    text: 'text-green-800',
    icon: 'text-green-500'
  }, {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    icon: 'text-blue-500'
  }, {
    bg: 'bg-purple-100',
    text: 'text-purple-800',
    icon: 'text-purple-500'
  }, {
    bg: 'bg-red-100',
    text: 'text-red-800',
    icon: 'text-red-500'
  }];
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  return <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <AwardIcon className="h-6 w-6 mr-2 text-green-600" />
        Your Badges
      </h1>
      {isLoading ? <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div> : <div className="flex flex-col md:flex-row gap-8">
          {/* User badges section */}
          <div className="w-full md:w-2/3">
            {(badges.length > 0 ? badges : sampleBadges).length > 0 ? <div className="bg-white rounded-lg shadow-md p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(badges.length > 0 ? badges : sampleBadges).map((badge, index) => {
              const colorScheme = badgeColors[index % badgeColors.length];
              return <div key={badge.id} className={`${colorScheme.bg} ${colorScheme.text} rounded-lg p-4 flex items-start`}>
                          <div className="mr-4">
                            <AwardIcon className={`h-8 w-8 ${colorScheme.icon}`} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">
                              {badge.type}
                            </h3>
                            <p className="text-sm opacity-80">
                              Earned on {formatDate(badge.awarded_at)}
                            </p>
                          </div>
                        </div>;
            })}
                </div>
                <div className="mt-6 text-center">
                  <p className="text-gray-600">
                    Complete more quizzes to earn additional badges!
                  </p>
                </div>
              </div> : <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <AwardIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No badges yet
                </h3>
                <p className="text-gray-500 mb-6">
                  Complete quizzes with high scores to earn badges and show off
                  your wildlife knowledge!
                </p>
                <button onClick={() => window.location.href = '/'} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
                  Take a Quiz
                </button>
              </div>}
          </div>
          {/* Leaderboard section */}
          <div className="w-full md:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <TrophyIcon className="h-5 w-5 mr-2 text-yellow-500" />
                Leaderboard
              </h2>
              <div className="space-y-4">
                {(leaderboard.length > 0 ? leaderboard : sampleLeaderboard).map((leader, index) => <div key={leader.id} className={`flex items-center p-3 rounded-md ${leader.id === user?.id ? 'bg-green-50 border border-green-100' : ''}`}>
                      <div className="flex-shrink-0 mr-3">
                        <div className="relative">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            {leader.avatar_url ? <img src={leader.avatar_url} alt={leader.name} className="h-10 w-10 rounded-full" /> : <UserIcon className="h-5 w-5 text-gray-500" />}
                          </div>
                          <div className="absolute -top-1 -left-1 h-5 w-5 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center text-xs font-medium">
                            {index + 1}
                          </div>
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {leader.name}
                          {leader.id === user?.id && <span className="ml-2 text-xs text-green-600">
                              (You)
                            </span>}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <AwardIcon className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="text-sm font-medium">
                          {leader.badges.count}
                        </span>
                      </div>
                    </div>)}
              </div>
            </div>
          </div>
        </div>}
    </div>;
};
export default Badges;