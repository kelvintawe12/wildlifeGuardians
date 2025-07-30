import React, { useEffect, useState } from 'react';
import { HomeIcon, UsersIcon, BarChart2Icon, FileTextIcon, ClockIcon } from 'lucide-react';
import adminAPI from '../../services/adminAPI';

interface OverviewStats {
  totalUsers: number;
  activeUsers: number;
  totalQuizzes: number;
  totalBadges: number;
  recentActivities: Array<{
    id: number;
    type: string;
    description: string;
    date: string;
  }>;
}

const AdminOverview: React.FC = () => {
  const [stats, setStats] = useState<OverviewStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOverview = async () => {
      setLoading(true);
      setError('');
      try {
        // Use existing API calls to aggregate overview data
        const [users, quizzes, badges] = await Promise.all([
          adminAPI.getUsers({ search: '' }),
          adminAPI.getQuizzes(),
          adminAPI.getBadges(),
        ]);
        // Simulate recent activities
        const recentActivities = [
          { id: 1, type: 'quiz', description: 'User Jane completed "Wildlife Basics" quiz', date: new Date().toISOString() },
          { id: 2, type: 'badge', description: 'User John earned "Conservation Hero" badge', date: new Date().toISOString() },
          { id: 3, type: 'login', description: 'User Alice logged in', date: new Date().toISOString() },
        ];
        setStats({
          totalUsers: users.length,
          activeUsers: Math.floor(users.length * 0.2), // example active users count
          totalQuizzes: quizzes.length,
          totalBadges: badges.length,
          recentActivities,
        });
      } catch (err) {
        setError('Failed to load overview data.');
      }
      setLoading(false);
    };
    fetchOverview();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-6 lg:py-12">
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="mb-8 flex items-center gap-3">
          <HomeIcon className="h-8 w-8 text-emerald-700" />
          <h1 className="text-3xl font-bold text-gray-900 font-['Playfair_Display']">Admin Overview</h1>
        </div>
        {loading ? (
          <div className="text-center text-gray-500 py-12">Loading overview data...</div>
        ) : error ? (
          <div className="text-center text-red-600 py-12">{error}</div>
        ) : stats ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
              <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
                <UsersIcon className="h-10 w-10 text-emerald-600 mb-3" />
                <div className="text-lg font-semibold text-gray-700">Total Users</div>
                <div className="text-3xl font-bold text-emerald-700">{stats.totalUsers}</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
                <UsersIcon className="h-10 w-10 text-blue-600 mb-3" />
                <div className="text-lg font-semibold text-gray-700">Active Users</div>
                <div className="text-3xl font-bold text-blue-700">{stats.activeUsers}</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
                <BarChart2Icon className="h-10 w-10 text-yellow-600 mb-3" />
                <div className="text-lg font-semibold text-gray-700">Total Quizzes</div>
                <div className="text-3xl font-bold text-yellow-700">{stats.totalQuizzes}</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
                <FileTextIcon className="h-10 w-10 text-pink-600 mb-3" />
                <div className="text-lg font-semibold text-gray-700">Total Badges</div>
                <div className="text-3xl font-bold text-pink-700">{stats.totalBadges}</div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <ClockIcon className="h-6 w-6 text-emerald-700" />
                Recent Activities
              </h2>
              {stats.recentActivities.length === 0 ? (
                <p className="text-gray-600">No recent activities found.</p>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {stats.recentActivities.map(activity => (
                    <li key={activity.id} className="py-3 flex justify-between items-center">
                      <span className="text-gray-700">{activity.description}</span>
                      <span className="text-sm text-gray-400">{new Date(activity.date).toLocaleString()}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default AdminOverview;
