import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAdmin } from '../../contexts/AdminContext';
import {
  LayoutDashboardIcon,
  UsersIcon,
  BookOpenIcon,
  AwardIcon,
  BarChart3Icon,
  SettingsIcon,
  LogOutIcon,
  MenuIcon,
  XIcon,
  TreePineIcon,
  ShieldCheckIcon,
  UserIcon,
  BellIcon,
  SearchIcon,
  HelpCircleIcon,
  DatabaseIcon,
  FileTextIcon,
  ActivityIcon,
  TrendingUpIcon
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { adminUser, logout } = useAdmin();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { 
      name: 'Overview', 
      href: '/admin', 
      icon: LayoutDashboardIcon,
      description: 'Admin Overview'
    },
    { 
      name: 'Dashboard', 
      href: '/admin/dashboard', 
      icon: BarChart3Icon,
      description: 'Analytics & Data'
    },
    { 
      name: 'Users', 
      href: '/admin/users', 
      icon: UsersIcon,
      description: 'User Management'
    },
    { 
      name: 'Quizzes', 
      href: '/admin/quizzes', 
      icon: BookOpenIcon,
      description: 'Quiz Management'
    },
    { 
      name: 'Badges', 
      href: '/admin/badges', 
      icon: AwardIcon,
      description: 'Badge System'
    },
    { 
      name: 'Analytics', 
      href: '/admin/analytics', 
      icon: BarChart3Icon,
      description: 'Performance Metrics'
    },
    { 
      name: 'Content', 
      href: '/admin/content', 
      icon: FileTextIcon,
      description: 'Content Management'
    },
    { 
      name: 'Audit Logs', 
      href: '/admin/audit', 
      icon: ActivityIcon,
      description: 'System Audit Trail'
    },
    { 
      name: 'Database', 
      href: '/admin/database', 
      icon: DatabaseIcon,
      description: 'Database Management'
    },
    { 
      name: 'Settings', 
      href: '/admin/settings', 
      icon: SettingsIcon,
      description: 'System Settings'
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const isActive = (href: string) => location.pathname === href;

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'super_admin': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'admin': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'moderator': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden bg-black/50 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-800/90 backdrop-blur-xl border-r border-slate-700/50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
            <div className="flex items-center">
              <div className="bg-emerald-500 p-2 rounded-xl mr-3">
                <TreePineIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Wildlife Guardians</h1>
                <p className="text-xs text-emerald-400">Admin Portal</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white transition-colors"
            >
              <XIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Admin Info */}
          <div className="p-6 border-b border-slate-700/50">
            <div className="flex items-center mb-3">
              <div className="bg-emerald-500/20 p-2 rounded-lg mr-3">
                <UserIcon className="h-5 w-5 text-emerald-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {adminUser?.name}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {adminUser?.email}
                </p>
              </div>
            </div>
            <div className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-md border ${getRoleColor(adminUser?.role || '')}`}>
              <ShieldCheckIcon className="h-3 w-3 mr-1" />
              {adminUser?.role?.replace('_', ' ').toUpperCase()}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const IconComponent = item.icon;
              const active = isActive(item.href);
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                    active
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'text-gray-300 hover:bg-slate-700/50 hover:text-white'
                  }`}
                >
                  <IconComponent className={`mr-3 h-5 w-5 transition-colors ${
                    active ? 'text-emerald-400' : 'text-gray-400 group-hover:text-white'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="truncate">{item.name}</p>
                    <p className={`text-xs truncate ${
                      active ? 'text-emerald-300' : 'text-gray-500 group-hover:text-gray-400'
                    }`}>
                      {item.description}
                    </p>
                  </div>
                  {active && (
                    <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer Actions */}
          <div className="p-4 border-t border-slate-700/50 space-y-2">
            <button className="w-full flex items-center px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors">
              <HelpCircleIcon className="h-4 w-4 mr-2" />
              Help & Support
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <LogOutIcon className="h-4 w-4 mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Top header */}
        <header className="bg-slate-800/50 backdrop-blur-xl border-b border-slate-700/50 sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 py-4 sm:px-6">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-400 hover:text-white transition-colors mr-4"
              >
                <MenuIcon className="h-6 w-6" />
              </button>
              
              <div className="flex-1 max-w-lg">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search admin panel..."
                    className="block w-full pl-10 pr-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                <BellIcon className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Quick Stats */}
              <div className="hidden sm:flex items-center space-x-4 text-sm">
                <div className="flex items-center text-emerald-400">
                  <TrendingUpIcon className="h-4 w-4 mr-1" />
                  <span>System: Online</span>
                </div>
                <div className="text-gray-400">
                  {new Date().toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
