import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import {
  SettingsIcon,
  DatabaseIcon,
  ShieldIcon,
  BellIcon,
  GlobeIcon,
  SaveIcon,
  RefreshCwIcon,
  CheckCircleIcon,
  EyeIcon,
  EyeOffIcon,
  DownloadIcon,
  UploadIcon
} from 'lucide-react';

interface SystemSettings {
  general: {
    siteName: string;
    description: string;
    maintenanceMode: boolean;
    userRegistration: boolean;
    emailVerification: boolean;
  };
  database: {
    backupEnabled: boolean;
    backupFrequency: string;
    autoCleanup: boolean;
    retentionDays: number;
  };
  security: {
    passwordPolicy: {
      minLength: number;
      requireSpecialChars: boolean;
      requireNumbers: boolean;
      requireUppercase: boolean;
    };
    sessionTimeout: number;
    twoFactorAuth: boolean;
    bruteForceProtection: boolean;
  };
  notifications: {
    emailNotifications: boolean;
    adminAlerts: boolean;
    userWelcomeEmail: boolean;
    quizCompletionEmail: boolean;
    badgeEarnedEmail: boolean;
  };
  api: {
    rateLimit: number;
    enableLogging: boolean;
    logLevel: string;
    cors: string[];
  };
}

const AdminSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const [settings, setSettings] = useState<SystemSettings>({
    general: {
      siteName: 'Wildlife Guardians',
      description: 'Educational platform for wildlife conservation',
      maintenanceMode: false,
      userRegistration: true,
      emailVerification: true
    },
    database: {
      backupEnabled: true,
      backupFrequency: 'daily',
      autoCleanup: true,
      retentionDays: 30
    },
    security: {
      passwordPolicy: {
        minLength: 8,
        requireSpecialChars: true,
        requireNumbers: true,
        requireUppercase: true
      },
      sessionTimeout: 1440, // 24 hours in minutes
      twoFactorAuth: false,
      bruteForceProtection: true
    },
    notifications: {
      emailNotifications: true,
      adminAlerts: true,
      userWelcomeEmail: true,
      quizCompletionEmail: false,
      badgeEarnedEmail: true
    },
    api: {
      rateLimit: 100,
      enableLogging: true,
      logLevel: 'info',
      cors: ['http://localhost:3000', 'https://wildlife-guardians.vercel.app']
    }
  });

  const tabs = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'database', label: 'Database', icon: DatabaseIcon },
    { id: 'security', label: 'Security', icon: ShieldIcon },
    { id: 'notifications', label: 'Notifications', icon: BellIcon },
    { id: 'api', label: 'API & Logs', icon: GlobeIcon }
  ];

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = (section: keyof SystemSettings, key: string, value?: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value !== undefined ? value : !(prev[section] as any)[key]
      }
    }));
  };

  const handleNestedToggle = (section: keyof SystemSettings, nested: string, key: string) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [nested]: {
          ...(prev[section] as any)[nested],
          [key]: !(prev[section] as any)[nested][key]
        }
      }
    }));
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Site Name</label>
        <input
          type="text"
          value={settings.general.siteName}
          onChange={(e) => handleToggle('general', 'siteName', e.target.value)}
          className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
        <textarea
          value={settings.general.description}
          onChange={(e) => handleToggle('general', 'description', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
          <div>
            <h3 className="text-sm font-medium text-white">Maintenance Mode</h3>
            <p className="text-xs text-gray-400">Temporarily disable site access</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.general.maintenanceMode}
              onChange={() => handleToggle('general', 'maintenanceMode')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
          <div>
            <h3 className="text-sm font-medium text-white">User Registration</h3>
            <p className="text-xs text-gray-400">Allow new users to register</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.general.userRegistration}
              onChange={() => handleToggle('general', 'userRegistration')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderDatabaseSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
          <div>
            <h3 className="text-sm font-medium text-white">Automatic Backups</h3>
            <p className="text-xs text-gray-400">Enable scheduled database backups</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.database.backupEnabled}
              onChange={() => handleToggle('database', 'backupEnabled')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Backup Frequency</label>
          <select
            value={settings.database.backupFrequency}
            onChange={(e) => handleToggle('database', 'backupFrequency', e.target.value)}
            className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Data Retention (Days)</label>
        <input
          type="number"
          value={settings.database.retentionDays}
          onChange={(e) => handleToggle('database', 'retentionDays', parseInt(e.target.value))}
          className="w-32 px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      <div className="flex space-x-4">
        <button className="flex items-center px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors">
          <DownloadIcon className="h-4 w-4 mr-2" />
          Backup Now
        </button>
        <button className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
          <UploadIcon className="h-4 w-4 mr-2" />
          Restore
        </button>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="bg-slate-700/30 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-white mb-4">Password Policy</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Minimum Length</label>
            <input
              type="number"
              value={settings.security.passwordPolicy.minLength}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                security: {
                  ...prev.security,
                  passwordPolicy: {
                    ...prev.security.passwordPolicy,
                    minLength: parseInt(e.target.value)
                  }
                }
              }))}
              className="w-24 px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          
          <div className="space-y-3">
            {[
              { key: 'requireSpecialChars', label: 'Require Special Characters' },
              { key: 'requireNumbers', label: 'Require Numbers' },
              { key: 'requireUppercase', label: 'Require Uppercase' }
            ].map(({ key, label }) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-sm text-gray-300">{label}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={(settings.security.passwordPolicy as any)[key]}
                    onChange={() => handleNestedToggle('security', 'passwordPolicy', key)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Session Timeout (Minutes)</label>
        <input
          type="number"
          value={settings.security.sessionTimeout}
          onChange={(e) => handleToggle('security', 'sessionTimeout', parseInt(e.target.value))}
          className="w-32 px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>
    </div>
  );

  const renderApiSettings = () => (
    <div className="space-y-6">
      <div className="bg-slate-700/30 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-white mb-4">API Configuration</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Rate Limit (requests/minute)</label>
            <input
              type="number"
              value={settings.api.rateLimit}
              onChange={(e) => handleToggle('api', 'rateLimit', parseInt(e.target.value))}
              className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Log Level</label>
            <select
              value={settings.api.logLevel}
              onChange={(e) => handleToggle('api', 'logLevel', e.target.value)}
              className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="error">Error</option>
              <option value="warn">Warning</option>
              <option value="info">Info</option>
              <option value="debug">Debug</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">API Key</label>
          <div className="flex items-center space-x-2">
            <input
              type={showApiKey ? 'text' : 'password'}
              value="sk_live_abcd1234efgh5678ijkl9012mnop3456"
              readOnly
              className="flex-1 px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none"
            />
            <button
              onClick={() => setShowApiKey(!showApiKey)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              {showApiKey ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
            </button>
            <button className="px-3 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors">
              <RefreshCwIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">System Settings</h1>
            <p className="text-gray-400">Configure platform settings and preferences</p>
          </div>
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            {saved && (
              <div className="flex items-center text-green-400 text-sm">
                <CheckCircleIcon className="h-4 w-4 mr-1" />
                Settings saved!
              </div>
            )}
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="flex items-center px-4 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white rounded-lg transition-colors"
            >
              {isLoading ? (
                <RefreshCwIcon className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <SaveIcon className="h-4 w-4 mr-2" />
              )}
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'text-gray-300 hover:bg-slate-700/50 hover:text-white'
                    }`}
                  >
                    <IconComponent className="mr-3 h-5 w-5" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
              {activeTab === 'general' && renderGeneralSettings()}
              {activeTab === 'database' && renderDatabaseSettings()}
              {activeTab === 'security' && renderSecuritySettings()}
              {activeTab === 'notifications' && (
                <div className="space-y-4">
                  {Object.entries(settings.notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                      <div>
                        <h3 className="text-sm font-medium text-white capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </h3>
                        <p className="text-xs text-gray-400">
                          {key.includes('Email') ? 'Send email notifications' : 'Enable notifications'}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={() => handleToggle('notifications', key)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 'api' && renderApiSettings()}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
