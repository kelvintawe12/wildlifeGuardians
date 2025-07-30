import React, { useState } from 'react';
import { ShieldIcon } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAdminAuth } from '../../contexts/AdminContext';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAdminAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const ok = await login(email, password);
    setLoading(false);
    if (ok) {
      navigate('/admin/dashboard', { replace: true });
    } else {
      setError('Invalid credentials');
    }
  };

  const fillDemoCredentials = () => {
    setEmail('demo.admin@example.com');
    setPassword('password123');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 w-full max-w-sm space-y-6">
        <div className="flex items-center gap-2 mb-2">
          <ShieldIcon className="h-7 w-7 text-emerald-700" />
          <h2 className="text-xl font-bold text-gray-900">Admin Login</h2>
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
            autoComplete="current-password"
            required
          />
        </div>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2 rounded-md shadow-sm disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <button
          type="button"
          onClick={fillDemoCredentials}
          className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md shadow-sm"
        >
          Fill Demo Admin Credentials
        </button>
        <div className="text-center text-sm mt-2">
          Don&apos;t have an account? <Link to="/admin/signup" className="text-emerald-700 hover:underline">Sign up</Link>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
