import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCustomAuth } from '././../src/contexts/CustomAuthContext';
import { 
  MenuIcon, 
  XIcon, 
  UserIcon, 
  AwardIcon, 
  BookOpenIcon, 
  HomeIcon, 
  LogOutIcon, 
  SettingsIcon,
  TreePineIcon,
  BellIcon,
  TrendingUpIcon
} from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, signOut } = useCustomAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      type: 'achievement',
      title: 'New Badge Earned!',
      message: 'You earned the "Wildlife Enthusiast" badge',
      time: '2 minutes ago',
      read: false,
      icon: AwardIcon,
      color: 'text-amber-600'
    },
    {
      id: 2,
      type: 'quiz',
      title: 'New Quiz Available',
      message: 'Test your knowledge on Arctic Animals',
      time: '1 hour ago',
      read: false,
      icon: BookOpenIcon,
      color: 'text-blue-600'
    },
    {
      id: 3,
      type: 'conservation',
      title: 'Conservation Update',
      message: 'Your support helped protect 50 acres of rainforest',
      time: '3 hours ago',
      read: true,
      icon: TreePineIcon,
      color: 'text-green-600'
    },
    {
      id: 4,
      type: 'progress',
      title: 'Learning Milestone',
      message: 'You have completed 10 quizzes this week!',
      time: '1 day ago',
      read: true,
      icon: TrendingUpIcon,
      color: 'text-purple-600'
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.notifications-dropdown') && !target.closest('.notifications-button')) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/login';
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: '/', label: 'Dashboard', icon: HomeIcon },
    { path: '/badges', label: 'Badges', icon: AwardIcon },
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-200' 
        : 'bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 shadow-md'
    }`}>
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group transition-transform duration-200 hover:scale-105"
          >
            <div className="relative">
              <div className={`absolute inset-0 rounded-full blur-md group-hover:blur-lg transition-all duration-300 ${
                isScrolled ? 'bg-emerald-200/50' : 'bg-white/20'
              }`}></div>
              <div className="relative">
                <img 
                  src="/wildlife-guardians-compact.svg" 
                  alt="Wildlife Guardians Logo" 
                  className="w-12 h-12 drop-shadow-lg group-hover:drop-shadow-xl transition-all duration-300"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-bold font-['Playfair_Display'] ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}>
                Wildlife Guardians
              </span>
              <span className={`text-xs hidden sm:block ${
                isScrolled ? 'text-gray-600' : 'text-white/70'
              }`}>
                Learn • Conserve • Inspire
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 group ${
                  isActive(path)
                    ? isScrolled
                      ? 'bg-emerald-100 text-emerald-700 shadow-md'
                      : 'bg-white/20 text-white shadow-md'
                    : isScrolled
                      ? 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{label}</span>
                {isActive(path) && (
                  <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full ${
                    isScrolled ? 'bg-emerald-600' : 'bg-white'
                  }`}></div>
                )}
              </Link>
            ))}

            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className={`notifications-button relative p-2 rounded-lg transition-all duration-200 ${
                  isScrolled
                    ? 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                <BellIcon className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-bold">{unreadCount}</span>
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {isNotificationsOpen && (
                <div className="notifications-dropdown absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50">
                  <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                      {unreadCount > 0 && (
                        <span className="text-sm text-gray-500">{unreadCount} unread</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => {
                        const IconComponent = notification.icon;
                        return (
                          <div
                            key={notification.id}
                            className={`px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                              !notification.read ? 'bg-blue-50' : ''
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              <div className={`p-2 rounded-lg ${!notification.read ? 'bg-blue-100' : 'bg-gray-100'}`}>
                                <IconComponent className={`h-4 w-4 ${notification.color}`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                                  {notification.title}
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                  {notification.time}
                                </p>
                              </div>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                              )}
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="px-4 py-8 text-center">
                        <BellIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">No notifications yet</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                    <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative group">
              <button className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 border ${
                isScrolled
                  ? 'bg-gray-50 hover:bg-gray-100 border-gray-200'
                  : 'bg-white/10 hover:bg-white/20 border-white/20'
              }`}>
                <div className="relative">
                  {user?.profile_picture ? (
                    <img 
                      src={user.profile_picture} 
                      alt="Profile" 
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      isScrolled 
                        ? 'bg-gradient-to-br from-emerald-400 to-emerald-600' 
                        : 'bg-gradient-to-br from-white/20 to-white/10'
                    }`}>
                      <UserIcon className={`h-5 w-5 ${isScrolled ? 'text-white' : 'text-white'}`} />
                    </div>
                  )}
                  <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                <div className="text-left">
                  <div className={`font-medium text-sm ${
                    isScrolled ? 'text-gray-900' : 'text-white'
                  }`}>
                    {user?.name || 'Guardian'}
                  </div>
                  <div className={`text-xs ${
                    isScrolled ? 'text-gray-500' : 'text-white/70'
                  }`}>
                    Guardian
                  </div>
                </div>
              </button>

              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="text-sm font-medium text-gray-900">
                    {user?.name || 'Guardian'}
                  </div>
                  <div className="text-sm text-gray-500">
                    {user?.email}
                  </div>
                </div>

                <Link
                  to="/settings"
                  className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                >
                  <SettingsIcon className="h-4 w-4 mr-3 text-gray-400" />
                  Settings
                </Link>

                <button
                  onClick={handleSignOut}
                  className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                >
                  <LogOutIcon className="h-4 w-4 mr-3" />
                  Sign out
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors duration-200 ${
              isScrolled
                ? 'bg-gray-100 hover:bg-gray-200'
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            {isMenuOpen ? (
              <XIcon className={`h-6 w-6 ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
            ) : (
              <MenuIcon className={`h-6 w-6 ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 animate-slide-up">
            <div className="space-y-2">
              {navLinks.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive(path)
                      ? 'bg-white/20 text-white'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{label}</span>
                </Link>
              ))}

              <div className="border-t border-white/20 pt-2 mt-2">
                <Link
                  to="/settings"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  <SettingsIcon className="h-5 w-5" />
                  <span className="font-medium">Settings</span>
                </Link>

                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleSignOut();
                  }}
                  className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-red-300 hover:text-red-200 hover:bg-red-900/20 transition-all duration-200"
                >
                  <LogOutIcon className="h-5 w-5" />
                  <span className="font-medium">Sign out</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
