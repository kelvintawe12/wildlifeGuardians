import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useCustomAuth } from '../contexts/CustomAuthContext';
import { Loader2Icon } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

const ProtectedRouteCustom: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAuth = true 
}) => {
  const { user, loading } = useCustomAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2Icon className="h-12 w-12 text-emerald-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading Wildlife Guardians...</p>
        </div>
      </div>
    );
  }

  // If authentication is required and user is not logged in
  if (requireAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user is logged in and trying to access login/register pages
  if (!requireAuth && user && (location.pathname === '/login' || location.pathname === '/register')) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRouteCustom;
