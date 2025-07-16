import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCustomAuth } from '../contexts/CustomAuthContext';
import { 
  BookOpenIcon, 
  MailIcon, 
  LockIcon, 
  AlertCircleIcon, 
  EyeIcon, 
  EyeOffIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  Loader2Icon
} from 'lucide-react';
import { toast } from 'sonner';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const {
    signIn,
    signInWithTestCredentials,
    error,
    clearError
  } = useCustomAuth();
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    clearError();

    try {
      await signIn(email, password);
      toast.success('Login successful! Welcome back to Wildlife Guardians!');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestLogin = async () => {
    setIsLoading(true);
    clearError();

    try {
      await signInWithTestCredentials();
      toast.success('Test login successful! Welcome to Wildlife Guardians!');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message || 'Test login failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const useTestCredentials = () => {
    setEmail('test@wildlife.com');
    setPassword('wildlife123');
    clearError();
    toast.info('Test credentials filled in!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center items-center space-x-3 mb-6">
            <img 
              src="/wildlife-guardians-compact.svg" 
              alt="Wildlife Guardians" 
              className="w-16 h-16 drop-shadow-lg"
            />
            <div>
              <h1 className="text-2xl font-bold text-emerald-800">Wildlife Guardians</h1>
              <p className="text-emerald-600 text-sm">Learn • Conserve • Inspire</p>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back!
          </h2>
          <p className="text-gray-600">
            Continue your conservation journey
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
            <AlertCircleIcon className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-red-800">Login Error</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Test Credentials Banner */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <ShieldCheckIcon className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-amber-800">Test Credentials Available</h3>
              <p className="text-xs text-amber-700 mt-1">
                <strong>Email:</strong> test@wildlife.com<br />
                <strong>Password:</strong> wildlife123
              </p>
              <div className="mt-3 flex space-x-2">
                <button
                  type="button"
                  onClick={useTestCredentials}
                  className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded hover:bg-amber-200 transition-colors"
                >
                  Fill Credentials
                </button>
                <button
                  type="button"
                  onClick={handleTestLogin}
                  disabled={isLoading}
                  className="text-xs bg-amber-600 text-white px-2 py-1 rounded hover:bg-amber-700 transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Logging in...' : 'Quick Test Login'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MailIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none relative block w-full pl-10 pr-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Login Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? (
                <>
                  <Loader2Icon className="h-5 w-5 mr-2 animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRightIcon className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-medium text-emerald-600 hover:text-emerald-500 transition-colors"
              >
                Sign up now
              </Link>
            </p>
          </div>
        </form>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
            <BookOpenIcon className="h-4 w-4" />
            <span>Secure authentication powered by Wildlife Guardians</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
