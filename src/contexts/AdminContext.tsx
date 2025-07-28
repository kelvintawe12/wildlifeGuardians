
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Admin = {
  id: number;
  name: string;
  email: string;
  role: string;
};

type AdminContextType = {
  admin: Admin | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdminAuth = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminProvider');
  return ctx;
};

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);

  // Replace with real authentication logic
  const login = async (email: string, password: string) => {
    // Example: hardcoded admin
    if (email === 'admin@wildlifeguardians.org' && password === 'admin123') {
      setAdmin({ id: 1, name: 'Admin User', email, role: 'Super Admin' });
      localStorage.setItem('admin_token', 'admin_token');
      return true;
    }
    return false;
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('admin_token');
  };

  return (
    <AdminContext.Provider value={{ admin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};
