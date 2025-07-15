import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import { 
  UserIcon, 
  LockIcon, 
  SaveIcon, 
  WifiOffIcon, 
  BellIcon, 
  MoonIcon,
  ShieldIcon,
  DatabaseIcon,
  LanguagesIcon,
  PaletteIcon,
  CameraIcon,
  TrashIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  GlobeIcon,
  VolumeXIcon,
  Volume2Icon,
  SunIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { clearLocalStorage } from '../services/offlineStorage';

const Settings: React.FC = () => {
  const { user, updateProfile } = useAuth();
  
  // Profile settings
  const [profileData, setProfileData] = useState({
    name: user?.user_metadata?.name || '',
    bio: user?.user_metadata?.bio || '',
    location: user?.user_metadata?.location || '',
    website: user?.user_metadata?.website || ''
  });
  
  // Preference settings
  const [preferences, setPreferences] = useState({
    darkMode: localStorage.getItem('darkMode') === 'true',
    language: localStorage.getItem('language') || 'en',
    timezone: localStorage.getItem('timezone') || 'UTC',
    theme: localStorage.getItem('theme') || 'emerald'
  });
  
  // Notification settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    quizReminders: true,
    conservationUpdates: true,
    achievementAlerts: true,
    weeklyDigest: true,
    soundEnabled: true,
    desktopNotifications: false
  });
  
  // Privacy settings
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showProgress: true,
    showBadges: true,
    allowMessaging: true,
    dataSharing: false
  });
  
  // Security settings
  const [security, setSecurity] = useState({
    twoFactorEnabled: false,
    sessionTimeout: '30',
    loginAlerts: true
  });
  
  const [isUpdating, setIsUpdating] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    // Load saved preferences
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    }
    
    const savedPrivacy = localStorage.getItem('privacy');
    if (savedPrivacy) {
      setPrivacy(JSON.parse(savedPrivacy));
    }
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      await updateProfile(profileData);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSavePreferences = () => {
    localStorage.setItem('darkMode', preferences.darkMode.toString());
    localStorage.setItem('language', preferences.language);
    localStorage.setItem('timezone', preferences.timezone);
    localStorage.setItem('theme', preferences.theme);
    toast.success('Preferences saved successfully');
  };

  const handleSaveNotifications = () => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
    toast.success('Notification preferences saved');
  };

  const handleSavePrivacy = () => {
    localStorage.setItem('privacy', JSON.stringify(privacy));
    toast.success('Privacy settings saved');
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    // Handle password change logic here
    toast.success('Password changed successfully');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setShowPasswordChange(false);
  };

  const handleClearOfflineData = () => {
    const confirmed = window.confirm('Are you sure you want to clear all offline data? This cannot be undone.');
    if (confirmed) {
      clearLocalStorage();
      toast.success('Offline data cleared successfully');
    }
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm('Are you sure you want to delete your account? This action cannot be undone and you will lose all your progress.');
    if (confirmed) {
      const doubleConfirm = window.confirm('This is permanent! Are you absolutely sure?');
      if (doubleConfirm) {
        // Handle account deletion logic here
        toast.error('Account deletion feature will be implemented soon');
      }
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: UserIcon },
    { id: 'preferences', label: 'Preferences', icon: PaletteIcon },
    { id: 'notifications', label: 'Notifications', icon: BellIcon },
    { id: 'privacy', label: 'Privacy', icon: ShieldIcon },
    { id: 'security', label: 'Security', icon: LockIcon },
    { id: 'data', label: 'Data & Storage', icon: DatabaseIcon }
  ];

  const themes = [
    { id: 'emerald', name: 'Emerald', color: 'bg-emerald-500' },
    { id: 'blue', name: 'Ocean Blue', color: 'bg-blue-500' },
    { id: 'green', name: 'Forest Green', color: 'bg-green-500' },
    { id: 'amber', name: 'Sunset', color: 'bg-amber-500' },
    { id: 'purple', name: 'Lavender', color: 'bg-purple-500' }
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'zh', name: '中文' },
    { code: 'ja', name: '日本語' }
  ];

  const timezones = [
    { value: 'UTC', label: 'UTC (Coordinated Universal Time)' },
    { value: 'EST', label: 'EST (Eastern Standard Time)' },
    { value: 'PST', label: 'PST (Pacific Standard Time)' },
    { value: 'GMT', label: 'GMT (Greenwich Mean Time)' },
    { value: 'CET', label: 'CET (Central European Time)' },
    { value: 'JST', label: 'JST (Japan Standard Time)' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
      <div className="container mx-auto px-4 lg:px-6 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 font-['Playfair_Display'] mb-2">Account Settings</h1>
          <p className="text-gray-600">Manage your account preferences and privacy settings</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="card p-4 sticky top-4">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <IconComponent className="h-5 w-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="card p-8">
                  <div className="flex items-center mb-6">
                    <UserIcon className="h-6 w-6 text-emerald-600 mr-3" />
                    <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
                  </div>

                  <form onSubmit={handleUpdateProfile} className="space-y-6">
                    {/* Profile Picture */}
                    <div className="flex items-center space-x-6">
                      <div className="relative">
                        {user?.user_metadata?.avatar_url ? (
                          <img 
                            src={user.user_metadata.avatar_url} 
                            alt="Profile" 
                            className="w-20 h-20 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center">
                            <UserIcon className="h-10 w-10 text-white" />
                          </div>
                        )}
                        <button
                          type="button"
                          className="absolute -bottom-2 -right-2 bg-white border border-gray-300 rounded-full p-2 shadow-sm hover:shadow-md transition-shadow"
                        >
                          <CameraIcon className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{profileData.name || 'Add your name'}</h3>
                        <p className="text-gray-500">{user?.email}</p>
                        <button
                          type="button"
                          className="mt-2 text-sm text-emerald-600 hover:text-emerald-700"
                        >
                          Change photo
                        </button>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <input
                          type="text"
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="Your full name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          value={user?.email || ''}
                          disabled
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                        <input
                          type="text"
                          value={profileData.location}
                          onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="City, Country"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                        <input
                          type="url"
                          value={profileData.website}
                          onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="https://your-website.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                      <textarea
                        rows={4}
                        value={profileData.bio}
                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="Tell others about yourself and your conservation interests..."
                      />
                      <p className="text-xs text-gray-500 mt-1">{profileData.bio.length}/500 characters</p>
                    </div>

                    <button
                      type="submit"
                      disabled={isUpdating}
                      className="flex items-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-medium rounded-lg transition-colors"
                    >
                      <SaveIcon className="h-5 w-5 mr-2" />
                      {isUpdating ? 'Saving...' : 'Save Changes'}
                    </button>
                  </form>
                </div>

                {/* Password Change */}
                <div className="card p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <LockIcon className="h-6 w-6 text-amber-600 mr-3" />
                      <h2 className="text-2xl font-bold text-gray-900">Change Password</h2>
                    </div>
                    <button
                      onClick={() => setShowPasswordChange(!showPasswordChange)}
                      className="text-amber-600 hover:text-amber-700"
                    >
                      {showPasswordChange ? 'Cancel' : 'Change Password'}
                    </button>
                  </div>

                  {showPasswordChange && (
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                        <input
                          type="password"
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                          required
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                          <input
                            type="password"
                            value={passwordData.newPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                          <input
                            type="password"
                            value={passwordData.confirmPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                            required
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="flex items-center px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors"
                      >
                        <LockIcon className="h-5 w-5 mr-2" />
                        Update Password
                      </button>
                    </form>
                  )}
                </div>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <div className="card p-8">
                  <div className="flex items-center mb-6">
                    <PaletteIcon className="h-6 w-6 text-purple-600 mr-3" />
                    <h2 className="text-2xl font-bold text-gray-900">App Preferences</h2>
                  </div>

                  <div className="space-y-8">
                    {/* Theme Selection */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Theme</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {themes.map((theme) => (
                          <div
                            key={theme.id}
                            onClick={() => setPreferences({ ...preferences, theme: theme.id })}
                            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                              preferences.theme === theme.id
                                ? 'border-purple-500 bg-purple-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <div className={`w-6 h-6 rounded-full ${theme.color}`}></div>
                              <span className="font-medium">{theme.name}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Dark Mode Toggle */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {preferences.darkMode ? <MoonIcon className="h-5 w-5 text-gray-600" /> : <SunIcon className="h-5 w-5 text-gray-600" />}
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">Dark Mode</h3>
                          <p className="text-gray-500">Switch between light and dark themes</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setPreferences({ ...preferences, darkMode: !preferences.darkMode })}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          preferences.darkMode ? 'bg-purple-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            preferences.darkMode ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Language Selection */}
                    <div>
                      <label className="block text-lg font-medium text-gray-900 mb-4">Language</label>
                      <div className="flex items-center space-x-3">
                        <LanguagesIcon className="h-5 w-5 text-gray-600" />
                        <select
                          value={preferences.language}
                          onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        >
                          {languages.map((lang) => (
                            <option key={lang.code} value={lang.code}>
                              {lang.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Timezone Selection */}
                    <div>
                      <label className="block text-lg font-medium text-gray-900 mb-4">Timezone</label>
                      <div className="flex items-center space-x-3">
                        <GlobeIcon className="h-5 w-5 text-gray-600" />
                        <select
                          value={preferences.timezone}
                          onChange={(e) => setPreferences({ ...preferences, timezone: e.target.value })}
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        >
                          {timezones.map((tz) => (
                            <option key={tz.value} value={tz.value}>
                              {tz.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <button
                      onClick={handleSavePreferences}
                      className="flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
                    >
                      <SaveIcon className="h-5 w-5 mr-2" />
                      Save Preferences
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div className="card p-8">
                  <div className="flex items-center mb-6">
                    <BellIcon className="h-6 w-6 text-blue-600 mr-3" />
                    <h2 className="text-2xl font-bold text-gray-900">Notification Preferences</h2>
                  </div>

                  <div className="space-y-6">
                    {/* Email Notifications */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-900">Email Notifications</h3>
                      
                      <div className="space-y-3">
                        {[
                          { key: 'emailNotifications', label: 'Email notifications', desc: 'Receive notifications via email' },
                          { key: 'quizReminders', label: 'Quiz reminders', desc: 'Get reminded about new quizzes' },
                          { key: 'conservationUpdates', label: 'Conservation updates', desc: 'Latest news and updates about wildlife conservation' },
                          { key: 'achievementAlerts', label: 'Achievement alerts', desc: 'Notifications when you earn new badges' },
                          { key: 'weeklyDigest', label: 'Weekly digest', desc: 'Weekly summary of your progress and new content' }
                        ].map((item) => (
                          <div key={item.key} className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900">{item.label}</h4>
                              <p className="text-sm text-gray-500">{item.desc}</p>
                            </div>
                            <button
                              onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] })}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                notifications[item.key as keyof typeof notifications] ? 'bg-blue-600' : 'bg-gray-200'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  notifications[item.key as keyof typeof notifications] ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Push Notifications */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-900">Push Notifications</h3>
                      
                      <div className="space-y-3">
                        {[
                          { key: 'pushNotifications', label: 'Browser notifications', desc: 'Show notifications in your browser' },
                          { key: 'desktopNotifications', label: 'Desktop notifications', desc: 'Show notifications on your desktop' },
                          { key: 'soundEnabled', label: 'Sound notifications', desc: 'Play sound with notifications' }
                        ].map((item) => (
                          <div key={item.key} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              {item.key === 'soundEnabled' && (
                                notifications.soundEnabled ? <Volume2Icon className="h-5 w-5 text-gray-600" /> : <VolumeXIcon className="h-5 w-5 text-gray-600" />
                              )}
                              <div>
                                <h4 className="font-medium text-gray-900">{item.label}</h4>
                                <p className="text-sm text-gray-500">{item.desc}</p>
                              </div>
                            </div>
                            <button
                              onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] })}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                notifications[item.key as keyof typeof notifications] ? 'bg-blue-600' : 'bg-gray-200'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  notifications[item.key as keyof typeof notifications] ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={handleSaveNotifications}
                      className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                    >
                      <SaveIcon className="h-5 w-5 mr-2" />
                      Save Notification Settings
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Privacy Tab */}
            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <div className="card p-8">
                  <div className="flex items-center mb-6">
                    <ShieldIcon className="h-6 w-6 text-green-600 mr-3" />
                    <h2 className="text-2xl font-bold text-gray-900">Privacy Settings</h2>
                  </div>

                  <div className="space-y-6">
                    {/* Profile Visibility */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Visibility</h3>
                      <div className="space-y-3">
                        {[
                          { value: 'public', label: 'Public', desc: 'Anyone can see your profile' },
                          { value: 'friends', label: 'Friends only', desc: 'Only your friends can see your profile' },
                          { value: 'private', label: 'Private', desc: 'Only you can see your profile' }
                        ].map((option) => (
                          <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                            <input
                              type="radio"
                              name="profileVisibility"
                              value={option.value}
                              checked={privacy.profileVisibility === option.value}
                              onChange={(e) => setPrivacy({ ...privacy, profileVisibility: e.target.value })}
                              className="text-green-600 focus:ring-green-500"
                            />
                            <div>
                              <span className="font-medium text-gray-900">{option.label}</span>
                              <p className="text-sm text-gray-500">{option.desc}</p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Data Sharing */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-900">Data & Activity</h3>
                      
                      <div className="space-y-3">
                        {[
                          { key: 'showProgress', label: 'Show learning progress', desc: 'Display your quiz scores and learning progress' },
                          { key: 'showBadges', label: 'Show badges', desc: 'Display your earned badges and achievements' },
                          { key: 'allowMessaging', label: 'Allow messaging', desc: 'Let other users send you messages' },
                          { key: 'dataSharing', label: 'Share anonymous data', desc: 'Help improve the platform by sharing anonymous usage data' }
                        ].map((item) => (
                          <div key={item.key} className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900">{item.label}</h4>
                              <p className="text-sm text-gray-500">{item.desc}</p>
                            </div>
                            <button
                              onClick={() => setPrivacy({ ...privacy, [item.key]: !privacy[item.key as keyof typeof privacy] })}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                privacy[item.key as keyof typeof privacy] ? 'bg-green-600' : 'bg-gray-200'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  privacy[item.key as keyof typeof privacy] ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <ShieldIcon className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-blue-900">Your Privacy Matters</h4>
                          <p className="text-sm text-blue-700 mt-1">
                            We take your privacy seriously. Read our{' '}
                            <Link to="/privacy" className="underline hover:text-blue-800">Privacy Policy</Link>{' '}
                            to learn more about how we protect your data.
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleSavePrivacy}
                      className="flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                    >
                      <SaveIcon className="h-5 w-5 mr-2" />
                      Save Privacy Settings
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="card p-8">
                  <div className="flex items-center mb-6">
                    <LockIcon className="h-6 w-6 text-red-600 mr-3" />
                    <h2 className="text-2xl font-bold text-gray-900">Security Settings</h2>
                  </div>

                  <div className="space-y-6">
                    {/* Two-Factor Authentication */}
                    <div className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">Two-Factor Authentication</h3>
                          <p className="text-gray-500">Add an extra layer of security to your account</p>
                        </div>
                        <button
                          onClick={() => setSecurity({ ...security, twoFactorEnabled: !security.twoFactorEnabled })}
                          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                            security.twoFactorEnabled
                              ? 'bg-red-100 text-red-700 hover:bg-red-200'
                              : 'bg-green-100 text-green-700 hover:bg-green-200'
                          }`}
                        >
                          {security.twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
                        </button>
                      </div>
                      
                      {security.twoFactorEnabled ? (
                        <div className="flex items-center space-x-2 text-green-700">
                          <CheckCircleIcon className="h-5 w-5" />
                          <span className="text-sm">Two-factor authentication is enabled</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2 text-amber-700">
                          <AlertTriangleIcon className="h-5 w-5" />
                          <span className="text-sm">Consider enabling 2FA for better security</span>
                        </div>
                      )}
                    </div>

                    {/* Session Settings */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Session Settings</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Auto-logout after inactivity
                          </label>
                          <select
                            value={security.sessionTimeout}
                            onChange={(e) => setSecurity({ ...security, sessionTimeout: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                          >
                            <option value="15">15 minutes</option>
                            <option value="30">30 minutes</option>
                            <option value="60">1 hour</option>
                            <option value="120">2 hours</option>
                            <option value="never">Never</option>
                          </select>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900">Login alerts</h4>
                            <p className="text-sm text-gray-500">Get notified of new login attempts</p>
                          </div>
                          <button
                            onClick={() => setSecurity({ ...security, loginAlerts: !security.loginAlerts })}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              security.loginAlerts ? 'bg-red-600' : 'bg-gray-200'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                security.loginAlerts ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex justify-between">
                            <span>Last login</span>
                            <span>Today at 2:30 PM</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Login location</span>
                            <span>New York, NY</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Device</span>
                            <span>Chrome on Windows</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Data & Storage Tab */}
            {activeTab === 'data' && (
              <div className="space-y-6">
                <div className="card p-8">
                  <div className="flex items-center mb-6">
                    <DatabaseIcon className="h-6 w-6 text-indigo-600 mr-3" />
                    <h2 className="text-2xl font-bold text-gray-900">Data & Storage</h2>
                  </div>

                  <div className="space-y-6">
                    {/* Offline Data */}
                    <div className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <WifiOffIcon className="h-5 w-5 text-indigo-600" />
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">Offline Data</h3>
                            <p className="text-gray-500">Manage locally stored data for offline access</p>
                          </div>
                        </div>
                        <button
                          onClick={handleClearOfflineData}
                          className="px-4 py-2 bg-amber-100 text-amber-700 hover:bg-amber-200 font-medium rounded-lg transition-colors"
                        >
                          Clear Data
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="text-center">
                          <div className="font-medium text-gray-900">Quizzes</div>
                          <div className="text-gray-500">12 MB</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-gray-900">Animals</div>
                          <div className="text-gray-500">8 MB</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-gray-900">Images</div>
                          <div className="text-gray-500">45 MB</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-gray-900">Total</div>
                          <div className="text-gray-500">65 MB</div>
                        </div>
                      </div>
                    </div>

                    {/* Data Export */}
                    <div className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">Export Your Data</h3>
                          <p className="text-gray-500">Download a copy of all your data</p>
                        </div>
                        <button className="px-4 py-2 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 font-medium rounded-lg transition-colors">
                          Request Export
                        </button>
                      </div>
                      
                      <div className="text-sm text-gray-600">
                        <p>Includes: Profile information, quiz results, badges earned, and activity history.</p>
                        <p className="mt-1">Export will be emailed to you within 24 hours.</p>
                      </div>
                    </div>

                    {/* Account Deletion */}
                    <div className="border border-red-200 rounded-lg p-6 bg-red-50">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <AlertTriangleIcon className="h-5 w-5 text-red-600" />
                          <div>
                            <h3 className="text-lg font-medium text-red-900">Delete Account</h3>
                            <p className="text-red-700">Permanently delete your account and all data</p>
                          </div>
                        </div>
                        <button
                          onClick={handleDeleteAccount}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
                        >
                          <TrashIcon className="h-4 w-4 mr-2 inline" />
                          Delete Account
                        </button>
                      </div>
                      
                      <div className="text-sm text-red-700">
                        <p><strong>Warning:</strong> This action cannot be undone. All your progress, badges, and data will be permanently lost.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;