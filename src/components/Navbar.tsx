import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { MenuIcon, XIcon, UserIcon, AwardIcon, BookOpenIcon, HomeIcon, LogOutIcon, SettingsIcon } from 'lucide-react';
const Navbar: React.FC = () => {
  const {
    user,
    signOut
  } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };
  return <nav className="bg-green-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpenIcon className="h-8 w-8" />
            <span className="text-xl font-bold">Wildlife Guardians</span>
          </Link>
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-green-200 flex items-center space-x-1">
              <HomeIcon className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link to="/badges" className="hover:text-green-200 flex items-center space-x-1">
              <AwardIcon className="h-5 w-5" />
              <span>Badges</span>
            </Link>
            <div className="relative group">
              <button className="flex items-center space-x-1 hover:text-green-200">
                <UserIcon className="h-5 w-5" />
                <span>{user?.user_metadata?.name || 'Profile'}</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                <Link to="/settings" className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center">
                  <SettingsIcon className="h-4 w-4 mr-2" />
                  Settings
                </Link>
                <button onClick={handleSignOut} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center">
                  <LogOutIcon className="h-4 w-4 mr-2" />
                  Sign out
                </button>
              </div>
            </div>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
        {/* Mobile navigation */}
        {isMenuOpen && <div className="md:hidden py-4 border-t border-green-500">
            <Link to="/" className="block py-2 hover:text-green-200 flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
              <HomeIcon className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link to="/badges" className="block py-2 hover:text-green-200 flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
              <AwardIcon className="h-5 w-5" />
              <span>Badges</span>
            </Link>
            <Link to="/settings" className="block py-2 hover:text-green-200 flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
              <SettingsIcon className="h-5 w-5" />
              <span>Settings</span>
            </Link>
            <button onClick={handleSignOut} className="block py-2 hover:text-green-200 w-full text-left flex items-center space-x-2">
              <LogOutIcon className="h-5 w-5" />
              <span>Sign out</span>
            </button>
          </div>}
      </div>
    </nav>;
};
export default Navbar;