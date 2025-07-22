import React from 'react';

const Settings: React.FC = () => {
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