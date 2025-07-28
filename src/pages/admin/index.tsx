import React from 'react';
import AdminRoutes from './AdminRoutes';
import { AdminProvider } from '../../contexts/AdminContext';

const AdminRoot: React.FC = () => {
  return (
    <AdminProvider>
      <AdminRoutes />
    </AdminProvider>
  );
};

export default AdminRoot;
