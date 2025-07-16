import React, { useEffect, useState, createContext, useContext } from 'react';
import { supabase } from '../services/supabaseClient';
import { User } from '@supabase/supabase-js';
interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{
    error: any;
  }>;
  signUp: (email: string, password: string, name: string) => Promise<{
    error: any;
  }>;
  signOut: () => Promise<void>;
  updateProfile: (data: {
    name?: string;
    avatar_url?: string;
  }) => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Rate limiting state
  const [lastRequestTime, setLastRequestTime] = useState<number>(0);
  const RATE_LIMIT_DELAY = 2000; // 2 seconds between requests

  // Rate limiting helper
  const checkRateLimit = () => {
    const now = Date.now();
    if (now - lastRequestTime < RATE_LIMIT_DELAY) {
      throw new Error('Please wait a moment before trying again');
    }
    setLastRequestTime(now);
  };

  useEffect(() => {
    // Check active sessions and set the user
    const getSession = async () => {
      const {
        data: { session }
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };
    getSession();
    // Listen for auth changes
    const {
      data: authListener
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);
  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      checkRateLimit();
      const {
        error
      } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      return {
        error
      };
    } catch (rateLimitError: any) {
      return {
        error: { message: rateLimitError.message }
      };
    }
  };
  // Sign up with email and password
  const signUp = async (email: string, password: string, name: string) => {
    try {
      checkRateLimit();
      const {
        error
      } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name
          }
        }
      });
      // If signup successful, create a profile
      if (!error) {
        const user = (await supabase.auth.getUser()).data.user;
        if (user) {
          await supabase.from('profiles').insert({
            id: user.id,
            name,
            created_at: new Date()
          });
        }
      }
      return {
        error
      };
    } catch (rateLimitError: any) {
      return {
        error: { message: rateLimitError.message }
      };
    }
  };
  // Sign out
  const signOut = async () => {
    await supabase.auth.signOut();
  };
  // Update user profile
  const updateProfile = async (data: {
    name?: string;
    avatar_url?: string;
  }) => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error('No user logged in');
    await supabase.from('profiles').upsert({
      id: user.id,
      ...data,
      updated_at: new Date()
    });
  };
  return <AuthContext.Provider value={{
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    setUser
  }}>
      {children}
    </AuthContext.Provider>;
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};