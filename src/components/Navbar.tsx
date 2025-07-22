import React, { useState, useEffect, useRef } from 'react';
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

  // navLinks moved to Sidebar

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-200' 
        : 'bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 shadow-md'
    }`}>
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex justify-between items-center py-4">
          {/* Logo - shifted right for sidebar toggle */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group transition-transform duration-200 hover:scale-105 ml-14 md:ml-16 lg:ml-20 xl:ml-24"
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
                  className="w-12 h-12 drop-shadow-lg group-hover:drop-shadow-xl transition-all duration-300"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-bold ${
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

          {/* Profile/Notifications only */}
          <div className="flex items-center space-x-6">
            {/* Notifications */}
            <div className="relative" ref={notificationsRef}>
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className={`relative p-2 rounded-lg transition-all duration-200 ${
                  isScrolled
                    ? 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
                aria-label="Notifications"
                aria-expanded={isNotificationsOpen}
              >
                <BellIcon className="h-6 w-6" />
              </button>
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-100 z-50 overflow-hidden">
                  <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                    <span className="font-semibold text-gray-800">Notifications</span>
                    {(user?.notifications && user.notifications.length > 0) && (
                      <button className="text-xs text-emerald-600 hover:underline">
                        Mark all as read
                      </button>
                    )}
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-gray-100">
                    {user?.notificationsError ? (
                      <div className="p-4 text-red-600 bg-red-50 text-sm text-center font-semibold border border-red-200 rounded">
                        {user.notificationsError}
                      </div>
                    ) : (user?.notifications && user.notifications.length === 0) ? (
                      <div className="p-4 text-gray-500 text-sm text-center">
                        No notifications
                      </div>
                    ) : (user?.notifications && user.notifications.length > 0) ? (
                      user.notifications.map((notification: any) => (
                        <div key={notification.id} className="p-3 hover:bg-gray-50">
                          <div className="text-sm font-medium text-gray-800">
                            {notification.title}
                          </div>
                          <div className="text-gray-600 text-sm">
                            {notification.message}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            {new Date(notification.createdAt).toLocaleString()}
                          </div>
                        </div>
                      ))
                    ) : null}
                  </div>
                </div>
              )}
            </div>

            {/* User menu */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                  isScrolled
                    ? 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
                aria-label="User menu"
                aria-expanded={isUserMenuOpen}
              >
                {user?.profile_picture ? (
                  <img 
                    src={user.profile_picture} 
                    alt="User profile" 
                    className="w-8 h-8 rounded-full object-cover border-2 border-emerald-400" 
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <UserIcon className="h-5 w-5 text-white" />
                  </div>
                )}
                <span className="hidden md:inline font-medium">
                  {user?.name || 'Account'}
                </span>
                <ChevronDownIcon className="h-4 w-4 ml-1" />
              </button>
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 z-50 overflow-hidden">
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