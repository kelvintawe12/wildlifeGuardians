
import React, { useEffect, useState } from 'react';
import { BarChart2Icon, UsersIcon, AwardIcon, FileTextIcon, ActivityIcon } from 'lucide-react';

// Replace with real API calls
const fetchAnalytics = async () => {
  // Simulate API response
  return {
    totalUsers: 1245,
    totalQuizzes: 32,
    totalBadges: 18,
    totalQuizAttempts: 5420,
    activeUsers: 210,
    recentActivity: [
      { type: 'quiz', user: 'Jane Doe', quiz: 'Wildlife Basics', date: '2025-07-21' },
      { type: 'badge', user: 'John Smith', badge: 'Conservation Hero', date: '2025-07-20' },
      { type: 'quiz', user: 'Alice Admin', quiz: 'Endangered Species', date: '2025-07-19' },
    ],
  };
};

const Analytics: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await fetchAnalytics();
      setStats(data);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-6 lg:py-12">
      <div className="w-full max-w-4xl mx-auto px-2 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <BarChart2Icon className="h-7 w-7 text-emerald-700" />
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-['Playfair_Display']">Analytics & Insights</h1>
        </div>
        {loading ? (
          <div className="text-center text-gray-500 py-12">Loading analytics...</div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-5 flex flex-col items-center">
                <UsersIcon className="h-8 w-8 text-emerald-600 mb-2" />
                <div className="text-lg font-semibold">Users</div>
                <div className="text-2xl font-bold text-emerald-700">{stats.totalUsers}</div>
              </div>
              <div className="bg-white rounded-lg shadow p-5 flex flex-col items-center">
                <FileTextIcon className="h-8 w-8 text-blue-600 mb-2" />
                <div className="text-lg font-semibold">Quizzes</div>
                <div className="text-2xl font-bold text-blue-700">{stats.totalQuizzes}</div>
              </div>
              <div className="bg-white rounded-lg shadow p-5 flex flex-col items-center">
                <AwardIcon className="h-8 w-8 text-yellow-600 mb-2" />
                <div className="text-lg font-semibold">Badges</div>
                <div className="text-2xl font-bold text-yellow-700">{stats.totalBadges}</div>
              </div>
              <div className="bg-white rounded-lg shadow p-5 flex flex-col items-center">
                <ActivityIcon className="h-8 w-8 text-pink-600 mb-2" />
                <div className="text-lg font-semibold">Quiz Attempts</div>
                <div className="text-2xl font-bold text-pink-700">{stats.totalQuizAttempts}</div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <div className="text-lg font-semibold mb-4 text-emerald-700">Recent Activity</div>
              <ul className="divide-y divide-gray-100">
                {stats.recentActivity.map((a: any, i: number) => (
                  <li key={i} className="py-3 flex items-center gap-4">
                    {a.type === 'quiz' ? <FileTextIcon className="h-5 w-5 text-blue-500" /> : <AwardIcon className="h-5 w-5 text-yellow-500" />}
                    <span className="font-medium text-gray-800">{a.user}</span>
                    {a.type === 'quiz' ? (
                      <span className="text-sm text-blue-700">completed quiz "{a.quiz}"</span>
                    ) : (
                      <span className="text-sm text-yellow-700">earned badge "{a.badge}"</span>
                    )}
                    <span className="ml-auto text-xs text-gray-400">{a.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Analytics;
