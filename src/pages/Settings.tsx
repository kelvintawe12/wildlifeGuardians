import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { 
  LockIcon, 
  SaveIcon, 
  WifiOffIcon, 
  BellIcon, 
  MoonIcon,
  ShieldIcon,
  DatabaseIcon,
  LanguagesIcon,
  PaletteIcon,
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
  
  const [activeTab, setActiveTab] = useState('profile');

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

  // ...existing code...

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

  // ...existing code...

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
    { id: 'profile', label: 'Profile', icon: LockIcon },
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
        {/* You can add your main content grid and tabs here, as needed */}
      </div>
    </div>
  );
};

export default Settings;