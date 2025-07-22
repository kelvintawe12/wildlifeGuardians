import React, { useState } from 'react';
import { useCustomAuth } from '../contexts/CustomAuthContext';
import { UserIcon } from 'lucide-react';

const Settings: React.FC = () => {
  const { user } = useCustomAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [privacy, setPrivacy] = useState({
    showProfile: true,
    emailUpdates: true,
    publicBadges: false,
  });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-4">
      <div className="w-full max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-xl font-bold text-gray-900">Account Settings</h1>
          <p className="text-gray-600 text-sm">Manage your account preferences</p>
        </div>

        <form onSubmit={handleSave} className="bg-white rounded-md shadow p-4 space-y-4">
          {/* Profile Section */}
          <div className="flex items-center gap-3">
            {user?.profile_picture ? (
              <img src={user.profile_picture} alt="Profile" className="w-12 h-12 rounded-full object-cover border-2 border-emerald-400" />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center">
                <UserIcon className="h-6 w-6 text-white" />
              </div>
            )}
            <div>
              <div className="font-semibold text-gray-900">{user?.name}</div>
              <div className="text-gray-500 text-xs">{user?.email}</div>
            </div>
          </div>

          {/* Editable Fields */}
          <div className="grid grid-cols-1 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                className="w-full rounded border border-gray-200 px-2 py-1.5 text-sm focus:ring-emerald-500 focus:border-emerald-500"
                value={name}
                onChange={e => setName(e.target.value)}
                autoComplete="name"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full rounded border border-gray-200 px-2 py-1.5 text-sm focus:ring-emerald-500 focus:border-emerald-500"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Change Password</label>
              <input
                type="password"
                className="w-full rounded border border-gray-200 px-2 py-1.5 text-sm focus:ring-emerald-500 focus:border-emerald-500"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="new-password"
                placeholder="New password"
              />
            </div>
          </div>

          {/* Privacy Preferences */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Privacy Preferences</label>
            <div className="space-y-1 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={privacy.showProfile}
                  onChange={e => setPrivacy(p => ({ ...p, showProfile: e.target.checked }))}
                  className="h-3.5 w-3.5 accent-emerald-500"
                />
                Show my profile publicly
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={privacy.emailUpdates}
                  onChange={e => setPrivacy(p => ({ ...p, emailUpdates: e.target.checked }))}
                  className="h-3.5 w-3.5 accent-emerald-500"
                />
                Receive email updates
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={privacy.publicBadges}
                  onChange={e => setPrivacy(p => ({ ...p, publicBadges: e.target.checked }))}
                  className="h-3.5 w-3.5 accent-emerald-500"
                />
                Show my badges publicly
              </label>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-1.5 rounded shadow-sm disabled:opacity-60"
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            {success && <span className="text-emerald-600 text-sm font-medium">Saved!</span>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;