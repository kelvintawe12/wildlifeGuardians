import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'super_admin' | 'admin' | 'moderator';
  permissions: string[];
  lastLogin: Date;
}

interface AdminContextType {
  adminUser: AdminUser | null;
  isAdminAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAdminPermission: (permission: string) => boolean;
  isLoading: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Admin credentials (in production, this would be in a secure database)
const ADMIN_CREDENTIALS = [
  {
    id: 'admin1',
    email: 'admin@wildlifeguardians.com',
    password: 'WildlifeAdmin2025!',
    name: 'System Administrator',
    role: 'super_admin' as const,
    permissions: ['*'] // All permissions
  },
  {
    id: 'admin2',
    email: 'moderator@wildlifeguardians.com',
    password: 'ModeratorPass2025!',
    name: 'Platform Moderator',
    role: 'moderator' as const,
    permissions: ['users.view', 'users.moderate', 'content.moderate', 'quiz.manage']
  }
];

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing admin session
    const savedAdmin = localStorage.getItem('admin_session');
    if (savedAdmin) {
      try {
        const adminData = JSON.parse(savedAdmin);
        // Verify session is still valid (within 24 hours)
        const sessionTime = new Date(adminData.sessionStart);
        const now = new Date();
        const hoursDiff = (now.getTime() - sessionTime.getTime()) / (1000 * 60 * 60);
        
        if (hoursDiff < 24) {
          setAdminUser(adminData.user);
        } else {
          localStorage.removeItem('admin_session');
        }
      } catch (error) {
        localStorage.removeItem('admin_session');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const admin = ADMIN_CREDENTIALS.find(
      cred => cred.email === email && cred.password === password
    );

    if (admin) {
      const adminUser: AdminUser = {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
        permissions: admin.permissions,
        lastLogin: new Date()
      };

      setAdminUser(adminUser);
      
      // Save session
      localStorage.setItem('admin_session', JSON.stringify({
        user: adminUser,
        sessionStart: new Date()
      }));
      
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setAdminUser(null);
    localStorage.removeItem('admin_session');
  };

  const checkAdminPermission = (permission: string): boolean => {
    if (!adminUser) return false;
    
    // Super admin has all permissions
    if (adminUser.permissions.includes('*')) return true;
    
    // Check specific permission
    return adminUser.permissions.includes(permission);
  };

  const value: AdminContextType = {
    adminUser,
    isAdminAuthenticated: !!adminUser,
    login,
    logout,
    checkAdminPermission,
    isLoading
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export default AdminContext;
