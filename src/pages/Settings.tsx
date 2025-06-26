import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import { UserIcon, MailIcon, LockIcon, SaveIcon, WifiOffIcon, BellIcon, MoonIcon } from 'lucide-react';
import { clearLocalStorage } from '../services/offlineStorage';
const Settings: React.FC = () => {
  const {
    user,
    updateProfile
  } = useAuth();
  const [name, setName] = useState(user?.user_metadata?.name || '');
  const [isUpdating, setIsUpdating] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [offlineMode, setOfflineMode] = useState(true);
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      await updateProfile({
        name
      });
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsUpdating(false);
    }
  };
  const handleClearOfflineData = () => {
    const confirmed = window.confirm('Are you sure you want to clear all offline data? This cannot be undone.');
    if (confirmed) {
      clearLocalStorage();
      toast.success('Offline data cleared successfully');
    }
  };
  return <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="px-6 py-4 bg-green-600 text-white">
          <h2 className="text-lg font-semibold">Profile Settings</h2>
        </div>
        <form onSubmit={handleUpdateProfile} className="p-6">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input id="name" type="text" value={name} onChange={e => setName(e.target.value)} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="Your name" />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MailIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input id="email" type="email" value={user?.email || ''} disabled className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-500" />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Email cannot be changed
            </p>
          </div>
          <div>
            <button type="submit" disabled={isUpdating} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50">
              {isUpdating ? <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </> : <>
                  <SaveIcon className="h-4 w-4 mr-2" />
                  Save Changes
                </>}
            </button>
          </div>
        </form>
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="px-6 py-4 bg-blue-600 text-white">
          <h2 className="text-lg font-semibold">App Settings</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <MoonIcon className="h-5 w-5 text-gray-500 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">Dark Mode</h3>
                <p className="text-xs text-gray-500">
                  Enable dark mode for night time viewing
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <BellIcon className="h-5 w-5 text-gray-500 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  Notifications
                </h3>
                <p className="text-xs text-gray-500">
                  Receive quiz and badge notifications
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={notifications} onChange={() => setNotifications(!notifications)} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <WifiOffIcon className="h-5 w-5 text-gray-500 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  Offline Mode
                </h3>
                <p className="text-xs text-gray-500">
                  Enable access to content when offline
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={offlineMode} onChange={() => setOfflineMode(!offlineMode)} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-red-600 text-white">
          <h2 className="text-lg font-semibold">Data Management</h2>
        </div>
        <div className="p-6">
          <p className="text-sm text-gray-600 mb-4">
            Clear all offline data stored on this device. This action cannot be
            undone.
          </p>
          <button onClick={handleClearOfflineData} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
            Clear Offline Data
          </button>
        </div>
      </div>
    </div>;
};
export default Settings;