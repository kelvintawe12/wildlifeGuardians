import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Link } from 'react-router-dom';
import {
  UsersIcon,
  FileTextIcon,
  BarChart3Icon,
  SettingsIcon,
  ShieldIcon,
  DatabaseIcon,
  TrendingUpIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  ArrowUpRightIcon,
  UserPlusIcon,
  AwardIcon,
  BookOpenIcon
} from 'lucide-react';

const AdminOverview: React.FC = () => {
  const quickStats = [
    {
      title: 'Total Users',
      value: '2,847',
      change: '+12%',
      changeType: 'positive' as const,
      icon: UsersIcon,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20'
    },
    {
      title: 'Active Quizzes',
      value: '156',
      change: '+8%',
      changeType: 'positive' as const,
      icon: BookOpenIcon,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/20'
    },
    {
      title: 'Badges Earned',
      value: '8,921',
      change: '+23%',
      changeType: 'positive' as const,
      icon: AwardIcon,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20'
    },
    {
      title: 'System Health',
      value: '99.2%',
      change: '+0.1%',
      changeType: 'positive' as const,
      icon: CheckCircleIcon,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20'
    }
  ];

  const adminModules = [
    {
      title: 'User Management',
      description: 'Manage users, roles, and permissions',
      href: '/admin/users',
      icon: UsersIcon,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      features: ['User profiles', 'Role assignment', 'Account status', 'Activity tracking']
    },
    {
      title: 'Quiz Management',
      description: 'Create and manage educational content',
      href: '/admin/quizzes',
      icon: FileTextIcon,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
      features: ['Quiz creation', 'Question bank', 'Difficulty levels', 'Categories']
    },
    {
      title: 'Analytics & Reports',
      description: 'Monitor platform performance',
      href: '/admin/analytics',
      icon: BarChart3Icon,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
      features: ['User analytics', 'Quiz metrics', 'Engagement data', 'Export reports']
    },
    {
      title: 'System Settings',
      description: 'Configure platform preferences',
      href: '/admin/settings',
      icon: SettingsIcon,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/20',
      features: ['General settings', 'Security config', 'Email templates', 'API settings']
    },
    {
      title: 'Security Center',
      description: 'Monitor security and access',
      href: '/admin/security',
      icon: ShieldIcon,
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20',
      features: ['Access logs', 'Failed attempts', 'Security alerts', 'IP restrictions']
    },
    {
      title: 'Database Management',
      description: 'Database operations and backups',
      href: '/admin/database',
      icon: DatabaseIcon,
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/20',
      features: ['Backup & restore', 'Query performance', 'Table management', 'Data export']
    }
  ];

  const recentActivities = [
    {
      action: 'New user registered',
      user: 'john.doe@email.com',
      time: '2 minutes ago',
      type: 'user',
      icon: UserPlusIcon
    },
    {
      action: 'Quiz completed',
      user: 'Wildlife Conservation Basics',
      time: '5 minutes ago',
      type: 'quiz',
      icon: BookOpenIcon
    },
    {
      action: 'Badge earned',
      user: 'Conservation Champion',
      time: '12 minutes ago',
      type: 'badge',
      icon: AwardIcon
    },
    {
      action: 'System backup completed',
      user: 'Automated backup',
      time: '1 hour ago',
      type: 'system',
      icon: DatabaseIcon
    }
  ];

  const systemAlerts = [
    {
      type: 'warning',
      message: 'Database storage is 85% full',
      time: '30 minutes ago',
      priority: 'medium'
    },
    {
      type: 'info',
      message: 'Scheduled maintenance in 2 days',
      time: '2 hours ago',
      priority: 'low'
    },
    {
      type: 'success',
      message: 'Security scan completed successfully',
      time: '4 hours ago',
      priority: 'low'
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Overview</h1>
            <p className="text-gray-400">Comprehensive platform management dashboard</p>
          </div>
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <div className="flex items-center text-green-400 text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              System Online
            </div>
            <div className="text-gray-400 text-sm">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <IconComponent className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className={`flex items-center text-sm ${
                    stat.changeType === 'positive' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    <TrendingUpIcon className="h-4 w-4 mr-1" />
                    {stat.change}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-gray-400 text-sm">{stat.title}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Admin Modules Grid */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-6">Administration Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminModules.map((module, index) => {
              const IconComponent = module.icon;
              return (
                <Link
                  key={index}
                  to={module.href}
                  className={`group bg-slate-800/50 backdrop-blur-xl border ${module.borderColor} rounded-xl p-6 hover:bg-slate-700/50 transition-all duration-300 hover:scale-105`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg ${module.bgColor} group-hover:scale-110 transition-transform`}>
                      <IconComponent className={`h-6 w-6 ${module.color}`} />
                    </div>
                    <ArrowUpRightIcon className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-white">
                    {module.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 group-hover:text-gray-300">
                    {module.description}
                  </p>
                  
                  <div className="space-y-2">
                    {module.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-xs text-gray-500 group-hover:text-gray-400">
                        <div className="w-1 h-1 bg-gray-500 rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Activity & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
              <Link 
                to="/admin/audit" 
                className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center"
              >
                View all
                <ArrowUpRightIcon className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentActivities.map((activity, index) => {
                const IconComponent = activity.icon;
                return (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-slate-700/30">
                    <div className="p-2 bg-slate-600/50 rounded-lg">
                      <IconComponent className="h-4 w-4 text-gray-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate">{activity.action}</p>
                      <p className="text-xs text-gray-400 truncate">{activity.user}</p>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <ClockIcon className="h-3 w-3 mr-1" />
                      {activity.time}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* System Alerts */}
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">System Alerts</h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-400">3 active</span>
              </div>
            </div>
            
            <div className="space-y-4">
              {systemAlerts.map((alert, index) => (
                <div key={index} className={`flex items-start space-x-3 p-3 rounded-lg ${
                  alert.type === 'warning' ? 'bg-yellow-500/10 border border-yellow-500/20' :
                  alert.type === 'success' ? 'bg-green-500/10 border border-green-500/20' :
                  'bg-blue-500/10 border border-blue-500/20'
                }`}>
                  <AlertCircleIcon className={`h-5 w-5 mt-0.5 ${
                    alert.type === 'warning' ? 'text-yellow-400' :
                    alert.type === 'success' ? 'text-green-400' :
                    'text-blue-400'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white">{alert.message}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-gray-400">{alert.time}</p>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        alert.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                        alert.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {alert.priority}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { label: 'Add User', href: '/admin/users', icon: UserPlusIcon },
              { label: 'Create Quiz', href: '/admin/quizzes', icon: BookOpenIcon },
              { label: 'View Analytics', href: '/admin/analytics', icon: BarChart3Icon },
              { label: 'System Settings', href: '/admin/settings', icon: SettingsIcon },
              { label: 'Security Logs', href: '/admin/security', icon: ShieldIcon },
              { label: 'Database', href: '/admin/database', icon: DatabaseIcon }
            ].map((action, index) => {
              const IconComponent = action.icon;
              return (
                <Link
                  key={index}
                  to={action.href}
                  className="flex flex-col items-center p-4 bg-slate-700/30 rounded-lg hover:bg-slate-600/50 transition-colors group"
                >
                  <IconComponent className="h-6 w-6 text-gray-400 group-hover:text-white mb-2" />
                  <span className="text-xs text-gray-400 group-hover:text-white text-center">
                    {action.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminOverview;
