import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import AdminSettings from './AdminSettings';
import AdminUsers from './AdminUsers';
import AdminProtectedRoute from '../../components/admin/AdminProtectedRoute';

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={
        <AdminProtectedRoute>
          <AdminDashboard />
        </AdminProtectedRoute>
      } />
      <Route path="/admin/settings" element={
        <AdminProtectedRoute>
          <AdminSettings />
        </AdminProtectedRoute>
      } />
      <Route path="/admin/users" element={
        <AdminProtectedRoute>
          <AdminUsers />
        </AdminProtectedRoute>
      } />
      {/* Default: redirect to dashboard if /admin */}
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
};

export default AdminRoutes;
