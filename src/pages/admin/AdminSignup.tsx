import React, { useState } from 'react';
import { ShieldIcon } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import adminAPI from '@services/adminAPI';

const AdminSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await adminAPI.adminSignup({ email, password, name });
      setSuccess('Admin account created! You can now log in.');
      setTimeout(() => navigate('/admin/login'), 1500);
    } catch (e: any) {
      setError(e.message || 'Failed to sign up');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 w-full max-w-sm space-y-6">
        <div className="flex items-center gap-2 mb-2">
          <ShieldIcon className="h-7 w-7 text-emerald-700" />
          <h2 className="text-xl font-bold text-gray-900">Admin Signup</h2>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            className="w-full rounded-md border border-gray-200 px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
            value={name}
            onChange={e => setName(e.target.value)}
            autoComplete="name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            className="w-full rounded-md border border-gray-200 px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            className="w-full rounded-md border border-gray-200 px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="new-password"
            required
          />
        </div>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">{success}</div>}
        <button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2 rounded-md shadow-sm disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
        <div className="text-center text-sm mt-2">
          Already have an account? <Link to="/admin/login" className="text-emerald-700 hover:underline">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default AdminSignup;
