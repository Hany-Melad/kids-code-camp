
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// We'll check if a user has admin role through their email
// In a real app, this would be done through a proper role system
const ADMIN_EMAILS = ['admin@example.com'];

interface AdminContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ error: any }>;
  logout: () => Promise<void>;
  user: User | null;
  username: string | null;
  loading: boolean;
}

const AdminContext = createContext<AdminContextType>({
  isAuthenticated: false,
  login: async () => ({ error: null }),
  logout: async () => {},
  user: null,
  username: null,
  loading: true,
});

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        console.log('Admin auth state changed:', event);
        setSession(newSession);
        
        const newUser = newSession?.user ?? null;
        setUser(newUser);
        
        // Check if user is an admin
        if (newUser && ADMIN_EMAILS.includes(newUser.email || '')) {
          setUsername(newUser.email?.split('@')[0] || 'admin');
        } else {
          setUsername(null);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      
      const currentUser = currentSession?.user ?? null;
      setUser(currentUser);
      
      // Check if user is an admin
      if (currentUser && ADMIN_EMAILS.includes(currentUser.email || '')) {
        setUsername(currentUser.email?.split('@')[0] || 'admin');
      } else {
        setUsername(null);
      }
      
      setLoading(false);
    });

    return () => {
      authSubscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      if (!ADMIN_EMAILS.includes(email)) {
        return { error: { message: 'Not authorized as admin' } };
      }
      
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      return { error };
    } catch (error) {
      console.error('Admin login error:', error);
      return { error };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const isAuthenticated = !!user && !!username;

  return (
    <AdminContext.Provider 
      value={{ 
        isAuthenticated, 
        login, 
        logout, 
        user, 
        username,
        loading
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
