import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import {
  BarChart3Icon,
  TrendingUpIcon,
  TrendingDownIcon,
  UsersIcon,
  BookOpenIcon,
  AwardIcon,
  DownloadIcon,
  RefreshCwIcon,
  EyeIcon,
  ClockIcon,
  TargetIcon
} from 'lucide-react';

interface AnalyticsData {
  userGrowth: { month: string; users: number; active: number }[];
  quizCompletions: { quiz: string; completions: number; avgScore: number }[];
  badgeDistribution: { badge: string; issued: number; percentage: number }[];
  timeMetrics: {
    dailyActiveUsers: number;
    weeklyActiveUsers: number;
    monthlyActiveUsers: number;
    averageSessionTime: number;
  };
}

const Analytics: React.FC = () => {
  const [dateRange, setDateRange] = useState('30d');
  
  const [analyticsData] = useState<AnalyticsData>({
    userGrowth: [
      { month: 'Jul', users: 120, active: 89 },
      { month: 'Aug', users: 180, active: 134 },
      { month: 'Sep', users: 245, active: 187 },
      { month: 'Oct', users: 320, active: 251 },
      { month: 'Nov', users: 410, active: 329 },
      { month: 'Dec', users: 520, active: 412 },
      { month: 'Jan', users: 650, active: 523 }
    ],
    quizCompletions: [
      { quiz: 'African Big Five', completions: 892, avgScore: 78.5 },
      { quiz: 'Conservation Heroes', completions: 654, avgScore: 82.1 },
      { quiz: 'Primate Intelligence', completions: 543, avgScore: 75.3 },
      { quiz: 'Marine Ecosystems', completions: 421, avgScore: 79.8 },
      { quiz: 'Bird Migration', completions: 334, avgScore: 73.2 }
    ],
    badgeDistribution: [
      { badge: 'Wildlife Explorer', issued: 1247, percentage: 85 },
      { badge: 'Conservation Champion', issued: 892, percentage: 61 },
      { badge: 'Quiz Master', issued: 654, percentage: 45 },
      { badge: 'Learning Streak', issued: 543, percentage: 37 },
      { badge: 'Knowledge Guru', issued: 234, percentage: 16 }
    ],
    timeMetrics: {
      dailyActiveUsers: 234,
      weeklyActiveUsers: 892,
      monthlyActiveUsers: 1247,
      averageSessionTime: 18.5
    }
  });

  const kpiCards = [
    {
      title: 'Daily Active Users',
      value: analyticsData.timeMetrics.dailyActiveUsers.toLocaleString(),
      change: '+12.5%',
      changeType: 'increase' as const,
      icon: UsersIcon,
      color: 'emerald'
    },
    {
      title: 'Quiz Completions',
      value: '2,844',
      change: '+18.2%',
      changeType: 'increase' as const,
      icon: BookOpenIcon,
      color: 'blue'
    },
    {
      title: 'Badges Issued',
      value: '3,570',
      change: '+8.7%',
      changeType: 'increase' as const,
      icon: AwardIcon,
      color: 'yellow'
    },
    {
      title: 'Avg Session Time',
      value: `${analyticsData.timeMetrics.averageSessionTime}min`,
      change: '+5.3%',
      changeType: 'increase' as const,
      icon: ClockIcon,
      color: 'purple'
    }
  ];

  const engagementMetrics = [
    { label: 'Daily Active Users', value: analyticsData.timeMetrics.dailyActiveUsers, total: analyticsData.timeMetrics.monthlyActiveUsers, color: 'emerald' },
    { label: 'Weekly Active Users', value: analyticsData.timeMetrics.weeklyActiveUsers, total: analyticsData.timeMetrics.monthlyActiveUsers, color: 'blue' },
    { label: 'Monthly Active Users', value: analyticsData.timeMetrics.monthlyActiveUsers, total: analyticsData.timeMetrics.monthlyActiveUsers, color: 'purple' }
  ];

  const getPercentage = (value: number, total: number) => Math.round((value / total) * 100);

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
            <p className="text-gray-400">Platform performance and user insights</p>
          </div>
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-slate-700/50 border border-slate-600 rounded-lg text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <button className="flex items-center px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors">
              <RefreshCwIcon className="h-4 w-4 mr-2" />
              Refresh
            </button>
            <button className="flex items-center px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
              <DownloadIcon className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiCards.map((kpi, index) => {
            const IconComponent = kpi.icon;
            return (
              <div key={index} className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-${kpi.color}-500/10`}>
                    <IconComponent className={`h-6 w-6 text-${kpi.color}-400`} />
                  </div>
                  <div className={`flex items-center text-sm ${
                    kpi.changeType === 'increase' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {kpi.changeType === 'increase' ? (
                      <TrendingUpIcon className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDownIcon className="h-4 w-4 mr-1" />
                    )}
                    {kpi.change}
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">{kpi.value}</h3>
                  <p className="text-sm font-medium text-gray-400">{kpi.title}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* User Growth Chart */}
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">User Growth</h2>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full mr-2"></div>
                  <span className="text-gray-400">Total Users</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
                  <span className="text-gray-400">Active Users</span>
                </div>
              </div>
            </div>
            <div className="h-64 flex items-end justify-between space-x-2">
              {analyticsData.userGrowth.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="relative w-full flex items-end justify-center space-x-1 mb-2" style={{ height: '200px' }}>
                    <div 
                      className="bg-emerald-400 rounded-t w-3"
                      style={{ height: `${(data.users / 650) * 100}%` }}
                    ></div>
                    <div 
                      className="bg-blue-400 rounded-t w-3"
                      style={{ height: `${(data.active / 650) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-400">{data.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Quizzes */}
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Top Performing Quizzes</h2>
              <button className="text-emerald-400 hover:text-emerald-300 text-sm transition-colors">
                <EyeIcon className="h-4 w-4 inline mr-1" />
                View all
              </button>
            </div>
            <div className="space-y-4">
              {analyticsData.quizCompletions.map((quiz, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-white">{quiz.quiz}</span>
                      <span className="text-sm text-gray-400">{quiz.completions} completions</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex-1 bg-slate-700 rounded-full h-2 mr-3">
                        <div 
                          className="bg-emerald-400 h-2 rounded-full"
                          style={{ width: `${(quiz.completions / 892) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-emerald-400">{quiz.avgScore}% avg</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Engagement Metrics and Badge Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Engagement Metrics */}
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">User Engagement</h2>
            <div className="space-y-6">
              {engagementMetrics.map((metric, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-300">{metric.label}</span>
                    <span className="text-sm text-white">{metric.value.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-1 bg-slate-700 rounded-full h-2 mr-3">
                      <div 
                        className={`bg-${metric.color}-400 h-2 rounded-full`}
                        style={{ width: `${getPercentage(metric.value, metric.total)}%` }}
                      ></div>
                    </div>
                    <span className={`text-xs text-${metric.color}-400`}>
                      {getPercentage(metric.value, metric.total)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Badge Distribution */}
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Badge Distribution</h2>
            <div className="space-y-4">
              {analyticsData.badgeDistribution.map((badge, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center flex-1">
                    <div className="bg-yellow-500/20 p-2 rounded-lg mr-3">
                      <AwardIcon className="h-4 w-4 text-yellow-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-white">{badge.badge}</span>
                        <span className="text-sm text-gray-400">{badge.issued} issued</span>
                      </div>
                      <div className="flex items-center">
                        <div className="flex-1 bg-slate-700 rounded-full h-2 mr-3">
                          <div 
                            className="bg-yellow-400 h-2 rounded-full"
                            style={{ width: `${badge.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-yellow-400">{badge.percentage}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity Summary */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Performance Summary</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-emerald-500/20 p-4 rounded-xl mb-2">
                <TargetIcon className="h-8 w-8 text-emerald-400 mx-auto" />
              </div>
              <h3 className="text-lg font-bold text-white">89.2%</h3>
              <p className="text-sm text-gray-400">Quiz Completion Rate</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-500/20 p-4 rounded-xl mb-2">
                <BarChart3Icon className="h-8 w-8 text-blue-400 mx-auto" />
              </div>
              <h3 className="text-lg font-bold text-white">78.5%</h3>
              <p className="text-sm text-gray-400">Average Quiz Score</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-500/20 p-4 rounded-xl mb-2">
                <ClockIcon className="h-8 w-8 text-purple-400 mx-auto" />
              </div>
              <h3 className="text-lg font-bold text-white">18.5min</h3>
              <p className="text-sm text-gray-400">Avg Session Duration</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-500/20 p-4 rounded-xl mb-2">
                <TrendingUpIcon className="h-8 w-8 text-yellow-400 mx-auto" />
              </div>
              <h3 className="text-lg font-bold text-white">+23%</h3>
              <p className="text-sm text-gray-400">Month-over-Month Growth</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Analytics;
