import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdmin } from '../../contexts/AdminContext';
import { LoaderIcon } from 'lucide-react';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: string;
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ 
  children, 
  requiredPermission 
}) => {
  const { isAdminAuthenticated, checkAdminPermission, isLoading } = useAdmin();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 flex items-center justify-center">
        <div className="text-white text-center">
          <LoaderIcon className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Verifying admin access...</p>
        </div>
      </div>
    );
  }

  if (!isAdminAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (requiredPermission && !checkAdminPermission(requiredPermission)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-red-400 mb-4">Access Denied</h2>
            <p className="text-gray-300">
              You don't have permission to access this resource.
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Required permission: {requiredPermission}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;
