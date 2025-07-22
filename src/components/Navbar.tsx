import React, { useState, useEffect, useRef } from 'react';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import { Link, useLocation } from 'react-router-dom';
import { useCustomAuth } from '../contexts/CustomAuthContext';
import {
  MenuIcon,
  XIcon,
  UserIcon,
  AwardIcon,
  BookOpenIcon,
  HomeIcon,
  LogOutIcon,
  SettingsIcon,
  BellIcon,
  ChevronDownIcon
} from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, signOut } = useCustomAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  const notificationsRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/login';
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-200' 
        : 'bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 shadow-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Desktop Navigation */}
          <div className="flex items-center">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex-shrink-0 flex items-center group"
              aria-label="Home"
            >
              <div className="relative">
                <div className={`absolute inset-0 rounded-full blur-md group-hover:blur-lg transition-all duration-300 ${
                  isScrolled ? 'bg-emerald-200/50' : 'bg-white/20'
                }`} />
                <div className="relative">
                  <img 
                    src="/wildlife-guardians-compact.svg" 
                    alt="Wildlife Guardians Logo" 
                    className="h-10 w-10 drop-shadow-lg group-hover:drop-shadow-xl transition-all duration-300"
                  />
                </div>
              </div>
              <div className="ml-3 flex flex-col">
                <span className={`text-xl font-bold leading-tight ${
                  isScrolled ? 'text-gray-900' : 'text-white'
                }`}>
                  Wildlife Guardians
                </span>
                <span className={`text-xs hidden sm:block ${
                  isScrolled ? 'text-gray-600' : 'text-white/80'
                }`}>
                  Learn • Conserve • Inspire
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links - Added for better desktop experience */}
            <div className="hidden lg:ml-10 lg:flex lg:space-x-8">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/')
                    ? isScrolled ? 'text-emerald-600' : 'text-white bg-white/20'
                    : isScrolled ? 'text-gray-700 hover:text-emerald-600' : 'text-white/90 hover:text-white'
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/learn"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/learn')
                    ? isScrolled ? 'text-emerald-600' : 'text-white bg-white/20'
                    : isScrolled ? 'text-gray-700 hover:text-emerald-600' : 'text-white/90 hover:text-white'
                }`}
              >
                Learn
              </Link>
              <Link
                to="/badges"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/badges')
                    ? isScrolled ? 'text-emerald-600' : 'text-white bg-white/20'
                    : isScrolled ? 'text-gray-700 hover:text-emerald-600' : 'text-white/90 hover:text-white'
                }`}
              >
                Badges
              </Link>
            </div>
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative" ref={notificationsRef}>
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className={`relative p-1 rounded-full transition-all duration-200 ${
                  isScrolled
                    ? 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
                aria-label="Notifications"
                aria-expanded={isNotificationsOpen}
              >
                <BellIcon className="h-6 w-6" />
                {user?.notifications && user.notifications.some((n: any) => !n.read) && (
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                )}
              </button>
              {/* Enhanced Notifications Dropdown */}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden animate-fade-in">
                  <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-emerald-50 to-emerald-100">
                    <span className="font-semibold text-emerald-900 text-base">Notifications</span>
                    {(user?.notifications && user.notifications.length > 0) && (
                      <button
                        className="text-xs text-emerald-700 hover:underline focus:outline-none"
                        onClick={() => {
                          if (user?.notifications) {
                            user.notifications.forEach((n: any) => n.read = true);
                            setIsNotificationsOpen(false);
                          }
                        }}
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                  <div className="max-h-72 overflow-y-auto bg-white">
                    {user?.notificationsError ? (
                      <div className="flex flex-col items-center justify-center p-6 text-red-600 bg-red-50 text-sm font-semibold border-b border-red-100">
                        <BellIcon className="h-8 w-8 mb-2 text-red-300" />
                        {user.notificationsError}
                      </div>
                    ) : (user?.notifications && user.notifications.length === 0) ? (
                      <div className="flex flex-col items-center justify-center p-8 text-gray-400 bg-gray-50 text-sm font-semibold border-b border-gray-100">
                        <BellIcon className="h-8 w-8 mb-2 text-emerald-200" />
                        No notifications
                      </div>
                    ) : (user?.notifications && user.notifications.length > 0) ? (
                      user.notifications.map((notification: any, idx: number) => {
                        let icon = <BellIcon className="h-5 w-5 text-emerald-500" />;
                        let highlight = '';
                        let actionBtn = null;
                        if (notification.type === 'quiz') {
                          icon = <BookOpenIcon className="h-5 w-5 text-blue-500" />;
                          highlight = 'bg-blue-50';
                          actionBtn = notification.quizId ? (
                            <Link
                              to={`/quizzes/${notification.quizId}`}
                              className="text-xs text-blue-700 hover:underline font-medium ml-2"
                              onClick={() => setIsNotificationsOpen(false)}
                            >
                              View Quiz
                            </Link>
                          ) : null;
                        } else if (notification.type === 'badge') {
                          icon = <AwardIcon className="h-5 w-5 text-yellow-500" />;
                          highlight = 'bg-yellow-50';
                          actionBtn = notification.badgeId ? (
                            <Link
                              to={`/badges/${notification.badgeId}`}
                              className="text-xs text-yellow-700 hover:underline font-medium ml-2"
                              onClick={() => setIsNotificationsOpen(false)}
                            >
                              View Badge
                            </Link>
                          ) : null;
                        } else if (notification.type === 'message') {
                          icon = <UserIcon className="h-5 w-5 text-emerald-500" />;
                          highlight = 'bg-emerald-50';
                          actionBtn = (
                            <Link
                              to={notification.link || '/messages'}
                              className="text-xs text-emerald-700 hover:underline font-medium ml-2"
                              onClick={() => setIsNotificationsOpen(false)}
                            >
                              Reply
                            </Link>
                          );
                        }
                        return (
                          <div
                            key={notification.id}
                            className={`flex items-start gap-3 p-4 hover:bg-emerald-50/60 transition-all duration-200 ${!notification.read ? 'bg-emerald-50/40 animate-pulse' : ''} ${highlight} border-b border-gray-50 last:border-b-0 relative`}
                          >
                            {/* Unread dot */}
                            {!notification.read && (
                              <span className="absolute left-1 top-1 h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                            )}
                            <div className="mt-1">{icon}</div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <div className="text-sm font-semibold text-gray-800">
                                  {notification.title}
                                  {notification.type === 'quiz' && notification.quizName && (
                                    <span className="ml-1 text-xs text-blue-600 font-semibold">{notification.quizName}</span>
                                  )}
                                  {notification.type === 'badge' && notification.badgeName && (
                                    <span className="ml-1 text-xs text-yellow-600 font-semibold">{notification.badgeName}</span>
                                  )}
                                </div>
                                {/* Delete button */}
                                <button
                                  className="ml-2 text-xs text-gray-400 hover:text-red-500"
                                  title="Delete notification"
                                  onClick={() => {
                                    if (user?.notifications) {
                                      user.notifications.splice(idx, 1);
                                    }
                                  }}
                                >
                                  ×
                                </button>
                              </div>
                              <div className="text-gray-600 text-sm">
                                {notification.message}
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-gray-400">
                                  {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                                </span>
                                {actionBtn}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : null}
                  </div>
                  {(user?.notifications && user.notifications.length > 5) && (
                    <div className="p-2 border-t border-gray-100 text-center bg-gray-50">
                      <Link
                        to="/notifications"
                        className="text-xs text-emerald-700 hover:underline font-medium"
                        onClick={() => setIsNotificationsOpen(false)}
                      >
                        View all notifications
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* User Profile Dropdown */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className={`flex items-center space-x-2 rounded-full transition-all duration-200 ${
                  isScrolled
                    ? 'text-gray-700 hover:text-emerald-600 hover:bg-gray-100'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
                aria-label="User menu"
                aria-expanded={isUserMenuOpen}
              >
                {user?.profile_picture ? (
                  <img 
                    src={user.profile_picture} 
                    alt="User profile" 
                    className="h-8 w-8 rounded-full object-cover border-2 border-emerald-400" 
                  />
                ) : (
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center animate-pulse transition-all duration-300">
                    <UserIcon className="h-5 w-5 text-white" />
                    </div>
                )}
                <span className="hidden md:inline font-medium ml-2">
                  {user?.name || 'Account'}
                </span>
                <ChevronDownIcon className={`hidden md:block h-4 w-4 ml-1 transition-transform ${
                  isUserMenuOpen ? 'transform rotate-180' : ''
                }`} />
              </button>
              
              {/* User dropdown menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-800">{user?.name || 'User'}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                  </div>
                  <Link 
                    to="/settings" 
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-emerald-50"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <SettingsIcon className="h-5 w-5 mr-2" /> 
                    Settings
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 border-t border-gray-100"
                  >
                    <LogOutIcon className="h-5 w-5 mr-2" /> 
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;