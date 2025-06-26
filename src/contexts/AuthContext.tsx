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
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Check active sessions and set the user
    const session = supabase.auth.getSession();
    setUser(session ? (session as any).user : null);
    setLoading(false);
    // Listen for auth changes
    const {
      data: authListener
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);
  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    const {
      error
    } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return {
      error
    };
  };
  // Sign up with email and password
  const signUp = async (email: string, password: string, name: string) => {
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
    updateProfile
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