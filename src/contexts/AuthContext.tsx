
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';

// Define a simplified Session and User type to match our mock implementation
type User = {
  id: string;
  email?: string;
};

type Session = {
  user: User;
};

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any, data: any }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get session from Supabase
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      const sessionData = data?.session;
      setSession(sessionData || null);
      setUser(sessionData?.user || null);
      setLoading(false);
    };
    
    fetchSession();

    // Listen for auth changes
    const { data } = supabase.auth.onAuthStateChange(
      (_event: string, session: Session | null) => {
        setSession(session);
        setUser(session?.user || null);
        setLoading(false);
      }
    );

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword();
    return { error };
  };

  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp();
    return { data, error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    session,
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
