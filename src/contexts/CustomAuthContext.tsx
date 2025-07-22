import React, { createContext, useContext, useEffect, useState } from 'react';
import api, { login as apiLogin, register as apiRegister, logout as apiLogout, getUserProfile, updateUserProfile } from '../services/apiClient';

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
  signUp: (name: string, email: string, password: string, confirmPassword?: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithTestCredentials: () => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (profileData: Partial<UserProfile & { name?: string }>) => Promise<void>;
  clearError: () => void;
}

const USER_KEY = 'wildlife_guardians_user';
const PROFILE_KEY = 'wildlife_guardians_profile';

const removeStoredUserAndProfile = (): void => {
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

const setStoredProfile = (profile: UserProfile | null): void => {
  if (profile === null) {
    localStorage.removeItem(PROFILE_KEY);
  } else {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const CustomAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(getStoredUser());
  const [profile, setProfile] = useState<UserProfile | null>(getStoredProfile());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = !!user;

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      try {
        // Set user from localStorage
        const storedUser = getStoredUser();
        if (storedUser) {
          setUser(storedUser);
          // Fetch profile from API
          const userProfile = await getUserProfile();
          setProfile(userProfile);
        }
      } catch (error) {
        removeStoredUserAndProfile();
        setUser(null);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };
    initializeAuth();
  }, []);

  const signUp = async (name: string, email: string, password: string, confirmPassword?: string): Promise<void> => {
    setLoading(true);
    clearError();
    try {
      const { user: newUser } = await apiRegister(name, email, password, confirmPassword);
      setStoredUser(newUser);
      setUser(newUser);
      setProfile(null);
    } catch (err: any) {
      setError(err.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    clearError();
    try {
      const { user: loggedInUser } = await apiLogin(email, password);
      setStoredUser(loggedInUser);
      setUser(loggedInUser);
      try {
        const userProfile = await getUserProfile();
        setStoredProfile(userProfile);
        setProfile(userProfile);
      } catch (profileErr: any) {
        if (typeof window !== 'undefined' && window.toast) {
          window.toast.error('Logged in, but failed to fetch user profile.');
        }
        setStoredProfile(null);
        setProfile(null);
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signInWithTestCredentials = async (): Promise<void> => {
    setLoading(true);
    clearError();
    try {
      const response = await api.post('/auth/test-login');
      const { user: loggedInUser } = (response.data as { data: { user: User } }).data;
      setStoredUser(loggedInUser);
      setUser(loggedInUser);
      const userProfile = await getUserProfile();
      setStoredProfile(userProfile);
      setProfile(userProfile);
    } catch (err: any) {
      setError(err.message || 'Test login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    setLoading(true);
    clearError();
    try {
      await apiLogout();
    } catch (err) {
      // Ignore logout errors
    } finally {
      removeStoredUserAndProfile();
      setUser(null);
      setProfile(null);
      setLoading(false);
    }
  };

  const updateProfile = async (profileData: Partial<UserProfile & { name?: string }>): Promise<void> => {
    setLoading(true);
    clearError();
    try {
      const updatedUser = await updateUserProfile(profileData);
      setStoredUser(updatedUser);
      setUser(updatedUser);
      // Optionally update profile state if returned
    } catch (err: any) {
      setError(err.message || 'Profile update failed');
      throw err;
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
    clearError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useCustomAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useCustomAuth must be used within a CustomAuthProvider');
  }
  return context;
};

export default CustomAuthProvider;
