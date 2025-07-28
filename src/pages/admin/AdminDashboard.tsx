import React from 'react';
import { ShieldIcon, UsersIcon, FileTextIcon, SettingsIcon } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-2 lg:py-10">
      <div className="w-full max-w-5xl mx-auto px-1 sm:px-2 lg:px-8">
        <div className="mb-6 flex items-center gap-3">
          <ShieldIcon className="h-7 w-7 text-emerald-700" />
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-['Playfair_Display']">Admin Dashboard</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example cards - replace with real stats/components */}
          <div className="bg-white rounded-lg shadow p-5 flex flex-col items-center">
            <UsersIcon className="h-8 w-8 text-emerald-600 mb-2" />
            <div className="text-lg font-semibold">Users</div>
            <div className="text-2xl font-bold text-emerald-700">123</div>
          </div>
          <div className="bg-white rounded-lg shadow p-5 flex flex-col items-center">
            <FileTextIcon className="h-8 w-8 text-blue-600 mb-2" />
            <div className="text-lg font-semibold">Reports</div>
            <div className="text-2xl font-bold text-blue-700">8</div>
          </div>
          <div className="bg-white rounded-lg shadow p-5 flex flex-col items-center">
            <SettingsIcon className="h-8 w-8 text-yellow-600 mb-2" />
            <div className="text-lg font-semibold">Settings</div>
            <div className="text-2xl font-bold text-yellow-700">3</div>
          </div>
        </div>
        {/* Add more dashboard widgets or quick links here */}
      </div>
    </div>
  );
};

export default AdminDashboard;
