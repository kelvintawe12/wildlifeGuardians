import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BookOpenIcon, MailIcon, LockIcon, AlertCircleIcon, ArrowRightIcon } from 'lucide-react';
import { toast } from 'sonner';
const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    signIn,
    setUser
  } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    // Check if test credentials are being used
    if (email === 'test@wildlife.com' && password === 'wildlife123') {
      // For test credentials, bypass the actual authentication but set user manually
      toast.success('Test login successful!');
      setIsLoading(false);
      setError(null);
      setTimeout(() => {
        // Manually set user in AuthContext to simulate login
        setUser({
          id: 'test-user-id',
          email: 'test@wildlife.com',
          user_metadata: { name: 'Test User' },
          app_metadata: {},
          aud: 'authenticated',
          created_at: new Date().toISOString(),
          last_sign_in_at: new Date().toISOString(),
          role: 'authenticated',
          updated_at: new Date().toISOString()
        } as any);
        navigate('/');
      }, 500);
      return;
    }
    try {
      const {
        error
      } = await signIn(email, password);
      if (error) {
        setError(error.message);
        toast.error('Login failed. Please check your credentials.');
      } else {
        toast.success('Login successful!');
        navigate('/');
      }
    } catch (err: any) {
      setError(err.message);
      toast.error('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };
  const useTestCredentials = () => {
    setEmail('test@wildlife.com');
    setPassword('wildlife123');
    // Automatically submit the form with test credentials
    setTimeout(() => {
      // Removed toast and navigate here to avoid premature navigation
      // User should submit the form manually after autofill
    }, 500);
  };
  return <div className="min-h-screen flex items-center justify-center bg-cover bg-center px-4" style={{
    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1564760055775-d63b17a55c44?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")',
    backgroundAttachment: 'fixed'
  }}>
      <div className="max-w-md w-full bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden">
        <div className="bg-green-600 text-white py-4 px-6 flex items-center justify-center">
          <BookOpenIcon className="h-8 w-8 mr-2" />
          <h2 className="text-2xl font-bold">Wildlife Guardians</h2>
        </div>
        <div className="py-8 px-6">
          <h3 className="text-xl font-semibold text-center mb-6">
            Sign in to your account
          </h3>
          {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-start">
              <AlertCircleIcon className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-red-600 text-sm">{error}</p>
            </div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MailIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="you@example.com" required />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="••••••••" required />
              </div>
            </div>
            <div>
              <button type="submit" disabled={isLoading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed">
                {isLoading ? <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span> : 'Sign in'}
              </button>
            </div>
          </form>
          {/* Test Credentials Box */}
          <div className="mt-6 p-3 bg-blue-50 border border-blue-100 rounded-md">
            <h4 className="text-sm font-medium text-blue-800 mb-2">
              Test Credentials
            </h4>
            <p className="text-xs text-blue-600 mb-2">
              Use these credentials for testing:
            </p>
            <div className="flex flex-col space-y-1 mb-3">
              <div className="flex items-center text-xs">
                <span className="font-medium w-20">Email:</span>
                <span className="text-gray-700">test@wildlife.com</span>
              </div>
              <div className="flex items-center text-xs">
                <span className="font-medium w-20">Password:</span>
                <span className="text-gray-700">wildlife123</span>
              </div>
            </div>
            <button type="button" onClick={useTestCredentials} className="w-full flex justify-center items-center py-1.5 px-3 text-xs border border-blue-300 rounded-md shadow-sm text-blue-700 bg-blue-50 hover:bg-blue-100">
              <span>Use Test Credentials</span>
              <ArrowRightIcon className="h-3 w-3 ml-1" />
            </button>
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-green-600 hover:text-green-500 font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>;
};
export default Login;