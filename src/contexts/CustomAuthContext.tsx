import React, { createContext, useContext, useEffect, useState } from 'react';

// Types
interface User {
  id: string;
  email: string;
  name: string;
  profile_picture?: string;
  created_at: string;
  email_verified: boolean;
  last_login?: string;
}

interface UserProfile {
  id: string;
  user_id: string;
  bio?: string;
  location?: string;
  interests: string[];
  conservation_level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  total_points: number;
  badges_earned: number;
  quizzes_completed: number;
  favorite_animals: string[];
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  signUp: (userData: SignUpData) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithTestCredentials: () => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (profileData: Partial<UserProfile & { name?: string }>) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  deleteAccount: (password: string) => Promise<void>;
  clearError: () => void;
}

interface SignUpData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// API Configuration
const API_BASE_URL = (import.meta.env as any).VITE_API_URL || 'http://localhost:3001/api';
const AUTH_ENDPOINTS = {
  register: `${API_BASE_URL}/auth/register`,
  login: `${API_BASE_URL}/auth/login`,
  testLogin: `${API_BASE_URL}/auth/test-login`,
  logout: `${API_BASE_URL}/auth/logout`,
  profile: `${API_BASE_URL}/auth/profile`,
  verifyToken: `${API_BASE_URL}/auth/verify-token`,
  changePassword: `${API_BASE_URL}/auth/change-password`,
  deleteAccount: `${API_BASE_URL}/auth/delete-account`
};

// Rate limiting protection
class RateLimitError extends Error {
  constructor(retryAfter: number) {
    super(`Too many requests. Please try again in ${retryAfter} seconds.`);
    this.name = 'RateLimitError';
  }
}

// Token management
const TOKEN_KEY = 'wildlife_guardians_token';
const USER_KEY = 'wildlife_guardians_user';
const PROFILE_KEY = 'wildlife_guardians_profile';

const getStoredToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

const setStoredToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

const removeStoredToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(PROFILE_KEY);
};

const getStoredUser = (): User | null => {
  const userData = localStorage.getItem(USER_KEY);
  return userData ? JSON.parse(userData) : null;
};

const setStoredUser = (user: User): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

const getStoredProfile = (): UserProfile | null => {
  const profileData = localStorage.getItem(PROFILE_KEY);
  return profileData ? JSON.parse(profileData) : null;
};

const setStoredProfile = (profile: UserProfile): void => {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
};

// API helper function
const apiRequest = async (url: string, options: RequestInit = {}): Promise<any> => {
  const token = getStoredToken();
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers
    }
  });

  const data = await response.json();

  if (response.status === 429) {
    const retryAfter = parseInt(response.headers.get('Retry-After') || '60');
    throw new RateLimitError(retryAfter);
  }

  if (!response.ok) {
    throw new Error(data.message || 'An error occurred');
  }

  return data;
};

export const CustomAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = !!user;

  // Clear error function
  const clearError = () => {
    setError(null);
  };

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = getStoredToken();
        const storedUser = getStoredUser();
        const storedProfile = getStoredProfile();

        if (token && storedUser) {
          // Verify token is still valid
          try {
            await apiRequest(AUTH_ENDPOINTS.verifyToken);
            setUser(storedUser);
            setProfile(storedProfile);
          } catch (error) {
            // Token is invalid, clear stored data
            removeStoredToken();
            console.log('Token verification failed:', error);
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Sign up function
  const signUp = async (userData: SignUpData): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiRequest(AUTH_ENDPOINTS.register, {
        method: 'POST',
        body: JSON.stringify(userData)
      });

      if (response.success) {
        const { user: newUser, profile: newProfile, token } = response.data;
        
        setStoredToken(token);
        setStoredUser(newUser);
        setStoredProfile(newProfile);
        
        setUser(newUser);
        setProfile(newProfile);
      }
    } catch (error: any) {
      setError(error.message || 'Registration failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign in function
  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiRequest(AUTH_ENDPOINTS.login, {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });

      if (response.success) {
        const { user: loggedInUser, profile: userProfile, token } = response.data;
        
        setStoredToken(token);
        setStoredUser(loggedInUser);
        if (userProfile) setStoredProfile(userProfile);
        
        setUser(loggedInUser);
        setProfile(userProfile);
      }
    } catch (error: any) {
      setError(error.message || 'Login failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Test credentials sign in
  const signInWithTestCredentials = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiRequest(AUTH_ENDPOINTS.testLogin, {
        method: 'POST'
      });

      if (response.success) {
        const { user: loggedInUser, profile: userProfile, token } = response.data;
        
        setStoredToken(token);
        setStoredUser(loggedInUser);
        if (userProfile) setStoredProfile(userProfile);
        
        setUser(loggedInUser);
        setProfile(userProfile);
      }
    } catch (error: any) {
      setError(error.message || 'Test login failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign out function
  const signOut = async (): Promise<void> => {
    try {
      setLoading(true);
      
      // Call logout endpoint to invalidate session
      try {
        await apiRequest(AUTH_ENDPOINTS.logout, {
          method: 'POST'
        });
      } catch (error) {
        // Even if logout request fails, we should still clear local data
        console.log('Logout request failed:', error);
      }

      // Clear local storage and state
      removeStoredToken();
      setUser(null);
      setProfile(null);
      setError(null);
    } catch (error: any) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Update profile function
  const updateProfile = async (profileData: Partial<UserProfile & { name?: string }>): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiRequest(AUTH_ENDPOINTS.profile, {
        method: 'PUT',
        body: JSON.stringify(profileData)
      });

      if (response.success) {
        const { user: updatedUser, profile: updatedProfile } = response.data;
        
        setStoredUser(updatedUser);
        setStoredProfile(updatedProfile);
        
        setUser(updatedUser);
        setProfile(updatedProfile);
      }
    } catch (error: any) {
      setError(error.message || 'Profile update failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Change password function
  const changePassword = async (currentPassword: string, newPassword: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      await apiRequest(AUTH_ENDPOINTS.changePassword, {
        method: 'PUT',
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmPassword: newPassword
        })
      });
    } catch (error: any) {
      setError(error.message || 'Password change failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Delete account function
  const deleteAccount = async (password: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      await apiRequest(AUTH_ENDPOINTS.deleteAccount, {
        method: 'DELETE',
        body: JSON.stringify({ password })
      });

      // Clear local data after successful deletion
      removeStoredToken();
      setUser(null);
      setProfile(null);
    } catch (error: any) {
      setError(error.message || 'Account deletion failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    profile,
    loading,
    error,
    isAuthenticated,
    signUp,
    signIn,
    signInWithTestCredentials,
    signOut,
    updateProfile,
    changePassword,
    deleteAccount,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useCustomAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useCustomAuth must be used within a CustomAuthProvider');
  }
  return context;
};

export default CustomAuthProvider;
